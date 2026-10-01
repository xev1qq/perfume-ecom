/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pistachio: {
          50: '#f6f8ef',
          100: '#eaf0d6',
          200: '#d4e1ad',
          300: '#bbcd84',
          400: '#a3b85e',
          500: '#8ba346',
          600: '#6d8234',
          700: '#56632a',
          800: '#3f4820',
          900: '#2a3015',
        },
        brown: {
          50: '#faf6f1',
          100: '#f0e6d9',
          200: '#e2ccba',
          300: '#cfac91',
          400: '#bb8c6a',
          500: '#a8704f',
          600: '#8c583c',
          700: '#6f4430',
          800: '#4a2e20',
          900: '#2e1c14',
        },
        cream: {
          50: '#fdfbf7',
          100: '#f9f4ea',
          200: '#f2e9d6',
          300: '#e9dcc0',
          400: '#dccb9e',
          500: '#cbb87e',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Jost"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
