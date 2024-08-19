// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from 'path'
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

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@pinia/nuxt"],
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },

  pinia: {
    storesDirs: ['./stores/**','./modules/**/stores/**'],
  },
})