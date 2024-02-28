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
        tertiary: "hsla(223, 100%, 93%, 1)",
        background: "#f9fafc",
        "secondary-text": "#2D354E",
        positive: "#24A810",
        negative: "#A81010",
      },
    },
  },
  plugins: [require("tailwindcss-hero-patterns")],
} satisfies Config;
