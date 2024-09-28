import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Importing the main App component


const rootElement = document.getElementById('root'); // Getting the root element from index.html
createRoot(rootElement).render(
  <React.StrictMode>
    <App /> {/* Rendering the App component */}
  </React.StrictMode>
);
