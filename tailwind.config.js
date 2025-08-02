/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.html", "./src/js/*.js"],
  theme: {
    extend: {
      fontFamily: {
        myfont: ["Dongle", "sans-serif"],
      },
    },
  },
  plugins: [],
};
