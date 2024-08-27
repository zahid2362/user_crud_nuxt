// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // eslint: {
  //   config: {
  //     stylistic: {
  //       commaDangle: 'never',
  //       braceStyle: '1tbs'
  //     }
  //   }
  // },

  typescript: {
    typeCheck: false
  },

  runtimeConfig: {
    public: {
      base_url: process.env.NUXT_PUBLIC_API_BASE
    }
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    'nuxt-auth-sanctum',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss'
  ],
  postcss: {
    plugins: {
      'tailwindcss': {},
      'autoprefixer': {},
    }
  },

  css: ['~/assets/css/tailwind.css'],
  alias: {
    'pinia': '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
    '@': '/stores'
  },

  pinia: {
    storesDirs: ['./stores/**', './modules/**/stores/**']
  },
  sanctum: {
    baseUrl: 'http://user_crud.test',
    mode: 'token',
    endpoints: {
      login: 'api/v1/login',
      user: 'api/v1/profile'
    },
    redirect: {
      onLogin: '/user',
      onAuthOnly: '/login',
      onGuestOnly: '/user'
    }
  }
})
