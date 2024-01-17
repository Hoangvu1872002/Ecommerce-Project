/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: {
      main: ["Poppins", "sans-serif"],
    },
    extend: {
      width: {
        main: "1220px",
      },
      backgroundColor: {
        main: "#ee3131",
      },
      colors: {
        main: "#ee3131",
      },
      flex:{
        '2':'2 2 0%',
        '4':'4 4 0%',
        '5':'5 5 0%',
        '3':'3 3 0%',
        '6':'6 6 0%',
        '7':'7 7 0%',
        '8':'8 8 0%',
      },
      keyframes: {
        "slide-top": {
          "0%": {
            "-webkit-transform": "translateY(20px);",
            transform: "translateY(20px);",
          },
          "100%": {
            "-webkit-transform": "translateY(0px);",
            transform: "translateY(0px);",
          },
        },
        "slide-top-sm": {
          "0%": {
            "-webkit-transform": "translateY(8px);",
            transform: "translateY(8px);",
          },
          "100%": {
            "-webkit-transform": "translateY(0px);",
            transform: "translateY(0px);",
          },
        },
      },
      animation: {
        "silde-top":
          "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
          "silde-top-sm":
          "slide-top-sm 0.2s linear both;",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};