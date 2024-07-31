/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class",
  safelist: [
    {
      pattern:
        /(bg|text|border|ring)-(indigo|blue|green|red|purple|zinc|gray)-(500|600|700)/,
    },
  ],
  plugins: [],
};
