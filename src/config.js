// src/config.js

// API base URL (Vite environment variable or fallback)
const rawBase = import.meta.env.VITE_API_URL || 'https://dokumanjet-backend.onrender.com';
// Ensure no trailing slash
export const API_BASE_URL = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;

export const endpoints = {
  news:      `${API_BASE_URL}/api/v1/news`,
  weather:   `${API_BASE_URL}/api/v1/weather`,
  search:    `${API_BASE_URL}/api/v1/search`,
  favorites: `${API_BASE_URL}/api/v1/favorites`,
  ocr:       `${API_BASE_URL}/api/v1/ocr/upload`,
  auth: {
    login:    `${API_BASE_URL}/api/v1/auth/login`,
    register: `${API_BASE_URL}/api/v1/auth/register`,
  },
  // Add additional endpoints as needed
};

// Helper to build Authorization header
export function getAuthHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}
