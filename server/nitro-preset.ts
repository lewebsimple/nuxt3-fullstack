import type { NitroPreset } from "@nuxt/nitro";

export default {
  entry: "server/entries/node",
  externals: true,
  serveStatic: true,
} as NitroPreset;
