import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
import Loading from '../../components/Alerts/Loading';


const AuthCallback = () => {
  const { handleCallback, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) {
      return;
    }

    hasRun.current = true;

    const processCallback = async () => {
      try {
        const errorParam = searchParams.get('error');
        if (errorParam) {
          throw new Error(decodeURIComponent(errorParam));
        }

        const successParam = searchParams.get('success');
        const tokenId = searchParams.get('tokenId');

        if (successParam !== 'true' || !tokenId) {
          throw new Error('Invalid callback parameters');
        }

        // Retrieve tokens from backend
        const response = await handleCallback(tokenId);
        setTimeout(() => {
          window.location.href="/dashboard"
        }, 1000); 
      } catch (err) {
        setError(err.message);
        hasRun.current = false;
      }
    };

    processCallback();
  }, [handleCallback, searchParams]);

  useEffect(() => {
    if (error) {
      hasRun.current = false;
    }
  }, [error]);

  if (loading) {
      return <Loading />; 
    }

  if (error) {
    return (
      <div className="auth-callback-error">
        <h2>Authentication Error</h2>
        <p>{error}</p>
        <button 
          onClick={() => {
            setError(null);
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="auth-callback-loading">
      <h2>Completing sign-in...</h2>
      <p>Please wait while we finish setting up your account.</p>
    </div>
  );
};

export default AuthCallback;