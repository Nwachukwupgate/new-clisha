import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
import Loading from '../../components/Alerts/Loading';

const AuthCallback = () => {
  const { handleCallback, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) {
      return;
    }

    hasRun.current = true;

    const processCallback = async () => {
      try {
        const response = await handleCallback();

        localStorage.setItem('token', response);
        setTimeout(() => {
          window.location.href="/dashboard"
        }, 1000);
      } catch (err) {
        setError(err.message);
        hasRun.current = false;
      }
    };

    processCallback();
  }, [handleCallback, navigate]);

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