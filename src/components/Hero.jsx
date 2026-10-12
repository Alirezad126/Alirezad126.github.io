import {
  ArrowRight,
  Briefcase,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin
} from 'lucide-react'
import { Link } from 'react-router-dom'
import portfolio from '../data/portfolio'

// The hero greets with the first name only; the navbar carries the full one.
const firstName = portfolio.name.split(' ')[0]

const socials = [
  { label: 'GitHub', href: portfolio.contact.github, icon: Github },
  { label: 'LinkedIn', href: portfolio.contact.linkedin, icon: Linkedin },
  { label: 'Email', href: `mailto:${portfolio.contact.email}`, icon: Mail }
]

export default function Hero() {
  return (
    <section className="shell py-10 sm:py-14">
      <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-14">
        <img
          src={portfolio.avatar}
          alt={portfolio.name}
          width="180"
          height="180"
          fetchpriority="high"
          decoding="async"
          className="h-28 w-28 shrink-0 rounded-full border border-line object-cover sm:h-36 sm:w-36"
        />

        <div className="min-w-0">
          <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl">
            <span className="block text-heading">Hi, I&apos;m</span>
            <span className="name-gradient block">{firstName}</span>
          </h1>

          <p className="eyebrow mt-3 font-bold">{portfolio.role}</p>

          <p className="mt-4 max-w-2xl leading-7">{portfolio.bio}</p>

          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px]">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={16} className="text-accent" />
              {portfolio.contact.location}
            </span>

            <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />

            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Open to collaboration
            </span>
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/projects" className="btn-primary focus-ring">
              View Projects
              <ArrowRight size={18} />
            </Link>

            <Link to="/experience" className="btn-ghost focus-ring">
              <Briefcase size={18} />
              Experience
            </Link>

            <a href={portfolio.cvUrl} className="btn-ghost focus-ring">
              <Download size={18} />
              Download CV
            </a>

            <span className="mx-1 hidden h-7 w-px bg-line sm:block" aria-hidden="true" />

            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={label}
                className="focus-ring rounded-lg border border-line p-3 text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
