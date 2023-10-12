/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-100": "#2B2C35",
        "primary-blue": {
          DEFAULT: "#2B59FF",
          50: "#e5ebff",
          100: "#F5F8FF",
          200: "#b3c3ff",
          300: "#809bff",
          400: "#4d73ff",
          500: "#1a4bff",
          600: "#0032e6",
          700: "#0027b3",
          800: "#001c80",
          900: "#00114d",
        },
        "secondary-orange": "#f79761",
        "light-white": {
          DEFAULT: "rgba(59,60,152,0.03)",
          100: "rgba(59,60,152,0.02)",
        },
        grey: "#747A88",
      },
    },
  },
  plugins: [],
};
