/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
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
