/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6734d8",
        secondary: "#a5d834",
        third: "#34d8b9",
        red: "#d83453",
        orange: "#d86734",
        // secondary: '#79e0ee',
        // secondary: '#d1f7f3',
        main_background: "#f5f5f5",
        background1: "#d9d9d9",
      },
      fontFamily: {
        rItalic: ["Rubik-Italic", "sans-serif"],
        rlight: ["Rubik-Light", "sans-serif"],
        rregular: ["Rubik-Regular", "sans-serif"],
        rmedium: ["Rubik-Medium", "sans-serif"],
        rsemibold: ["Rubik-SemiBold", "sans-serif"],
        rbold: ["Rubik-Bold", "sans-serif"],
        rextrabold: ["Rubik-ExtraBold", "sans-serif"],
        rblack: ["Rubik-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
