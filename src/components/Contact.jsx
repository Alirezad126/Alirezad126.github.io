import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import portfolio from '../data/portfolio'

const links = [
  {
    label: 'Email',
    value: portfolio.contact.email,
    href: `mailto:${portfolio.contact.email}`,
    icon: Mail
  },
  {
    label: 'GitHub',
    value: '@Alirezad126',
    href: portfolio.contact.github,
    icon: Github
  },
  {
    label: 'LinkedIn',
    value: 'Connect on LinkedIn',
    href: portfolio.contact.linkedin,
    icon: Linkedin
  }
]

export default function Contact() {
  return (
    <section className="section">
      <p className="eyebrow">Contact</p>
      <h2 className="h2">Let&apos;s talk.</h2>

      <p className="mt-5 max-w-2xl leading-7 sm:text-lg sm:leading-8">
        Open to optimization and controls engineering, applied research, and
        collaboration on constrained learning and control. Email is the fastest
        way to reach me.
      </p>

      <p className="mt-4 inline-flex items-center gap-2 text-[15px]">
        <MapPin size={16} className="text-accent" />
        {portfolio.contact.location}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map(({ label, value, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
            className="card focus-ring flex items-center gap-4 p-5 hover:border-accent"
          >
            <Icon size={20} className="shrink-0 text-accent" />

            <div className="min-w-0">
              <p className="text-[13px] text-muted">{label}</p>
              <p className="truncate font-medium text-heading">{value}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
