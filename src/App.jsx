import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/Home';
import LoginScreen from './components/Login';
import SleepTracker from './components/SleepTracker';
import ProtectedRoute from './components/ProtectedRoutes'; // Import ProtectedRoute

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} /> {/* Public route */}
        
        {/* Protected route for Home */}
          <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        
        {/* Protected route for SleepTracker */}
        <Route
          path="/tracker"
          element={
            <ProtectedRoute>
              <SleepTracker />
            </ProtectedRoute>
          }
        />

        {/* Default route can also be protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
