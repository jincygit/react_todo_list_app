import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './components/App';


const root = createRoot(document.getElementById('root')); // Replace 'root' with your container ID
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);