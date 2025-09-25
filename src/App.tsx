import { useEffect } from 'react';
import AOS from 'aos';
import WebFont from 'webfontloader';
import Loader from './Loader/index';
import { useAuth } from './context/AuthContext';
import Router from './routes';
import Loading from './components/Alerts/Loading';

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
    WebFont.load({
      google: {
        families: ['Droid Sans', 'Chilanka'],
      },
    });
  }, []);
  const { loading } = useAuth();

  const isAuth = localStorage.getItem('token');

  if (isAuth) {
    Loader();
  }

  if (loading) {
    return <Loading />;
  }

  return <Router />;
}

export default App;
