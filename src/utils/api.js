// src/utils/api.js

import axios from "axios";
import { VITE_API_URL, DEFAULT_TIMEOUT } from "../config";

const api = axios.create({
  baseURL: VITE_API_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Token eklemek için interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
