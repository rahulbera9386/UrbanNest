/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        dosis:["Dosis","sans-serif"]
      },
      boxShadow:{
        custom:"rgba(0, 0, 0, 0.35) 0px 5px 15px"
      }
    },
  },
  plugins: [],
}