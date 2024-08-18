// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from 'path'
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  alias:{
    '@' : resolve(__dirname,'/util'),
    '@type' : resolve(__dirname,'/types'),
  },
  runtimeConfig:{
    public:{
      base_url: process.env.NUXT_PUBLIC_API_BASE
    }
  },

  css: ['~/assets/css/main.css'],
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
