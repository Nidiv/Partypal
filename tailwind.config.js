/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/components/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6a1b9a", // Add custom primary color
      },
      fontFamily: {
        zen: ["Zen Kaku Gothic Antique", "sans-serif"], // Add custom font
      },
    },
  },
  plugins: [],
};
