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
    className="relative overflow-hidden px-4 pt-24 pb-4 sm:px-6 sm:pb-24 lg:px-8 lg:pt-28 lg:pb-28"
  >
      <div className="pointer-events-none absolute left-[-30%] top-[8%] h-64 w-64 rounded-full bg-accent/10 blur-3xl sm:left-[5%] sm:h-80 sm:w-80 animate-meshMove" />
      <div className="pointer-events-none absolute bottom-[5%] right-[-30%] h-72 w-72 rounded-full bg-teal-400/10 blur-3xl sm:right-[0%] sm:h-96 sm:w-96 animate-meshMove" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            className="absolute h-1.5 w-1.5 rounded-full bg-accent/50 animate-float"
            style={{
              left: `${12 + index * 10}%`,
              top: `${20 + (index % 4) * 17}%`,
              animationDelay: `${index * 0.35}s`
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* Text content */}
        <div className="order-1 mx-auto w-full max-w-2xl animate-fadeInUp text-center lg:mx-0 lg:text-left">
          {/* Tagline */}
          <div className="mb-8 flex justify-center lg:mb-5 lg:justify-start">
            <div className="inline-flex max-w-[92vw] rounded-2xl border border-accent/40 bg-accent/10 px-4 py-2.5 font-mono text-[10px] font-bold leading-5 tracking-wide text-accent shadow-glow sm:rounded-full sm:text-xs">
              <span className="block text-center sm:whitespace-nowrap">
                AI/ML Engineer
                <span className="mx-2 text-accent/60">|</span>
                Data Scientist
              </span>
            </div>
          </div>


          <h1 className="font-display text-[clamp(2.75rem,12vw,5.4rem)] font-bold leading-[0.98] tracking-[-0.055em] text-white sm:text-[clamp(3.5rem,7vw,5.4rem)]">
            <span className="block">Hi, I'm</span>

            <span className="mt-2 block bg-gradient-to-r from-accent via-emerald-300 to-white bg-clip-text text-transparent sm:inline">
              {firstName}
            </span>

            <span className="block bg-gradient-to-r from-accent via-emerald-300 to-white bg-clip-text text-transparent sm:ml-4 sm:inline">
              {lastName}
            </span>
          </h1>

           {/* Mobile avatar */}
          <div className="mt-10 mb-10 flex justify-center lg:hidden">
            <AvatarBlock />
          </div>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg lg:mx-0">
            {portfolio.bio}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mx-auto sm:max-w-md sm:flex-row lg:mx-0 lg:max-w-none">
            <a
              href="#projects"
              className="focus-ring group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-ink shadow-glow transition hover:-translate-y-1 hover:shadow-xl sm:text-base"
            >
              View Projects
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </a>

            <a
              href={portfolio.cvUrl}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:border-accent hover:text-accent sm:text-base"
            >
              <Download size={18} />
              Download CV
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={label}
                className="focus-ring rounded-full border border-line bg-white/5 p-3 text-muted transition hover:-translate-y-1 hover:border-accent hover:text-accent"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Desktop visual content */}
        <div className="order-2 hidden w-full animate-fadeInUp flex-col items-center [animation-delay:180ms] lg:flex lg:max-w-[430px]">
          <AvatarBlock />

          <div className="mt-10 w-full rounded-3xl border border-line bg-white/[0.04] p-6 text-left shadow-card backdrop-blur-md">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              About Me
            </p>

            <p className="mt-3 text-base leading-7 text-muted">
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
    <div className="relative w-full max-w-[250px] sm:max-w-[310px] lg:max-w-[380px]">
      <div className="absolute -inset-5 rounded-full border border-accent/20 animate-glowPulse sm:-inset-7" />
      <div className="absolute -inset-1 rounded-full border border-accent/35" />
      <div className="absolute inset-10 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative rounded-full border border-accent/40 bg-white/[0.04] p-3 shadow-glow backdrop-blur-xl sm:p-4">
        <img
          src={portfolio.avatar}
          alt={`${portfolio.name} avatar`}
          className="aspect-square w-full rounded-full object-cover"
        />
      </div>

      <div className="absolute bottom-5 right-0 rounded-full border border-accent/30 bg-ink/95 px-3 py-1.5 font-mono text-[10px] text-white shadow-card sm:bottom-8 sm:px-4 sm:py-2 sm:text-xs">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent" />
        Available
      </div>
    </div>
  )
}