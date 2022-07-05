import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18n from '@intlify/vite-plugin-vue-i18n';

export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vue(),
    VueI18n({
      include: fileURLToPath(new URL('./locales/**', import.meta.url))
    }),
  ]
})
