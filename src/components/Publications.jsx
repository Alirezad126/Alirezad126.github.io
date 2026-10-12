import { ArrowUpRight } from 'lucide-react'
import portfolio from '../data/portfolio'

export default function Publications() {
  const publications = portfolio.publications ?? []

  if (publications.length === 0) return null

  return (
    <section className="section">
      <p className="eyebrow">Publications</p>
      <h2 className="h2">Peer-reviewed work and preprints.</h2>

      <ul className="mt-10 grid gap-4">
        {publications.map((publication) => {
          const hasUrl = publication.url && publication.url !== '#'
          const Wrapper = hasUrl ? 'a' : 'div'

          return (
            <li key={publication.title}>
              <Wrapper
                {...(hasUrl
                  ? { href: publication.url, target: '_blank', rel: 'noreferrer' }
                  : {})}
                className={`card group flex items-start justify-between gap-5 p-6 ${
                  hasUrl ? 'focus-ring hover:border-accent' : ''
                }`}
              >
                <div>
                  <h3 className="text-lg font-semibold leading-snug text-heading group-hover:text-accent">
                    {publication.title}
                  </h3>

                  {publication.authors && (
                    <p className="mt-2 text-[15px] leading-6">{publication.authors}</p>
                  )}

                  <p className="mt-2 font-mono text-[13px] text-muted">
                    {publication.venue} · {publication.year}
                  </p>
                </div>

                {hasUrl && (
                  <ArrowUpRight size={20} className="mt-1 shrink-0 text-accent" />
                )}
              </Wrapper>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
