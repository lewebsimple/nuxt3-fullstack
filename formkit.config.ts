import { DefaultConfigOptions } from "@formkit/vue";
import { generateClasses } from "@formkit/tailwindcss";

export default {
  config: {
    classes: generateClasses({
      global: {
        outer: "mb-3",
        label: "font-bold",
        help: "text-sm text-slate-400",
        messages: "mb-3 text-sm text-red-500",
      },
      submit: {
        input: "btn",
      },
    }),
  },
} as DefaultConfigOptions;
