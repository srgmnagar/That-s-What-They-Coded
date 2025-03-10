/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Orbitron': ['Orbitron', 'mono'],
        'Sora': ['Sora', 'sans-serif'],
        'Exo': ['Exo', 'sans-serif']
      },
    },
  },
  plugins: [],
}

