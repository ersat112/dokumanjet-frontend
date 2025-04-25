// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  define: {
    'process.env.VITE_API_URL': JSON.stringify(
      process.env.VITE_API_URL = "https://dokumanjet-backend.onrender.com/api/v1"
    ),
  },
});
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // @ ile src klasörüne erişim
    },
  },
  server: {
    port: 5173, // Lokal geliştirme portu
    open: true, // Tarayıcıyı otomatik açar
  },
  build: {
    outDir: "dist", // Vercel deploy klasörü
    emptyOutDir: true,
  },
});
