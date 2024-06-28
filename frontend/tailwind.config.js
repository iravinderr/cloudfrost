/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        CustomBlack: "#252627",
        CustomRed: "#BB0A21",
        CustomBlue: "#4B88A2",
        CustomWhiteSnow: "#FFF9FB",
        ModalBG: "rgba(0, 0, 0, 0.5)"
      }
    },
  },
  plugins: [],
}

