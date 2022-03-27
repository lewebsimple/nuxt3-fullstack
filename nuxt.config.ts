import { resolve } from "pathe";
import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  alias: {
    "nexus-prisma": "nexus-prisma/dist-cjs/entrypoints/main.js",
  },
  build: {
    transpile: ["@urql/vue"],
  },
  css: ["~/assets/main.css"],
  modules: ["~/modules/bootstrap", "@nuxtjs/tailwindcss", "@formkit/nuxt"],
  nitro: {
    preset: resolve(__dirname, "server/nitro-preset.ts"),
  },
  publicRuntimeConfig: {
    graphqlApiURL: process.env.GRAPHQL_API_URL || "http://localhost:3000/api/graphql",
  },
  tailwindcss: {
    viewer: false,
  },
  typescript: { strict: true },
});
