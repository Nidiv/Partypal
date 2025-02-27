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
        primary: "#6a1b9a", // Your custom primary color
        primaryLight: "#9c4f96", // Light tone for accents
        primaryDark: "#4e0072", // Darker tone for text
        accent: "#2c3e50", // Dark, neutral accent color for text or borders
        background: "#2c3e50", // Dark background color for depth
        lightGray: "#bdc3c7", // Lighter gray for text
        darkGray: "#34495e", // Darker gray for text contrasts
      },
      fontFamily: {
        zen: ["Zen Kaku Gothic Antique", "sans-serif"], // Add custom font
      },
    },
  },
  plugins: [],
};
