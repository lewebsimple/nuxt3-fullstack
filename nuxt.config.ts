import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: ["@urql/vue"],
  },
  css: ["~/assets/main.css"],
  buildModules: ["@nuxtjs/tailwindcss", "@formkit/nuxt"],
  publicRuntimeConfig: {
    graphqlApiURL: process.env.GRAPHQL_API_URL || "http://localhost:3000/api/graphql",
  },
  tailwindcss: {
    viewer: false,
  },
  typescript: { strict: true },
});
