/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        RaisinBlack: "#211A1D",
        ElectricIndigo: "#6320EE",
        SlateBlue: "#8075FF",
        Magnolia: "#F8F0FB",
        AshGray: "#CAD5CA",
        ModalBG: "rgba(0, 0, 0, 0.5)"
      }
    },
  },
  plugins: [],
}

