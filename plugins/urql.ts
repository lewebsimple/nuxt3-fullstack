import urql, { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "@urql/vue";
import { devtoolsExchange } from "@urql/devtools";
import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const { graphqlApiURL } = useRuntimeConfig();

  // Create SSR exchange
  const ssr = ssrExchange({
    isClient: process.client,
  });

  // Extract SSR payload once app is rendered on the server
  if (process.server) {
    nuxtApp.hook("app:rendered", () => {
      nuxtApp.payload?.data && (nuxtApp.payload.data.urql = ssr.extractData());
    });
  }

  // Restore SSR payload once app is created on the client
  if (process.client) {
    nuxtApp.hook("app:created", () => {
      nuxtApp.payload?.data && ssr.restoreData(nuxtApp.payload.data.urql);
    });
  }

  // Custom exchanges
  const exchanges = [dedupExchange, cacheExchange, ssr, fetchExchange];

  // Devtools exchange
  if (nuxtApp._legacyContext?.isDev) {
    exchanges.unshift(devtoolsExchange);
  }

  nuxtApp.vueApp.use(urql, {
    url: graphqlApiURL,
    exchanges,
  });
});
