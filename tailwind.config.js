/** @type {import('tailwindcss').Config} */
export default {
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
