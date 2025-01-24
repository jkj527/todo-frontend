import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0D0D0D",
        darkGray: "#1A1A1A",
        gray: "#262626",
        lightGray: "#333333",
        blue: "#1E6F9F",
        purple: "#5E60CE",
        red: "#E25858",
        green: "#3BD686",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        bold: "900",
      },
    },
  },
  plugins: [],
} satisfies Config;
