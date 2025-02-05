/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 0 15px rgba(0, 0, 0, 0.5)',
      },
      colors:{
        "primary":"#5f6fff",
        "secondary":"#3bb77e",
        "textColor":"#5C5C5C"
      },
      gridTemplateColumns:{
        "auto":"repeat(auto-fill,minmax(200px,1fr))"
      }
    },
  },
  plugins: [],
}