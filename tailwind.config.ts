import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ==============================================================
      // STUDIO PALETTE: warm materials, sunlight through a library window
      // ==============================================================
      colors: {
        // Paper / surfaces, deep to light
        studio: {
          ivory: "#f3ede0", // base background
          paper: "#f8f4ea", // raised paper (modals, panels)
          card: "#fbf8f1", // cards, notes
          stone: "#ece4d4", // recessed wells
          dusk: "#e7dec9", // banded section gradients
        },
        // Ink / text, dark to faint
        ink: {
          DEFAULT: "#2c2823",
          soft: "#3f3a32",
          muted: "#4a453d",
          faint: "#5c564c",
          ghost: "#6b655b",
          mute: "#8a8275", // mono captions / meta
        },
        // Restrained accents, muted, never saturated
        terracotta: "#b56a4f",
        dusty: "#6f8696", // dusty blue
        forest: "#56695a", // forest green
        gold: "#b08a4c", // muted gold
        line: "rgba(44,40,35,0.16)", // hairline rules
      },
      fontFamily: {
        serif: ['var(--font-serif)', "Newsreader", "Georgia", "serif"],
        sans: ['var(--font-sans)', '"Hanken Grotesk"', "system-ui", "sans-serif"],
        mono: ['var(--font-mono)', '"Space Mono"', "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1280px",
        wall: "1360px",
        prose: "68ch",
      },
      boxShadow: {
        // Soft, warm, low, like objects resting on a desk
        paper: "0 22px 34px -28px rgba(44,40,35,.55)",
        "paper-lift": "0 38px 50px -36px rgba(44,40,35,.6)",
        well: "inset 0 1px 0 rgba(255,255,255,.5), 0 30px 70px -50px rgba(44,40,35,.5)",
        modal: "0 50px 90px -40px rgba(20,16,10,.7)",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "none" },
        },
        driftScroll: {
          "0%": { opacity: ".25", transform: "translateY(0)" },
          "50%": { opacity: ".7", transform: "translateY(8px)" },
          "100%": { opacity: ".25", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fadeUp .5s cubic-bezier(.2,.6,.2,1)",
        drift: "driftScroll 2.6s ease-in-out infinite",
      },
      transitionTimingFunction: {
        paper: "cubic-bezier(.2,.6,.2,1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
