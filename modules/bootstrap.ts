import { defineNuxtModule } from "@nuxt/kit";
import { initialize } from "../server/bootstrap";

export default defineNuxtModule({
  setup(_options, nuxt) {
    nuxt.hook("listen", async (server) => {
      await initialize(server);
    });
  },
});
