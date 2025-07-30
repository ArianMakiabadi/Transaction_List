/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.html"],
  safelist: [
    // Red styles
    "ring-red-300",
    "bg-red-200",
    "text-red-500",
    "text-red-600",

    // Green styles
    "ring-green-300",
    "bg-green-200",
    "text-green-500",
    "text-green-600",
  ],
  theme: {
    extend: {
      fontFamily: {
        myfont: ["Dongle", "sans-serif"],
      },
    },
  },
  plugins: [],
};
