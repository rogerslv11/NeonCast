/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        card: '#111111',
        'card-hover': '#1a1a1a',
        accent: '#ff00aa',
        'accent-dim': 'rgba(255, 0, 170, 0.15)',
        'accent-glow': 'rgba(255, 0, 170, 0.4)',
        border: '#1e1e1e',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0a0',
        'text-muted': '#666666',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': { textShadow: '0 0 8px rgba(255, 0, 170, 0.6), 0 0 20px rgba(255, 0, 170, 0.3)' },
          '50%': { textShadow: '0 0 12px rgba(255, 0, 170, 0.8), 0 0 30px rgba(255, 0, 170, 0.5)' },
        },
        'glow-box': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(255, 0, 170, 0.3), 0 0 20px rgba(255, 0, 170, 0.1)' },
          '50%': { boxShadow: '0 0 12px rgba(255, 0, 170, 0.5), 0 0 30px rgba(255, 0, 170, 0.2)' },
        },
      },
      animation: {
        'neon-pulse': 'neon-pulse 3s ease-in-out infinite',
        'glow-box': 'glow-box 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
