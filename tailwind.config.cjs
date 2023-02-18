/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord_blurple: "#5865F2",
        discord_green: "#57F287",
        discord_yellow: "#FEE75C",
        discord_red: "#ED4245"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}