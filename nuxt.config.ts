// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxt/icon', '@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css', 'ol/ol.css'],
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'pl', name: 'Polish', file: 'pl.json' }
    ],
    strategy: "no_prefix"
  }
})