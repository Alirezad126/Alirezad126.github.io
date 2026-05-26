import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    const isDark = theme === 'dark'
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', theme)
  }, [theme])

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface/80 text-muted shadow-card backdrop-blur-md transition hover:-translate-y-0.5 hover:border-accent hover:text-accent dark:bg-white/5"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}