import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", ...fontFamily.sans],
        serif: ["Trocchi", ...fontFamily.serif],
      },
      colors: {
        primary: "hsla(236, 61%, 32%, 1)",
        secondary: "hsla(223, 100%, 79%, 1)",
        tertiary: "rgba(219, 229, 255, 0.3)",
        background: "#f9fafc",
        "secondary-text": "#2D354E",
        "tertiary-text": "#6E6E6E",
        positive: "#24A810",
        "positive-background": "#E3FEF2",
        "positive-border": "#95E4C0",
        negative: "#A81010",
      },
    },
  },
  daisyui: {
    themes: [
      {
        customtheme: {
          primary: "#bae6fd",

          secondary: "#00e600",

          accent: "#d20000",

          neutral: "#362130",

          "base-100": "#f9fafc",

          info: "#00c2ff",

          success: "#00a548",

          warning: "#d47b00",

          error: "#d30039",
        },
      },
    ],
  },
  plugins: [require("tailwindcss-hero-patterns"), require("daisyui")],
} satisfies Config;
