/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vw: {
          blue: '#001e50',
          light: '#f5f5f5',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
