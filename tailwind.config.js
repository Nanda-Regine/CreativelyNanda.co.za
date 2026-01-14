/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1128',
          light: '#1E2749',
          dark: '#050819'
        },
        beige: {
          DEFAULT: '#E8DCC4',
          light: '#F5F0E8',
          dark: '#D4C5A9'
        },
        cherry: {
          DEFAULT: '#C1292E',
          light: '#E63946',
          dark: '#9B1F23'
        }
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}