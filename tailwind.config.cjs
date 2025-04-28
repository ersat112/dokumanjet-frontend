/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable dark mode via class strategy
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,svelte,vue}'
  ],
  theme: {
    extend: {
      // Custom colors
      colors: {
        primary: {
          DEFAULT: '#2563EB',   // blue-600
          light: '#3B82F6',     // blue-500
          dark: '#1E40AF'       // blue-800
        },
        secondary: {
          DEFAULT: '#10B981',   // green-500
          light: '#34D399',     // green-400
          dark: '#047857'       // green-700
        }
      },
      // Custom font families
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui']
      },
      // Custom spacing and sizes
      spacing: {
        '128': '32rem',
        '144': '36rem'
      },
      // Custom animations
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),        // form styles
    require('@tailwindcss/typography'),  // prose classes
    require('@tailwindcss/aspect-ratio') // aspect ratio utilities
  ],
  // Safelist dynamic classes
  safelist: [
    'bg-primary', 'bg-primary-light', 'bg-primary-dark',
    'bg-secondary', 'bg-secondary-light', 'bg-secondary-dark'
  ]
};
