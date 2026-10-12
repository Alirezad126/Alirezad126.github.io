import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import portfolio from '../data/portfolio'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'News', to: '/news' },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'Publications', to: '/publications' },
  { label: 'Contact', to: '/contact' }
]

function linkClass({ isActive }) {
  return `text-[15px] font-medium transition-colors ${
    isActive ? 'text-accent' : 'text-muted hover:text-accent'
  }`
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur">
      <nav className="shell flex h-20 items-center justify-between gap-6">
        <Link
          to="/"
          className="focus-ring rounded text-base font-semibold tracking-tight text-heading transition-colors hover:text-accent"
        >
          {portfolio.name}
        </Link>

        <div className="hidden items-center gap-5 md:flex lg:gap-8">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-heading md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="shell grid gap-1 border-t border-line py-3 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-2 py-3 text-base font-medium ${
                  isActive ? 'text-accent' : 'text-muted hover:text-accent'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
