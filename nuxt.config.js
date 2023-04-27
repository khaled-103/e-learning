export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "e-learning",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  env: {
    stripePublishableKey:
      "pk_test_51Meg81Loe7VzYnJpefrOlBo3mSkbspAoN4A1dyaMbUJi102yGKjRiDoTQTeBD2FxJDMtAdMPbAc9q3IpjoD0X8RO00jcUe8XOp",
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/fontawesome"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    // "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // "@nuxtjs/proxy",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "cookie-universal-nuxt",
    ["nuxt-tailvue", { toast: true }],

    // '@nuxtjs/toast'
  ],


  // pinia: {
  //   autoImports: [
  //     // automatically imports `defineStore`
  //     "defineStore", // import { defineStore } from 'pinia'
  //     ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
  //   ],
  // },


  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    
  },
};
