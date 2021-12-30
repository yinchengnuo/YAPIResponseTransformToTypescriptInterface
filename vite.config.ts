import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: tag => tag === 'webview'
      }
    }
  })],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    strictPort: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 2048
  }
})
