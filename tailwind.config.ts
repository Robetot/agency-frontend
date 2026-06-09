import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#F8FAFC",
          secondary: "#F1F5F9",
          card: "#FFFFFF",
        },
        line: "#E2E8F0",
        accent: {
          primary: "#2563EB",
          primaryHover: "#1D4ED8",
          secondary: "#0EA5E9",
        },
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        text: {
          DEFAULT: "#0F172A",
          secondary: "#475569",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        heading: ["var(--font-inter-tight)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        glow: "0 10px 30px -12px rgba(37, 130, 235, 0.35)",
        "glow-cyan": "0 10px 30px -12px rgba(14, 165, 233, 0.35)",
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 6px 20px -8px rgba(15, 23, 42, 0.10)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(100,116,139,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,116,139,0.08) 1px, transparent 1px)",
        "radial-accent":
          "radial-gradient(60% 60% at 50% 0%, rgba(37,99,235,0.10) 0%, rgba(248,250,252,0) 70%)",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(239,68,68,0.5)" },
          "70%": { boxShadow: "0 0 0 12px rgba(239,68,68,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(239,68,68,0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0.66,0,0,1) infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
