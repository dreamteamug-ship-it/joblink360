/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'titan-maroon': '#8B0000',
        'titan-blue': '#1a365d',
        'titan-gold': '#D4AF37',
        'titan-gold-light': '#E8C84A',
        'titan-dark': '#0a0a0f',
        'titan-deep': '#12121a',
        'titan-cream': '#f5f0e8',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
