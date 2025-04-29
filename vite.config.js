import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/' : '/', // Dinamik base ayarı
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // '@' alias'ı 'src' dizinine yönlendirilir
    },
  },
  define: {
    __BASE__: JSON.stringify(process.env.BASE_URL || '/'), // __BASE__ değişkeni tanımlandı
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Debugging için sourcemap açık
    minify: 'esbuild',
    assetsDir: 'assets', // Statik dosyalar için dizin ayarı
    chunkSizeWarningLimit: 1000, // Büyük dosyalar için uyarı limiti (KB)
  },
  server: {
    port: 3000,
    open: true, // Tarayıcı otomatik açılır
  },
});
