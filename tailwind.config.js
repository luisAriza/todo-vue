/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        check: "url('/src/assets/check.svg')",
        uncheck: "url('/src/assets/uncheck.svg')",
        edit: "url('/src/assets/edit.svg')",
        arrow: "url('/src/assets/arrow.svg')",
        remove: "url('/src/assets/delete.svg')",
      },
      backgroundColor: (theme) => ({
        ...theme("colors"),
        primary: "#42b983",
        secondary: "#2c3e50",
      }),
      textColor: {
        primary: "#42b983",
        secondary: "#2c3e50",
      },
      screens: {
        xs: "441px",
      },
    },
  },
  plugins: [],
};
