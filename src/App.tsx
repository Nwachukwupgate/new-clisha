import { useEffect } from 'react';
import AOS from 'aos';
import WebFont from 'webfontloader';
import Loader from './Loader/index';
import Router from './routes';

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

  const isAuth = localStorage.getItem('token');

  if (isAuth) {
    Loader();
  }
  return <Router />;
}

export default App;
