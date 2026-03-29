/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: "#FF6F61",
        coral2: "#FF5252",
        cream: "#FFFDF9",
        "cream-alt": "#F5EBE6",
        gold: "#E8A020",
        gold2: "#F5C842",
        muted: "#8D7B77",
        border: "#EADFD8",
        text: "#3E2723",
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
      },
      animation: {
        scrolltxt: "scrolltxt 30s linear infinite",
        "pulse-dot": "pulseDot 1.8s ease-in-out infinite",
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
