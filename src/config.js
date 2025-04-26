// src/config.js
// Backend URL'i Vercel ortam değişkeninden alır, tanımlı değilse buradaki URL'i kullanır
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://dokumanjet-backend.onrender.com';

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

