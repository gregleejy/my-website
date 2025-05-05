/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
      animation: {
        glow: 'glowEffect 3s ease-in-out infinite',
        'glow-move': 'glowMove 4s linear infinite',
      },
      keyframes: {
        glowEffect: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(0,255,255,0.6)' },
          '50%': { boxShadow: '0 0 16px rgba(0,255,255,1)' },
        },
        glowMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
