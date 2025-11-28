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
        black: "#000000",
        surface: "#0a0a0a",
        white: "#ffffff",
        gray: "#666666",
        accent: "#0066ff",
        border: "#222222",
      },
      screens: {
        sm: "640px",
        lg: "1024px",
      },
      spacing: {
        // Powers of 2 scale: 4, 8, 16, 24, 32, 48, 64, 96, 128
        "1": "4px",
        "2": "8px",
        "4": "16px",
        "6": "24px",
        "8": "32px",
        "12": "48px",
        "16": "64px",
        "24": "96px",
        "32": "128px",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["Courier New", "Courier", "monospace"],
      },
      fontWeight: {
        extralight: "200",
        normal: "400",
      },
      maxWidth: {
        content: "1200px",
        prose: "60ch",
      },
      lineHeight: {
        tight: "1.1",
        normal: "1.5",
        relaxed: "1.6",
      },
      letterSpacing: {
        tight: "-0.03em",
        wide: "0.1em",
      },
    },
  },
  plugins: [],
} satisfies Config;
