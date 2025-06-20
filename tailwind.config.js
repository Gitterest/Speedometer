/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/styles/tailwind.custom.css'
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00ffff',
          magenta: '#ff00ff',
          lime: '#39ff14',
        },
      },
      fontFamily: {
        digital: ['"Orbitron"', 'monospace'],
      },
    },
  },
  plugins: [],
}
