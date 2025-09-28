// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  ssr: false,

  vite: {
    plugins: [
      tailwindcss(),
    ]
  },

  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/fonts', '@nuxt/icon']
})