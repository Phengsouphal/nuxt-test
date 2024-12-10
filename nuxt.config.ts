// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  css: ['~/assets/main.css'],
  modules: [
    "@formkit/auto-animate/nuxt",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@vant/nuxt",
    "@nuxtjs/i18n",
    "nuxt-vuefire",
    "@nuxt/icon",
  ],
  i18n: {
    vueI18n: './i18n.config.ts'
     // if you are using custom path, default
  },
  vuefire: {
    config: {
      apiKey: "AIzaSyBEttwDq2S4eJpI-UTuNpLUAok1WKD1VPQ",
      authDomain: "bill-split-5b22d.firebaseapp.com",
      projectId: "bill-split-5b22d",
      appId: "1:308148475244:web:12427d673f98a0fc188f49",
      // there could be other properties depending on the project
    },
    auth: {
      enabled: true
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devtools: { enabled: true },
});