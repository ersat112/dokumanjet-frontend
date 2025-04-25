// vite.config.js
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  // Ortam değişkenlerini tanımla
  define: {
    'process.env.VITE_API_URL': JSON.stringify(
      process.env.VITE_API_URL || "https://dokumanjet-backend.onrender.com/api/v1"
    ),
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // '@' ile src klasörüne erişim
    },
  },
  server: {
    port: 5173, // Lokal geliştirme portu
    open: true, // Tarayıcı otomatik açılır
  },
  build: {
    outDir: "dist", // Vercel deploy klasörü
    emptyOutDir: true,
  },
});
