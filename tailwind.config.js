/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{css}",
  ],
  
  theme: {
    extend: {
      fontFamily: {
        'wallpoet': ['var(--font-wallpoet)', 'sans-serif'],
        'cute': ['var(--font-cute)', 'sans-serif'],
        'consolas': ['Consolas', 'monospace'],
      },
      colors: {
        primary: '#9658F9',
        secondary: '#BDFF07',
        accent: '#300B6A',
        'accent-secondary': '#5C7515',
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("./src/tailwind-plugin/tw-theme"),
    require("./src/tailwind-plugin/tw-bs-grid"),
  ],
}; 