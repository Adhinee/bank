const { FaImages } = require('react-icons/fa');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('../src/images/login_bg.jpg')"
      },
     
    },
    fontFamily:{
      dmsans:['DM Sans','serif']
    }
  },
  plugins: [],
}