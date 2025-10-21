/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: '#3E2723',
        walnut: '#5D4037',
        gold: '#D4AF37',
        beige: '#F5E6D3',
        stone: '#EFEBE9',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}