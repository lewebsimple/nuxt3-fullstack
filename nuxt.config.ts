import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: ["@urql/vue"],
  },
  buildModules: ["@nuxtjs/tailwindcss", "nuxt-graphql-codegen"],
  typescript: { strict: true },
});
