/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "6rem",
      },
      screens: {
        "2xl": "1520px",
      },
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1600px",
      "4k": "1920px",
    },
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        heading: ['"Clash Display"', '"Inter Tight"', "system-ui", "sans-serif"],
        sans: ['"Inter Tight"', "Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          50: "#f7f7f7",
          100: "#ededed",
          200: "#d9d9d9",
          300: "#b8b8b8",
          400: "#8a8a8a",
          500: "#6b6b6b",
          600: "#4d4d4d",
          700: "#333333",
          800: "#1a1a1a",
          900: "#0a0a0a",
          950: "#000000",
        },
        royal: {
          50: "#eef2ff",
          100: "#dbe4ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#1E40AF",
          600: "#1e3a8a",
          700: "#1e3080",
          800: "#172554",
          900: "#0f172a",
        },
        royalpurple: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#7C3AED",
          600: "#6d28d9",
          700: "#5b21b6",
          800: "#4c1d95",
          900: "#2e1065",
        },
        gold: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#D4AF37",
          600: "#a16207",
          700: "#854d0e",
          800: "#713f12",
          900: "#422006",
        },
        luxe: {
          bg: "#07070a",
          surface: "#0f0f14",
          line: "rgba(255,255,255,0.08)",
          lineLight: "rgba(0,0,0,0.08)",
        },
      },
      backgroundImage: {
        "aurora-gradient":
          "radial-gradient(circle at 20% 10%, rgba(30,64,175,0.35), transparent 40%), radial-gradient(circle at 80% 0%, rgba(124,58,237,0.35), transparent 45%), radial-gradient(circle at 50% 100%, rgba(236,72,153,0.25), transparent 50%)",
        "signature-gradient":
          "linear-gradient(135deg, #1E40AF 0%, #7C3AED 50%, #EC4899 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #fde68a 0%, #D4AF37 40%, #8B7355 100%)",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(212,175,55,0.25), 0 10px 40px -10px rgba(212,175,55,0.45)",
        "glow-blue":
          "0 0 0 1px rgba(30,64,175,0.25), 0 10px 40px -10px rgba(30,64,175,0.45)",
        "glow-purple":
          "0 0 0 1px rgba(124,58,237,0.25), 0 10px 40px -10px rgba(124,58,237,0.55)",
        "soft-xl":
          "0 20px 60px -20px rgba(0,0,0,0.55), 0 8px 24px -12px rgba(0,0,0,0.35)",
        "inner-glow":
          "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.4)",
      },
      backdropBlur: {
        xxl: "40px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        floatSlow: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(3deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%,100%": {
            boxShadow:
              "0 0 0 0 rgba(212,175,55,0.6), 0 0 40px 4px rgba(124,58,237,0.15)",
          },
          "50%": {
            boxShadow:
              "0 0 0 16px rgba(212,175,55,0), 0 0 60px 8px rgba(124,58,237,0.3)",
          },
        },
        auroraShift: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(4%,-2%) scale(1.08)" },
          "66%": { transform: "translate(-3%,3%) scale(1.04)" },
        },
        gradientMove: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        walkBob: {
          "0%,100%": { transform: "translateY(0) rotate(-1deg)" },
          "50%": { transform: "translateY(-6px) rotate(1deg)" },
        },
        unzip: {
          "0%": { transform: "scaleY(1) translateY(0)" },
          "100%": { transform: "scaleY(0.3) translateY(-30px)" },
        },
        beam: {
          "0%": { opacity: "0", transform: "scale(0.4)" },
          "40%": { opacity: "1", transform: "scale(1.4)" },
          "100%": { opacity: "0.2", transform: "scale(3)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        wave: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.7" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        floatSlow: "floatSlow 10s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        pulseGlow: "pulseGlow 2.6s ease-in-out infinite",
        auroraShift: "auroraShift 18s ease-in-out infinite",
        gradientMove: "gradientMove 8s ease infinite",
        walkBob: "walkBob 0.5s ease-in-out infinite",
        beam: "beam 1.6s ease-out forwards",
        marquee: "marquee 40s linear infinite",
        wave: "wave 4s ease-in-out infinite",
        spinSlow: "spinSlow 24s linear infinite",
        ripple: "ripple 0.7s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
