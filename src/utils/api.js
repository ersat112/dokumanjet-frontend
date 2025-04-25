import axios from "axios";

// .env dosyasındaki API URL'ini alıyoruz
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Axios örneği oluşturuyoruz
const api = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Her istek öncesinde token kontrolü yapıyoruz
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api, VITE_API_URL };
