/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        surfaceSoft: 'rgb(var(--color-surface-soft) / <alpha-value>)',
        heading: 'rgb(var(--color-heading) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        accentSoft: 'rgb(var(--color-accent) / 0.1)'
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace']
      },
      boxShadow: {
        glow: '0 0 35px rgb(var(--color-accent) / 0.25)',
        card: '0 24px 80px rgb(15 23 42 / 0.18)'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' }
        },
        meshMove: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(24px, -18px)' }
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease forwards',
        glowPulse: 'glowPulse 3s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite',
        meshMove: 'meshMove 12s ease-in-out infinite'
      }
    }
  },
  plugins: []
}