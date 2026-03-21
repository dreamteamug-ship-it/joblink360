/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'maasai-red': '#E03A3A',
        'savanna-gold': '#D4AF37',
        'midnight-blue': '#1A2A3A',
        'night-black': '#0A0A0A',
      },
    },
  },
  plugins: [],
}