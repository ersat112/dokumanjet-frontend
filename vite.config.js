// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'path'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const defineEnv = Object.fromEntries(
    Object.entries(env).map(([k, v]) => [k, JSON.stringify(v)])
  )

  const API_URL = env.VITE_API_URL || 'https://dokumanjet-backend.onrender.com/api/v1'
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

      // HMR / overlay / base stub’ları
      __HMR_CONFIG_NAME__:  JSON.stringify({}),
      __SERVER_HOST__:      JSON.stringify(''),
      __HMR_PROTOCOL__:     JSON.stringify(''),
      __HMR_PORT__:         JSON.stringify(''),
      __HMR_HOSTNAME__:     JSON.stringify(''),
      __HMR_BASE__:         JSON.stringify(''),
      __HMR_DIRECT_TARGET__:JSON.stringify(''),
      __WS_TOKEN__:         JSON.stringify(''),
      __HMR_ENABLE_OVERLAY__: JSON.stringify(false),
      __BASE__:             JSON.stringify(base)
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
