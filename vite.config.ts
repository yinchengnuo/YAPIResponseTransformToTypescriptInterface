/*
 * @Description: vite.config.ts
 * @Autor: 尹成诺
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()],
  base: '/app/yapi/',
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
