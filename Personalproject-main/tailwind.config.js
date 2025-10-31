/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        mint: {
          50: '#ECFFF6',
          100: '#D6FFF0',
          200: '#B2F3E0'
        }
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(16, 185, 129, 0.25)'
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
};
