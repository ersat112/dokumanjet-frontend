import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'process.env': env,
    },
    base: '/',
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      hmr: mode === 'development',
    },
    build: {
      outDir: 'dist',
      minify: 'esbuild',
      sourcemap: false,
    },
  };
});
