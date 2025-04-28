/** @type {import('tailwindcss').Config} */
const typography = require('@tailwindcss/typography');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB', // blue-600
        secondary: '#10B981', // green-500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    }
  },
  plugins: [
    typography
  ],
};

