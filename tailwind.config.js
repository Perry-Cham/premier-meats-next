/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          red: "#c41e2a",
          "red-hover": "#b01821",
          "red-deep": "#a01624",
          gold: "#a87c3e",
          "gold-light": "#ffbe63",
          cream: "#f7f4ef",
          "off-white": "#f0ece4",
          dark: "#1c1917",
          muted: "#78716c",
          border: "#e8e2d9",
          white: "#ffffff",
          "red-tint": "#fff8f8",
          "gold-tint": "#fdfaf6",
          placeholder: "#c8bfb0",
          breadcrumb: "#d4cfc6",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        display: ["var(--font-cormorant)"],
        body: ["var(--font-jost)"],
      },
    },
  },
  darkMode: "class",
};

module.exports = config;
