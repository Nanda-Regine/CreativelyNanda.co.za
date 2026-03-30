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
        // Core Brand
        navy: '#1a1a2e',
        cherry: '#c21e56',
        'cherry-dark': '#8B0A35',
        beige: '#f5f1e8',

        // Extended Palette
        'navy-deep': '#0A1128',
        gold: '#D4A574',
        'gold-leaf': '#C9A961',
        'rose-deep': '#8B0A1A',
        'rose-blush': '#D4A5A5',
        parchment: '#F5F0E8',
        ink: '#1A1A2E',

        // Mirembe Sanctuary Theme
        'forest-green': '#2D5016',
        'sage-green': '#9CAF88',
        cream: '#F5F1E8',
        terracotta: '#D4A373',

        // Dev Blog Theme
        charcoal: '#1e1e1e',
        'midnight-blue': '#0d1117',
        'electric-cyan': '#00d4ff',
        'code-green': '#50fa7b',
        amber: '#ffb86c',
        'mint-green': '#8be9fd',

        // Writing Sanctuary Theme
        lavender: '#e6d5f0',
        'gentle-rose': '#ffd6e8',
        'warm-coral': '#ff9a8b',
        'sunset-gold': '#ffeaa7',
        sage: '#a8d5ba',
        'sky-blue': '#c7ecee',

        // Business Blog Theme
        'professional-navy': '#1e3a5f',
        'trust-blue': '#2c5f8d',
        emerald: '#059669',
        'success-gold': '#f59e0b',
      },
      fontFamily: {
        // Display/Headings
        display: ['var(--font-cormorant)', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        // Body Text
        body: ['var(--font-manrope)', 'sans-serif'],
        manrope: ['var(--font-manrope)', 'sans-serif'],
        // Poetry/Literary
        lora: ['Lora', 'serif'],
        // Code
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
        // Handwritten Accents
        satisfy: ['Satisfy', 'cursive'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'organic-1': '60% 40% 55% 45% / 55% 60% 40% 45%',
        'organic-2': '47% 53% 43% 57% / 54% 46% 54% 46%',
        'organic-3': '55% 45% 60% 40% / 45% 55% 45% 55%',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'spin-slow': 'spin 120s linear infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'elevated': '0 10px 40px rgba(0, 0, 0, 0.15)',
        'glow-gold': '0 0 40px rgba(212, 165, 116, 0.3)',
        'glow-cherry': '0 0 40px rgba(194, 30, 86, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
