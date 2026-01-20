/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1a1a2e',
        cherry: '#c21e56',
        beige: '#f5f1e8',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'serif'],
        manrope: ['var(--font-manrope)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}