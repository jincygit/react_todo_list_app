import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { AuthProvider } from './providers/AuthProvider';//named exports
// import { PostsProvider } from './providers/PostsProvider';//named exports



const root = createRoot(document.getElementById('root')); // Replace 'root' with your container ID
root.render(
  <React.StrictMode>
    {/* <AuthProvider>
        <PostsProvider> */}
          <App />
        {/* </PostsProvider>
      </AuthProvider> */}
  </React.StrictMode>
);