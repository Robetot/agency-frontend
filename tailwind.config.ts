import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm paper canvas — cream, not blue-white
        bg: {
          primary: "#FAF8F5",
          secondary: "#F3EFE9",
          card: "#FFFFFF",
        },
        // Warm hairline border
        line: "#E7E0D6",
        accent: {
          // Confident, trustworthy deep teal — the single primary accent
          primary: "#0F5E5A",
          primaryHover: "#0C4D4A",
          // Friendly amber/clay — used only as a spark + active/emergency state
          secondary: "#E08A3C",
          secondaryHover: "#C9762E",
        },
        success: "#0F5E5A",
        warning: "#E08A3C",
        danger: "#E08A3C",
        text: {
          DEFAULT: "#1C1A17", // warm near-black ink
          secondary: "#57514A", // warm gray body
          muted: "#8A8178", // warm muted for labels/captions
        },
      },
      fontFamily: {
        // Characterful serif carries the hand-crafted personality
        heading: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        // Soft, low-opacity warm shadows for gentle lift
        card: "0 1px 2px rgba(28, 26, 23, 0.04), 0 8px 24px -12px rgba(28, 26, 23, 0.12)",
        soft: "0 12px 36px -18px rgba(28, 26, 23, 0.20), 0 4px 14px -10px rgba(28, 26, 23, 0.10)",
        "soft-lg": "0 24px 56px -24px rgba(28, 26, 23, 0.26), 0 8px 22px -14px rgba(28, 26, 23, 0.12)",
      },
      keyframes: {
        // Warm amber "active/emergency" pulse — not cold red
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(224,138,60,0.45)" },
          "70%": { boxShadow: "0 0 0 12px rgba(224,138,60,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(224,138,60,0)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0.66,0,0,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
