import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const isProd = mode === 'production';

  return defineConfig({
    define: {
      '__DEFINES__': JSON.stringify(env),
      '__HMR_CONFIG_NAME__': JSON.stringify(isProd ? '' : 'dev'),
    },
    base: '/',
    plugins: [
      react(),
    ],
    css: {
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer,
        ],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      hmr: !isProd,
    },
    build: {
      outDir: 'dist',
      minify: 'esbuild',
      sourcemap: false,
    },
  });
};
