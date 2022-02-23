import urql from "@urql/vue";
import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const { graphqlApiURL } = useRuntimeConfig();

  nuxtApp.vueApp.use(urql, {
    url: graphqlApiURL,
  });
});
