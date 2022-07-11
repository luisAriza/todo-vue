/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: (theme) => ({
        ...theme("colors"),
        primary: "#42b983",
        secondary: "#2c3e50",
      }),
      textColor: {
        primary: "#42b983",
        secondary: "#2c3e50",
      },
    },
  },
  plugins: [],
};
