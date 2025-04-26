// src/config.js
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
export const endpoints = {
  news:      `${API_BASE_URL}/api/news`,
  weather:   `${API_BASE_URL}/api/weather`,
  visitors:  `${API_BASE_URL}/api/visitors`,
  auth: {
    login:    `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
  },
  favorites: `${API_BASE_URL}/api/favorites`,
};
