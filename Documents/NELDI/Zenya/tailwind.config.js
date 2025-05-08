/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        shine: 'shine 1s',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeInDelayed: 'fadeInDelayed 1s ease-in-out',
        slideUp: 'slideUp 0.4s ease-out',
      },
      keyframes: {
        shine: {
          '100%': { left: '125%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInDelayed: {
          '0%': { opacity: '0' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
