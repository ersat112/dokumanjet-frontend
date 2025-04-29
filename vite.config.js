// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'path'

export default ({ mode }) => {
  // .env dosyalarını yükleyip JSON.stringify etmek için
  const env = loadEnv(mode, process.cwd(), '')
  const defineEnv = Object.fromEntries(
    Object.entries(env).map(([k, v]) => [k, JSON.stringify(v)])
  )

  return defineConfig({
    define: defineEnv,
    base: '/',
    plugins: [
      react()
    ],
    css: {
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer
        ]
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      // Sadece development modda HMR açık, prod’da tamamen kapalı
      hmr: mode === 'development'
    },
    build: {
      outDir: 'dist'
    }
  })
}
