import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from '../app/page';
import { AppProvider } from '../context/AppContext';
import { Toast } from '../components/Toast';
import '../app/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <Home />
      <Toast />
    </AppProvider>
  </React.StrictMode>
);
