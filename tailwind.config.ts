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
    },
  },
  plugins: [require("tailwindcss-hero-patterns")],
} satisfies Config;
