import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';
import Header from './components/Header';

// Protected route wrapper
function PrivateRoute({ token, children }) {
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Login handler: store token
  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  // Logout handler: clear token
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // On mount, you could verify token validity
  useEffect(() => {
    if (token) {
      // Optionally verify token with backend or decode expiration
      // If invalid, call handleLogout()
    }
  }, [token]);

  return (
    <Router>
      <Header token={token} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/search"
          element={<SearchResults token={token} />}
        />
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/register"
          element={
            token ? (
              <Navigate to="/" replace />
            ) : (
              <Register onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute token={token}>
              <Favorites token={token} />
            </PrivateRoute>
          }
        />
        {/* Catch-all: redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

