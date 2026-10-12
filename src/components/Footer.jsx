import { Github, Linkedin, Mail } from 'lucide-react'
import portfolio from '../data/portfolio'

const socials = [
  { label: 'GitHub', href: portfolio.contact.github, icon: Github },
  { label: 'LinkedIn', href: portfolio.contact.linkedin, icon: Linkedin },
  { label: 'Email', href: `mailto:${portfolio.contact.email}`, icon: Mail }
]

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-line">
      <div className="shell flex flex-col items-center justify-between gap-4 py-10 text-[15px] text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {portfolio.fullName ?? portfolio.name}
        </p>

        <div className="flex items-center gap-2">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              aria-label={label}
              className="focus-ring rounded-lg border border-line p-2.5 transition-colors hover:border-accent hover:text-accent"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
