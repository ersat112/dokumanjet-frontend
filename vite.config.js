// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'path'

export default ({ mode }) => {
  // 1) .env dosyalarını yükle (prefix sınırlaması yok)
  const env = loadEnv(mode, process.cwd(), '')

  // 2) { KEY: "value", ... } → { KEY: JSON.stringify(value) } formatına çevir
  const defineEnv = Object.fromEntries(
    Object.entries(env).map(([key, val]) => [key, JSON.stringify(val)])
  )

  // 3) Özel API ayarınız
  const API_PREFIX = '/api'
  const API_URL = env.VITE_API_URL || 'https://dokumanjet-backend.onrender.com/api/v1'

  return defineConfig({
    base: '/',
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
      strictPort: true,
      proxy: {
        [API_PREFIX]: {
          target: API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(new RegExp(`^${API_PREFIX}`), '')
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    define: {
      // 4) tüm env değişkenlerinizi bu global altında kullanabilirsiniz:
      //      __DEFINES__.VITE_API_URL, __DEFINES__.OTHER_KEY, vb.
      __DEFINES__: defineEnv,
      // 5) eskiden kullandığınız __API_URL__ global’i de devam ediyor
      __API_URL__: JSON.stringify(API_URL),
      // 6) HMR placeholder’ını boş obje ile stub’luyoruz
      __HMR_CONFIG_NAME__: JSON.stringify({})
    },
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()]
      }
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      assetsDir: 'assets',
      sourcemap: mode === 'development'
    }
  })
}
