import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { AuthClient, LoginHint } from '@clisha/clisha-auth-client';
import { apiCall } from '../services/apiRequestManager';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = process.env.REACT_APP_API;
  const [authClient] = useState(
    () =>
      new AuthClient({
        authority: process.env.REACT_APP_CLISHA_AUTHORITY,
        clientId: process.env.REACT_APP_CLISHA_CLIENT_ID,
      })
  );

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const signIn = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiCall(
        `${api}/auth/signin/clisha`,
        'POST',
        // { loginHint },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!data) throw new Error('Failed to initiate sign-in');

      const { authUrl, sessionId } = (data && data.data) || {};
      sessionStorage.setItem('sessionId', sessionId);
      window.location.href = authUrl;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }, [api]);

  const handleCallback = useCallback(async () => {
    try {
      setLoading(true);
      const sessionId = sessionStorage.getItem('sessionId');
      if (!sessionId) {
        throw new Error('No session ID found');
      }

      const callbackUrl = window.location.href;
      const data = await apiCall(
        `${api}/auth/clisha/callback`,
        'POST',
        { sessionId, callbackUrl },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!data) throw new Error('Callback handling failed');

      const { user: userData, accessToken, refreshToken } = (data && data.data) || {};
      setUser(userData);

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('username', userData.username);
      localStorage.setItem('email', userData.email);
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refresh', refreshToken);

      
      sessionStorage.removeItem('sessionId');

      return accessToken;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }, [api]);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiCall(
        '/api/auth/signout',
        'POST',
        {
          userId: user?.id,
          redirectUri: `${window.location.origin}/signed-out`,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (data?.logoutUrl) {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('clishaAccessToken');
        localStorage.removeItem('clishaIdToken');
        setUser(null);
        window.location.href = data.logoutUrl;
      }
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      loading,
      signIn,
      signOut,
      handleCallback,
      authClient,
    }),
    [user, loading, signIn, signOut, handleCallback, authClient]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
