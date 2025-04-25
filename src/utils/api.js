import axios from 'axios';

// .env'den gelen API URL'sini al
export const VITE_API_URL = process.env.VITE_API_URL = "https://dokumanjet-backend.onrender.com/api/v1";

// Axios örneği oluştur
const api = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api, VITE_API_URL };
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
