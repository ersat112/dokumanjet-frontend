import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL;

  return defineConfig({
    plugins: [react()],
    publicDir: 'public',
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
      alias: { '@': '/src' }
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true
    }
  });
};
