import axios from "axios";

// Ortam değişkeninden backend URL'si alınır
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

// Axios örneği
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Eğer token varsa otomatik header'a eklenir
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
