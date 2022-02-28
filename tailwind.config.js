/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.5rem",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp"), require("@tailwindcss/typography")],
};
