/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [require("daisyui"), require('@tailwindcss/typography')],
};