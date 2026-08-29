import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
        urdu: ["Noto Nastaliq Urdu", "serif"],
      },
      colors: {
        "swo-blue": "#0EA5E9",
        "swo-deep": "#0284C7",
        "swo-gold": "#F59E0B",
        "swo-dark": "#0A0F1E",
        "swo-card": "#0D1525",
        "swo-border": "#1E293B",
      },
      animation: {
        "spin-slow": "spinSlow 20s linear infinite",
        "float": "floatY 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(14, 165, 233, 0.4)" },
          "50%": { boxShadow: "0 0 60px rgba(14, 165, 233, 0.9)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse at 20% 50%, rgba(14,165,233,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(245,158,11,0.08) 0%, transparent 50%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
