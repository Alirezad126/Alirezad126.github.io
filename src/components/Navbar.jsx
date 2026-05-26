import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import portfolio from '../data/portfolio'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' }
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    setIsOpen(false)
  }

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full border-b transition ${
        isScrolled
          ? 'border-white/10 bg-slate-950/95 shadow-card backdrop-blur-xl dark:bg-ink/90'
          : 'border-white/10 bg-slate-950/90 backdrop-blur-xl dark:bg-ink/70'
      }`}
    >
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#about"
          onClick={handleClick}
          className="font-mono text-sm font-bold tracking-wide text-white transition hover:text-accent"
        >
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-slate-300 transition hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white shadow-card backdrop-blur-md transition hover:border-accent hover:text-accent md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="mx-auto w-full max-w-7xl px-4 pb-4 sm:px-6 md:hidden">
          <div className="rounded-2xl border border-white/10 bg-slate-950/95 p-4 shadow-card backdrop-blur-xl">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleClick}
                  className="rounded-xl px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-slate-300 transition hover:bg-accent/10 hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}