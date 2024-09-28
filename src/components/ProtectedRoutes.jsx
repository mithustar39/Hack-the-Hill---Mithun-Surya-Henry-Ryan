import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Checking for token or login status

  if (!isAuthenticated) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the children components (like Home)
  return children;
};

export default ProtectedRoute;
