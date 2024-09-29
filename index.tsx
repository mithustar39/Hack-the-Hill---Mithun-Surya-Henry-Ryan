import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Importing the main App component
// import { initDB } from './db.js';

// (async () => {
//   await initDB();
// })();



const rootElement = document.getElementById('root'); // Getting the root element from index.html

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App /> {}
  </React.StrictMode>
);
