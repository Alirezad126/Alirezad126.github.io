import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react'
import portfolio from '../data/portfolio'

const socials = [
  { label: 'GitHub', href: portfolio.contact.github, icon: Github },
  { label: 'LinkedIn', href: portfolio.contact.linkedin, icon: Linkedin },
  { label: 'Email', href: `mailto:${portfolio.contact.email}`, icon: Mail }
]

const [firstName, ...restName] = portfolio.name.split(' ')
const lastName = restName.join(' ')

export default function Hero() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-4 pt-24 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pt-28 lg:pb-20"
    >
      <div className="pointer-events-none absolute left-[-30%] top-[8%] h-56 w-56 rounded-full bg-accent/15 blur-3xl sm:left-[5%] sm:h-72 sm:w-72 animate-meshMove" />
      <div className="pointer-events-none absolute bottom-[5%] right-[-30%] h-64 w-64 rounded-full bg-accent/10 blur-3xl sm:right-[0%] sm:h-80 sm:w-80 animate-meshMove" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, index) => (
          <span
            key={index}
            className="absolute h-1.5 w-1.5 rounded-full bg-accent/70 animate-float"
            style={{
              left: `${14 + index * 13}%`,
              top: `${22 + (index % 3) * 18}%`,
              animationDelay: `${index * 0.35}s`
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="order-1 mx-auto w-full max-w-2xl animate-fadeInUp text-center lg:mx-0 lg:text-left">
          <div className="mb-5 flex justify-center lg:justify-start">
            <div className="inline-flex max-w-[92vw] rounded-2xl border border-accent/60 bg-accent/10 px-4 py-2 font-mono text-[10px] font-bold leading-5 tracking-wide text-accent shadow-glow sm:rounded-full sm:text-xs">
              <span className="block text-center sm:whitespace-nowrap">
                AI/ML Engineer
                <span className="mx-2 text-accent/80">|</span>
                Data Scientist
              </span>
            </div>
          </div>

          <h1 className="font-display text-[clamp(2.45rem,11vw,5.1rem)] font-bold leading-[0.98] tracking-[-0.055em] text-slate-900 sm:text-[clamp(3.3rem,7vw,5.1rem)] dark:text-white">
            <span className="block">Hi, I'm</span>

            <span className="mt-2 block bg-gradient-to-r from-accent via-emerald-700 to-slate-950 bg-clip-text text-transparent sm:inline dark:via-emerald-300 dark:to-white">
              {firstName}
            </span>
          </h1>

          <div className="mt-7 mb-7 flex justify-center lg:hidden">
            <AvatarBlock />
          </div>

          <p className="mx-auto mt-5 max-w-xl text-sm font-semibold leading-7 text-slate-700 sm:text-base sm:leading-8 lg:mx-0 dark:font-medium dark:text-muted">
            {portfolio.bio}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mx-auto sm:max-w-md sm:flex-row lg:mx-0 lg:max-w-none">
            <a
              href="#projects"
              className="focus-ring group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-slate-950 shadow-glow transition hover:-translate-y-1 hover:shadow-xl sm:px-6 sm:py-3 sm:text-base"
            >
              View Projects
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </a>

            <a
              href={portfolio.cvUrl}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/90 px-5 py-2.5 text-sm font-bold text-slate-900 shadow-card transition hover:-translate-y-1 hover:border-accent hover:text-accent sm:px-6 sm:py-3 sm:text-base dark:border-line dark:bg-white/5 dark:text-white"
            >
              <Download size={18} />
              Download CV
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={label}
                className="focus-ring rounded-full border border-slate-300 bg-white/90 p-2.5 text-slate-700 shadow-card transition hover:-translate-y-1 hover:border-accent hover:text-accent dark:border-line dark:bg-white/5 dark:text-muted sm:p-3"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div className="order-2 hidden w-full animate-fadeInUp flex-col items-center [animation-delay:180ms] lg:flex lg:max-w-[390px]">
          <AvatarBlock />

          <div className="mt-8 w-full rounded-3xl border border-slate-300 bg-white/95 p-5 text-left shadow-card backdrop-blur-md dark:border-line dark:bg-white/[0.04]">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              About Me
            </p>

            <p className="mt-3 text-sm font-semibold leading-7 text-slate-700 dark:font-medium dark:text-muted">
              I build machine learning systems, data-driven products, and research-grade tools
              with a focus on practical deployment and clean engineering.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function AvatarBlock() {
  return (
    <div className="relative w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[350px]">
      <div className="absolute -inset-4 rounded-full border border-accent/30 animate-glowPulse sm:-inset-6" />
      <div className="absolute -inset-1 rounded-full border border-accent/50" />
      <div className="absolute inset-8 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative rounded-full border border-accent/50 bg-white/95 p-3 shadow-glow backdrop-blur-xl sm:p-4 dark:bg-white/[0.04]">
        <img
          src={portfolio.avatar}
          alt={`${portfolio.name} avatar`}
          className="aspect-square w-full rounded-full object-cover"
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="absolute bottom-4 right-0 rounded-full border border-accent/30 bg-slate-950 px-3 py-1.5 font-mono text-[10px] text-white shadow-card sm:bottom-7 sm:px-4 sm:py-2 sm:text-xs dark:bg-ink/95">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent" />
        Available
      </div>
    </div>
  )
}
