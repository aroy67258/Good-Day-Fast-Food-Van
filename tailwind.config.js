/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        goodday: {
          yellow: '#F5A623',
          'yellow-hover': '#E09214',
          'yellow-light': '#FEF3C7',
          red: '#C21807',
          'red-dark': '#8E1105',
          'red-light': '#FEE2E2',
          green: '#15803D',
          'green-light': '#DCFCE7',
          dark: '#1C1917',
          cream: '#FFFBEB',
          surface: '#292524',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Poppins', 'sans-serif']
      },
      boxShadow: {
        'warm': '0 10px 25px -5px rgba(194, 24, 7, 0.25), 0 8px 10px -6px rgba(245, 166, 35, 0.2)',
        'warm-lg': '0 20px 35px -5px rgba(194, 24, 7, 0.3), 0 10px 15px -5px rgba(245, 166, 35, 0.25)',
      }
    },
  },
  plugins: [],
}
