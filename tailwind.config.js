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
        // primary  = warm "blueprint paper" canvas — main page bg
        // secondary = slightly more pigmented for alternating sections
        // alternative = deep brand blue — used for accent / feature blocks
        background: {
          primary: "#FDFCF8",
          secondary: "#F2EFE6",
          alternative: "#D94520",
        },
        // ── Text ────────────────────────────────────────────────────
        // primary  = near-black w/ warm undertone (on light)
        // secondary = mid-gray (on light)
        // alternative = white (used on accent orange blocks)
        text: {
          DEFAULT: "#0A1628",
          primary: "#0A1628",
          secondary: "#D94520",
          alternative: "#FFFFFF",
        },
        // ── Borders ─────────────────────────────────────────────────
        border: {
          primary: "rgba(217,69,32,0.14)",
          alternative: "rgba(217,69,32,0.08)",
        },
        // ── Brand palette ───────────────────────────────────────────
        hoser: {
          gold: "#D94520",         // primary brand accent (Härtl Orange)
          "gold-light": "#E55528", // brighter orange
          cream: "#FDFCF8",        // canvas off-white
          charcoal: "#0A1628",     // near-black ink
          stone: "#5A6478",        // mid gray
          navy: "#D94520",         // brand orange — feature blocks
          "navy-light": "#E55528",
          "navy-deep": "#9E300E",
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
