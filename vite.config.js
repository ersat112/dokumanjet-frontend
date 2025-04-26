import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  // Load environment variables based on mode
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL || 'https://dokumanjet-backend.onrender.com/api/v1';

  return defineConfig({
    root: 'public',          // Serve index.html from public/
    publicDir: 'public',     // Static assets directory
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure: false
        }
      }
    },
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    build: {
      outDir: '../dist',     // Output to project-root/dist
      emptyOutDir: true       // Clear dist before build
    }
  });
};
