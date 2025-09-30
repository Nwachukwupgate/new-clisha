import { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { apiCall } from '../services/apiRequestManager';
import { clearAuthStorage } from '../utils/functions/functions';

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
  const hasRunRef = useRef(false);
  

  useEffect(() => {
    setLoading(true);
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const signIn = useCallback(async (referredBy) => {
    try {
      setLoading(true);

      const body = referredBy ? { referredBy } : undefined;
      if (referredBy) localStorage.removeItem("referredBy");


      const data = await apiCall(
        `${api}/auth/signin/clisha`,
        'POST',
        body,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!data) throw new Error('Failed to initiate sign-in');

      const { authUrl } = (data && data.data) || {};
      // console.log(authUrl)
      // sessionStorage.setItem('sessionId', sessionId);
      window.location.href = authUrl;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }, [api]);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const query = new URLSearchParams(window.location.search);
    const referredBy = query.get("code");

    if (referredBy) {
      localStorage.setItem("referredBy", referredBy);
      signIn(referredBy);
    }
  }, [signIn]);

  const handleCallback = useCallback(async (tokenId) => {
  try {
    setLoading(true);
    
    const data = await apiCall(
      `${api}/auth/tokens/${tokenId}`, 
      'GET'
    );

    const { user: userData, accessToken, refreshToken, message, loginType } = data.data;
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('username', userData.username);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refresh', refreshToken);
    localStorage.setItem('loginType', loginType)

    // sessionStorage.removeItem('clishaSessionId');

    setLoading(false);
    return { userData, accessToken, message };
    
  } catch (error) {
    setLoading(false);
    throw error;
  }
}, [api]);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      
      const data = await apiCall(
        `${api}/auth/signout/clisha`,
        'POST',
        { userId: user?.id },
        { headers: { 'Content-Type': 'application/json' } }
      );     
      
      setUser(null);
      clearAuthStorage();

      // console.log('Logout response:', data);

      if (data?.data?.logoutUrl) {
        localStorage.clear();
        sessionStorage.clear();
        setUser(null);
        // Redirect to OIDC provider logout
        window.location.href = data.data.logoutUrl;
      } else {
        setUser(null);
        clearAuthStorage();
        window.location.href = '/';
      }
    } catch (error) {
      setUser(null);
      clearAuthStorage();
      window.location.href = '/';
    } finally {
      setLoading(false);
    }
  }, [user?.id, api]);

  const refreshAccessToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refresh');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const data = await apiCall(
        `${api}/auth/refresh`,
        'POST',
        { refreshToken },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!data || !data.data) {
        throw new Error('Failed to refresh token');
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data.data;
      
      localStorage.setItem('token', newAccessToken);
      localStorage.setItem('refresh', newRefreshToken);

      return newAccessToken;
    } catch (error) {
      console.error('Token refresh error:', error);
      // If refresh fails, redirect to sign-in
      localStorage.clear();
      sessionStorage.clear();
      setUser(null);
      window.location.href = '/signin';
      throw error;
    }
  }, [api]);


  const value = useMemo(
    () => ({
      user,
      loading,
      signIn,
      signOut,
      handleCallback,
      refreshAccessToken
    }),
    [user, loading, signIn, signOut, handleCallback, refreshAccessToken]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
