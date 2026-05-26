import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import portfolio from '../data/portfolio'
import useInView from '../hooks/useInView'

export default function Experience() {
  const { ref, isVisible } = useInView()
  const [openIndex, setOpenIndex] = useState(
    portfolio.experience.length ? 0 : -1
  )

  return (
    <section
      id="experience"
      ref={ref}
      className={`section-shell reveal pt-8 pb-12 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      <p className="section-label">Experience</p>

      <h2 className="section-title mt-3 max-w-4xl">
        Research, machine learning, and data-driven engineering.
      </h2>

      <div className="relative mt-8 space-y-4 before:absolute before:left-4 before:top-2 before:h-full before:w-px before:bg-slate-400 md:before:left-6 dark:before:bg-line">
        {portfolio.experience.map((job, index) => {
          const isOpen = openIndex === index

          return (
            <div
              key={`${job.company}-${job.role}`}
              className="relative pl-11 md:pl-16"
            >
              <span className="absolute left-[9px] top-6 h-4 w-4 rounded-full border-2 border-accent bg-white shadow-glow md:left-[17px] dark:bg-ink" />

              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="focus-ring w-full rounded-3xl border border-slate-400 bg-white/90 p-4 text-left shadow-card backdrop-blur-md transition hover:-translate-y-1 hover:border-accent sm:p-5 dark:border-line dark:bg-white/[0.04]"
                aria-expanded={isOpen}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-accent sm:text-xs">
                      {job.period}
                    </p>

                    <h3 className="mt-1.5 font-display text-lg font-bold text-slate-950 sm:text-xl dark:text-white">
                      {job.role}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-slate-700 dark:text-muted">
                      {job.company}
                    </p>
                  </div>

                  <ChevronDown
                    className={`mt-2 shrink-0 text-accent transition ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    size={22}
                  />
                </div>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'grid-rows-[1fr] pt-4' : 'grid-rows-[0fr]'
                  }`}
                >
                  <ul className="min-h-0 space-y-2 overflow-hidden text-sm font-medium text-slate-700 dark:text-muted">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 leading-6">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}