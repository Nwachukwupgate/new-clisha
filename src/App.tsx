import { useEffect } from 'react';
import Loader from './Loader/index.js';
import AOS from 'aos';
import WebFont from 'webfontloader';
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
