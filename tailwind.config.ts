import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#171717",
          muted: "#5f625e",
        },
        paper: "#ffffff",
        cream: {
          soft: "#fbfaf5",
          warm: "#fdf8f0",
        },
        sage: {
          wash: "#f0f6ee",
          light: "#e2eedf",
          DEFAULT: "#dfeedd",
        },
        brand: {
          green: "#79b92f",
          "green-dark": "#4e7f20",
          peach: "#e9c7a6",
          gold: "#b08336",
          "gold-dark": "#8c6523",
        },
        line: "#e7e9e3",
        status: {
          success: "#2f8b57",
          danger: "#c44f43",
        },
      },
      fontFamily: {
        arabic: ["Cairo", "Tajawal", "system-ui", "sans-serif"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRtl: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(50%)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "marquee-rtl": "marqueeRtl 25s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
