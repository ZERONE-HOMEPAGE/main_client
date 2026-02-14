/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        zerone: {
          DEFAULT: '#5F63E6',
          500: '#7270E6',
          600: '#5F63E6',
          700: '#4A4CB8',
        },
      },
      animation: {
        'swing': 'swing 1s ease-in-out infinite',
      },
      keyframes: {
        swing: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
      },
    },
  },
  plugins: [],
}

