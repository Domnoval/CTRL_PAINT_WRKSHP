/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mystical quantum color system
        eternal: {
          black: '#0f0f23',
          white: '#f8fafc',
        },
        quantum: {
          primary: '#6366f1',
          secondary: '#7c3aed',
          accent: '#06b6d4',
          destructive: '#ef4444',
          success: '#22c55e',
          warning: '#f59e0b',
        },
        mystic: {
          deep: '#1a1a2e',
          medium: '#16213e',
          light: '#0f3460',
        }
      },
      animation: {
        // Quantum waveform animations
        'quantum-pulse': 'quantum-pulse 2s ease-in-out infinite',
        'quantum-collapse': 'quantum-collapse 0.6s ease-in-out',
        'ethereal-fade': 'ethereal-fade 1.5s ease-in-out infinite',
        'glyph-awaken': 'glyph-awaken 0.8s ease-out',
      },
      keyframes: {
        'quantum-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scaleX(1)' },
          '50%': { opacity: '0.8', transform: 'scaleX(1.5)' },
        },
        'quantum-collapse': {
          '0%': { clipPath: 'circle(25%)', transform: 'rotate(0deg)' },
          '50%': { clipPath: 'circle(250%)', transform: 'rotate(180deg)' },
          '100%': { clipPath: 'circle(0%)', transform: 'rotate(360deg)' },
        },
        'ethereal-fade': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'glyph-awaken': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'ethereal': '0 25px 50px -12px rgba(255, 255, 255, 0.15)',
        'quantum': '0 0 20px rgba(255, 255, 255, 0.3)',
      },
      backdropBlur: {
        'sacred': '20px',
      }
    },
  },
  plugins: [],
}
