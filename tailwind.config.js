/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.html"],
  safelist: [
    // Table Properties
    "h-10",
    "text-center",

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

    // purple styles
    "bg-violet-500 ",
    "px-3",
    "py-0.5",
    "text-white",

    // Transitions
    "transform",
    "transition-transform",
    "duration-300",
    "rotate-180",
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
