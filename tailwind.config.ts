import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Cognitive Substrate Color System
      colors: {
        // Base: Deep space dark (not pure black)
        substrate: {
          void: "#0a0814",
          deep: "#0d1b2a",
          mid: "#1b263b",
          surface: "#2d3e50",
        },
        // Active cognition: electric cyan
        cognition: {
          DEFAULT: "#00d9ff",
          dim: "#00d9ff80",
          glow: "#00d9ff40",
          subtle: "#00d9ff20",
        },
        // Connections: violet purple
        emergence: {
          DEFAULT: "#8b5cf6",
          dim: "#8b5cf680",
          glow: "#8b5cf640",
          subtle: "#8b5cf620",
        },
        // Memory: amber gold
        memory: {
          DEFAULT: "#fbbf24",
          dim: "#fbbf2480",
          glow: "#fbbf2440",
          subtle: "#fbbf2420",
        },
        // Data flow: cool blue
        data: {
          DEFAULT: "#3b82f6",
          dim: "#3b82f680",
          glow: "#3b82f640",
          subtle: "#3b82f620",
        },
        // Neutral layers
        glass: {
          white: "rgba(255, 255, 255, 0.03)",
          border: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(255, 255, 255, 0.12)",
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
      },
      // Typography as data structure
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', '"SF Mono"', "Consolas", "monospace"],
        sans: ['"Inter"', '"SF Pro Display"', "system-ui", "sans-serif"],
        display: ['"Space Grotesk"', '"Inter"', "system-ui", "sans-serif"],
      },
      // Animation timings for cognitive motion
      animation: {
        "breathe": "breathe 3s ease-in-out infinite",
        "breathe-slow": "breathe 5s ease-in-out infinite",
        "drift": "drift 20s ease-in-out infinite",
        "drift-reverse": "drift 25s ease-in-out infinite reverse",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "particle-flow": "particleFlow 8s linear infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in-scale": "fadeInScale 0.5s ease-out forwards",
        "glow-pulse": "glowPulse 2.5s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "network-pulse": "networkPulse 3s ease-in-out infinite",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(10px, -10px) rotate(1deg)" },
          "50%": { transform: "translate(-5px, 15px) rotate(-1deg)" },
          "75%": { transform: "translate(-15px, -5px) rotate(0.5deg)" },
        },
        pulseGlow: {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(0, 217, 255, 0.3), 0 0 40px rgba(0, 217, 255, 0.1)",
            borderColor: "rgba(0, 217, 255, 0.3)"
          },
          "50%": { 
            boxShadow: "0 0 30px rgba(0, 217, 255, 0.5), 0 0 60px rgba(0, 217, 255, 0.2)",
            borderColor: "rgba(0, 217, 255, 0.5)"
          },
        },
        particleFlow: {
          "0%": { transform: "translateY(100vh) translateX(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-100vh) translateX(50px)", opacity: "0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInScale: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        glowPulse: {
          "0%, 100%": { filter: "brightness(1) drop-shadow(0 0 8px currentColor)" },
          "50%": { filter: "brightness(1.2) drop-shadow(0 0 15px currentColor)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotateX(0deg)" },
          "50%": { transform: "translateY(-10px) rotateX(2deg)" },
        },
        networkPulse: {
          "0%, 100%": { strokeOpacity: "0.3", strokeWidth: "1" },
          "50%": { strokeOpacity: "0.8", strokeWidth: "2" },
        },
      },
      // Backdrop blur for glass effects
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "40px",
      },
      // Box shadows for depth and glow
      boxShadow: {
        "glass": "0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        "glass-hover": "0 8px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        "cognition": "0 0 30px rgba(0, 217, 255, 0.3), 0 0 60px rgba(0, 217, 255, 0.1)",
        "emergence": "0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.1)",
        "memory": "0 0 30px rgba(251, 191, 36, 0.3), 0 0 60px rgba(251, 191, 36, 0.1)",
        "data": "0 0 30px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.1)",
        "glow-sm": "0 0 10px currentColor",
        "glow-md": "0 0 20px currentColor",
        "glow-lg": "0 0 40px currentColor",
      },
      // Z-index scale for layered architecture
      zIndex: {
        "substrate-deep": "-20",
        "substrate-mid": "-10",
        "substrate-surface": "0",
        "content": "10",
        "overlay": "20",
        "modal": "30",
        "navigation": "40",
      },
      // Spacing scale
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
        "144": "36rem",
      },
      // Screen sizes
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      // Max width
      maxWidth: {
        content: "1200px",
        prose: "65ch",
        "8xl": "88rem",
      },
      // Border radius
      borderRadius: {
        "4xl": "2rem",
      },
      // Transition timing
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
