/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Syne", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        body: ["DM Sans", "sans-serif"],
      },
      colors: {
        // ── Surfaces ────────────────────────────────────────────────
        background: {
          primary: "#FFFFFF",
          secondary: "#F0F8F7",
          alternative: "#5AACB5",
        },
        // ── Text ────────────────────────────────────────────────────
        text: {
          DEFAULT: "#0D2020",
          primary: "#0D2020",
          secondary: "#5AACB5",
          alternative: "#FFFFFF",
        },
        // ── Borders ─────────────────────────────────────────────────
        border: {
          primary: "rgba(90,172,181,0.18)",
          alternative: "rgba(90,172,181,0.10)",
        },
        // ── Brand palette — KM Trockenbau Teal ──────────────────────
        hoser: {
          gold: "#5AACB5",         // primary teal accent
          "gold-light": "#7BBFB8", // lighter teal
          cream: "#FFFFFF",
          charcoal: "#0D2020",
          stone: "#4A7878",
          navy: "#5AACB5",
          "navy-light": "#7BBFB8",
          "navy-deep": "#3A8F8A",
        },
        neutral: {
          lightest: "#FFFFFF",
        },
      },
      animation: {
        "marquee-top": "marquee-top 50s linear infinite",
        "marquee-bottom": "marquee-bottom 50s linear infinite",
        "marquee-left": "marquee-left 25s linear infinite",
        "marquee-right": "marquee-right 25s linear infinite",
        "scroll-down": "scroll-down 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite",
      },
      keyframes: {
        "marquee-top": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "marquee-bottom": {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "scroll-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      boxShadow: {
        xlarge: "0px 24px 48px -12px rgba(217, 69, 32, 0.10)",
      },
      fontSize: {
        md: ["1.125rem", { lineHeight: "1.5" }],
        "10xl": ["3.5rem", { lineHeight: "1.2" }],
      },
      spacing: {
        18: "4.5rem",
      },
      minHeight: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};
