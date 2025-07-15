/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
          },
          '100%': {
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)',
          },
        },
      },
      colors: {
        dark: {
          primary: '#1f1c2c',
          secondary: '#928DAB',
          accent: '#8B5CF6',
          surface: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
  plugins: [],
}

