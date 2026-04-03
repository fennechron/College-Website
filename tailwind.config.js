/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0C2B4E",    // Deep Navy
        secondary: "#1A3D64",  // Royal Blue
        accent: "#1D546C",     // Teal Blue
        background: "#F4F4F4", // Off-White
        "navy-dark": "#06182B",
        "teal-light": "#2A789A",
        cream: "#F4F4F4",
        text: "#0C2B4E",
        muted: "#1A3D64",
        border: "rgba(29, 84, 108, 0.2)",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["DM Sans", "sans-serif"],
      },
      keyframes: {
        scrolltxt: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.7)" },
        },
        scrollUp: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
      animation: {
        scrolltxt: "scrolltxt 30s linear infinite",
        "pulse-dot": "pulseDot 1.8s ease-in-out infinite",
        "scroll-up": "scrollUp 20s linear infinite",
      },
      boxShadow: {
        card: "0 2px 16px rgba(10,22,40,0.06)",
        hero: "0 20px 60px rgba(10,22,40,0.15)",
        teal: "0 8px 30px rgba(13,115,119,0.4)",
      },
    },
  },
  plugins: [],
}
