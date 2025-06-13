import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './sass/index.scss';
import { TourProvider } from './context/TourContext';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <TourProvider>
          <App />
        </TourProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
