/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode based on class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        volkhov: ["Volkhov", "serif"], // Add Volkhov font
        yesteryear: ["Yesteryear", "cursive"], // Add Yesteryear font
      },
    },
  },
  plugins: [],
};
