import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
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

      const { authUrl } = (data && data.data) || {};
      // console.log(authUrl)
      // sessionStorage.setItem('sessionId', sessionId);
      window.location.href = authUrl;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }, [api]);

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

      localStorage.removeItem('user');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      localStorage.removeItem('loginType');
      
      
      setUser(null);

      // console.log('Logout response:', data);

      if (data?.data?.logoutUrl) {
        localStorage.clear();
        sessionStorage.clear();
        setUser(null);
        // Redirect to OIDC provider logout
        window.location.href = data.data.logoutUrl;
      } else {
        // Fallback to local redirect
        localStorage.clear();
        sessionStorage.clear();
        setUser(null);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Sign out error:', error);
      // Even if API call fails, clear local state
      localStorage.clear();
      sessionStorage.clear();
      setUser(null);
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
