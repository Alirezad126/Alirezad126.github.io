import { ArrowUpRight } from 'lucide-react'
import portfolio from '../data/portfolio'
import useInView from '../hooks/useInView'

export default function Publications() {
  const { ref, isVisible } = useInView()

  if (!portfolio.publications || portfolio.publications.length === 0) {
    return null
  }

  return (
    <section
      id="publications"
      ref={ref}
      className={`section-shell reveal pt-8 pb-12 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      <p className="section-label">Publications</p>

      <h2 className="section-title mt-3 max-w-4xl">
        Selected research outputs and manuscripts.
      </h2>

      <div className="mt-12 grid gap-5">
        {portfolio.publications.map((publication) => {
          const hasUrl = publication.url && publication.url !== '#'

          const content = (
            <article className="group rounded-3xl border border-slate-400 bg-white/90 p-6 shadow-card backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-accent sm:p-7 dark:border-line dark:bg-white/[0.04]">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-accent sm:text-xs">
                    {publication.venue} · {publication.year}
                  </p>

                  <h3 className="mt-3 font-display text-xl font-bold leading-snug text-slate-950 sm:text-2xl dark:text-white">
                    {publication.title}
                  </h3>
                </div>

                {hasUrl && (
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-400 bg-white/80 text-slate-700 transition group-hover:border-accent group-hover:text-accent dark:border-line dark:bg-white/5 dark:text-muted">
                    <ArrowUpRight size={18} />
                  </span>
                )}
              </div>
            </article>
          )

          if (hasUrl) {
            return (
              <a
                key={`${publication.title}-${publication.year}`}
                href={publication.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open publication: ${publication.title}`}
                className="focus-ring block rounded-3xl"
              >
                {content}
              </a>
            )
          }

          return (
            <div key={`${publication.title}-${publication.year}`}>
              {content}
            </div>
          )
        })}
      </div>
    </section>
  )
}