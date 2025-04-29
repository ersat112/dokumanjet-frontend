// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'path'

export default ({ mode }) => {
  // 1) .env dosyalarını yükle (prefix sınırı yok)
  const env = loadEnv(mode, process.cwd(), '')

  // 2) { KEY: "value" } → { KEY: JSON.stringify(value) }
  const defineEnv = Object.fromEntries(
    Object.entries(env).map(([key, val]) => [key, JSON.stringify(val)])
  )

  // 3) API ayarlarınız
  const API_URL = env.VITE_API_URL || 'https://dokumanjet-backend.onrender.com/api/v1'
  // 4) Base path (build zamanında kodunuzda __BASE__ olarak kullanılır)
  const base = '/'

  return defineConfig({
    base,
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
      strictPort: true,
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') }
    },
    define: {
      __DEFINES__: defineEnv,
      __API_URL__: JSON.stringify(API_URL),
      __HMR_CONFIG_NAME__: JSON.stringify({}),
      __BASE__: JSON.stringify(base)
    },
    css: {
      postcss: { plugins: [tailwindcss(), autoprefixer()] }
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      assetsDir: 'assets',
      sourcemap: mode === 'development'
    }
  })
}
