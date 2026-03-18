import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'titan': {
          'dark': '#070F1A',
          'deeper': '#040810',
          'deep': '#020202',
          'maroon': '#4A0404',
          'gold': '#C9A84C',
          'gold-light': '#E5C76B',
          'silver': '#B8B8B8',
          'blue': '#1A2A44',
          'cream': '#F5F5DC',
        }
      },
      fontFamily: {
        'display': ['Cinzel', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'accent': ['Montserrat', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(201, 168, 76, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(201, 168, 76, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
