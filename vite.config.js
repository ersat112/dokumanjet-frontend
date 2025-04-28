import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default ({ mode }) => {
  // Load .env files: .env, .env.local, .env.[mode], .env.[mode].local
  const env = loadEnv(mode, process.cwd(), '');
  const API_PREFIX = '/api';
  const API_URL = env.VITE_API_URL || 'https://dokumanjet-backend.onrender.com/api/v1';

  return defineConfig({
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
      strictPort: true,
      proxy: {
        // Proxy API calls to backend
        [API_PREFIX]: {
          target: API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(new RegExp(`^${API_PREFIX}`), '')
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    define: {
      // Make env vars available in client code
      __API_URL__: JSON.stringify(API_URL)
    },
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()]
      }
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: mode === 'development'
    }
  });
};
