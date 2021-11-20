import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
console.log(process.env)
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
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
