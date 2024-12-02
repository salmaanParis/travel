/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this if you have a different folder structure
  ],
  theme: {
    extend: {
      // You can add custom colors, fonts, etc. here
      colors: {
        primary: '#1D4ED8', // Example primary color
        'primary-dark': '#1E40AF', // Example dark primary color
      },
    },
  },
  plugins: [],
};
