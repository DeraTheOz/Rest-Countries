/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        blue: {
          900: "hsl(209, 23%, 22%)",
          950: "hsl(207, 26%, 17%)",
        },
        grey: {
          50: "hsl(0, 0%, 99%)",
          400: "hsl(0, 0%, 50%)",
          950: "hsl(200, 15%, 8%)",
        },
        white: " hsl(0, 100%, 100%)",
      },
      fontFamily: {
        nunito: ['"Nunito Sans"', "sans-serif"],
      },
      boxShadow: {
        sm: "0 2px 9px 0 rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
