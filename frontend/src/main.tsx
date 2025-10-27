import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import './assets/styles/globals.css';

/**
 * @summary Application entry point
 * @description Initializes React application and mounts to DOM
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
