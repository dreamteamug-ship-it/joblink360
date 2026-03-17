/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'titan-dark': '#070F1A',
        'titan-deep': '#020202',
        'titan-maroon': '#4A0404',
        'titan-gold': '#C9A84C',
        'titan-silver': '#B8B8B8',
        'titan-blue': '#1A2A44',
      },
      fontFamily: {
        'display': ['Cinzel', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'accent': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
