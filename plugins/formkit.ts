import { plugin, defaultConfig, FormKitSchema } from "@formkit/vue";
import type { DefaultConfigOptions } from "@formkit/vue";

const options: DefaultConfigOptions = {
  config: {
    classes: {
      outer: "mb-3",
      label: "font-bold",
      help: "text-sm text-slate-400",
      messages: "mb-3 text-sm text-red-800",
    },
    rootClasses(sectionKey, node) {
      return {
        [`formkit-${sectionKey}`]: true,
        ...(sectionKey === "input" && node.props.type === "submit" && { btn: true }),
      };
    },
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("FormKitSchema", FormKitSchema);
  nuxtApp.vueApp.use(plugin, defaultConfig(options));
});
