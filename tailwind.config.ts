import type { Config } from "tailwindcss";

// Mirrors Figr /signal/src/tailwind.config.js verbatim — all classes resolve identically.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        "fg-muted": "var(--fg-muted)",
        pink: "var(--pink)",
        "pink-wash": "var(--pink-wash)",
        line: "var(--border)",
        grid: "var(--grid)",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        display: ["var(--font-big-shoulders)", "var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        none: "0",
        sm: "0",
        DEFAULT: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        full: "9999px",
      },
      letterSpacing: { widest: "0.22em" },
      maxWidth: { "8xl": "1400px" },
    },
  },
  plugins: [],
};

export default config;
