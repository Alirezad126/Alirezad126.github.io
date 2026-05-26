import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import portfolio from '../data/portfolio';

const links = ['About', 'Projects', 'Skills', 'Experience', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line bg-ink/75 shadow-card backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="section-shell flex h-20 items-center justify-between" aria-label="Main navigation">

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="focus-ring rounded-md font-mono text-md uppercase tracking-[0.22em] text-muted transition hover:text-accent"
            >
              {link}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="focus-ring inline-flex rounded-xl border border-line bg-white/5 p-2 text-white md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        className={`overflow-hidden border-line bg-ink/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? 'max-h-96 border-y' : 'max-h-0 border-y-0'
        }`}
      >
        <div className="section-shell flex flex-col py-4">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={closeMenu}
              className="focus-ring rounded-lg px-2 py-4 font-mono text-sm uppercase tracking-[0.22em] text-muted hover:bg-white/5 hover:text-accent"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
