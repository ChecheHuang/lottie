import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'lottery',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules')[1]
              .split('/')[0]
              .toString()
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: false,
    proxy: {
      '/api': {
        target: loadEnv('development', process.cwd()).VITE_APP_BASE_API,
        changeOrigin: true,
        rewrite: (path) => path.replace('/api', 'api'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
