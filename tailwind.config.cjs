module.exports = {
  content: ["./src/**/*.{html,js,svelte}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        "filon-chinois-theme": {
          primary: "#073F98",
          "primary-focus": "#CC2E28",
          "primary-content": "#F9F9F9",

          secondary: "#CC2E28",
          "secondary-focus": "#073F98",
          "secondary-content": "#F9F9F9",

          neutral: "#F9F9F9",
          "neutral-focus": "#F7F6F0",
          "neutral-content": "#647186",

          "base-100": "#F9F9F9",
          "base-200": "#F7F6F0",
          "base-content": "#041E49",

          info: "#88C0D0",
          success: "#A3BE8C",
          warning: "#EBCB8B",
          error: "#D08770",
        },
      },
    ],
  },
};
