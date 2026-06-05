/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05060B",
          900: "#0A0C13",
          850: "#0E111B",
          800: "#141826",
          700: "#1C2233",
          600: "#262E45",
        },
        neon: {
          cyan: "#22E0FF",
          green: "#3DFFA8",
          pink: "#FF45C8",
          purple: "#9B5CFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-grotesk)", "var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        "glow-cyan": "0 0 0 1px rgba(34,224,255,0.4), 0 0 24px -2px rgba(34,224,255,0.45)",
        "glow-green": "0 0 28px -4px rgba(61,255,168,0.55)",
        "glow-pink": "0 0 28px -4px rgba(255,69,200,0.5)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
