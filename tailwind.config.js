/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0f',
        night: '#11111a',
        panel: '#15151f',
        line: 'rgba(255,255,255,0.10)',
        muted: '#a6adb7',
        accent: '#00ffb2',
        accentSoft: 'rgba(0,255,178,0.14)'
      },
      fontFamily: {
      display: ['Space Grotesk', 'sans-serif'],
      body: ['DM Sans', 'sans-serif'],
      mono: ['Space Mono', 'monospace']
      },
      boxShadow: {
        glow: '0 0 32px rgba(0,255,178,0.20)',
        card: '0 18px 60px rgba(0,0,0,0.35)'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(0,255,178,0)' },
          '50%': { boxShadow: '0 0 32px rgba(0,255,178,0.35)' }
        },
        cursorBlink: {
          '0%, 45%': { opacity: '1' },
          '46%, 100%': { opacity: '0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' }
        },
        meshMove: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(30px,-20px,0) scale(1.08)' }
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 700ms ease forwards',
        glowPulse: 'glowPulse 2.8s ease-in-out infinite',
        cursorBlink: 'cursorBlink 900ms step-end infinite',
        float: 'float 6s ease-in-out infinite',
        meshMove: 'meshMove 14s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
