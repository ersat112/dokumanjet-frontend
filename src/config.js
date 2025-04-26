// src/config.js
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://dokumanjet-backend.onrender.com';

export const endpoints = {
  news:      `${API_BASE_URL}/api/v1/news`,
  weather:   `${API_BASE_URL}/api/v1/weather`,
  visitors:  `${API_BASE_URL}/api/v1/visitors`,  // varsa
  auth: {
    login:    `${API_BASE_URL}/api/v1/auth/login`,
    register: `${API_BASE_URL}/api/v1/auth/register`,
  },
  favorites: `${API_BASE_URL}/api/v1/favorites`,
};
