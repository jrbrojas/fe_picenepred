import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dynamicImport from 'vite-plugin-dynamic-import'
import dns from 'dns'

// Evita issues de resolución IPv6 en Node 18/20
dns.setDefaultResultOrder?.('ipv4first')

export default defineConfig({
  plugins: [react(), dynamicImport()],
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  server: {
    // Vite corre en 5173 (no en 3000)
    port: 5173,
    proxy: {
      // Todas las llamadas /api del front se envían al backend real en 3000
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        // Si tu backend NO expone el prefijo /api, descomenta esta línea:
        // rewrite: (p) => p.replace(/^\/api/, ''),
      },
    },
  },
  base: '/fe_picenepred/',   // 👈 base para GitHub Pages*/
  build: {
    outDir: 'build',         // 👈 output folder
  },
})
