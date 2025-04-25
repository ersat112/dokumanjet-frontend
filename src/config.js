// src/config.js

// Backend API adresi (önce çevre değişkeninden alır, yoksa default)
export const VITE_API_URL = import.meta.env.VITE_API_URL || "https://dokumanjet-backend.onrender.com/api/v1";

// Vite ile kullanılacak diğer sabitler
export const DEFAULT_TIMEOUT = 5000; // 5 saniye API timeout
export const APP_NAME = "DokumanJet"; // Proje ismi
export const NEWS_LIMIT = 5; // Ana ekranda kaç haber gösterilecek
export const OCR_UPLOAD_SIZE_MB = 5; // Maksimum görsel dosya boyutu MB
export const WEATHER_UPDATE_INTERVAL = 15 * 60 * 1000; // 15 dakika (ms cinsinden)
