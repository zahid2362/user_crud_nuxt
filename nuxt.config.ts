// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  typescript: {
    typeCheck: true
  },

  runtimeConfig:{
    public:{
      base_url: process.env.NUXT_PUBLIC_API_BASE
    }
  },
  

  postcss: {
    plugins: {
      'tailwindcss': {},
      'autoprefixer': {},
    },
  },

  css: ['~/assets/css/main.css'],

  modules: ["@pinia/nuxt", "@nuxt/eslint", "nuxt-auth-sanctum"],
  
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },

  pinia: {
    storesDirs: ['./stores/**','./modules/**/stores/**'],
  },
  sanctum: {
    baseUrl: 'http://localhost:8080',
    mode: 'token',
    endpoints:{
      login: 'api/v1/login',
      user: 'api/v1/me',
    },
    redirect:{
      onLogin: '/user',
      onAuthOnly: '/login',
      onGuestOnly: '/user'
    }
},
})