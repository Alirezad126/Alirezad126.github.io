import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { Link } from 'react-router-dom'

/** Shared chrome for every project write-up: back link, title block, tags, links. */
export default function ProjectLayout({
  eyebrow,
  title,
  summary,
  tags = [],
  links = [],
  figure,
  children
}) {
  return (
    <main className="shell py-12 sm:py-16">
      <Link
        to="/projects"
        className="focus-ring inline-flex items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </Link>

      <header className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="eyebrow">{eyebrow}</p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            {title}
          </h1>

          <p className="mt-5 leading-7 sm:text-lg sm:leading-8">{summary}</p>

          {tags.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost focus-ring"
                >
                  {link.kind === 'github' ? (
                    <Github size={18} />
                  ) : (
                    <ExternalLink size={18} />
                  )}
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {figure && (
          <figure className="overflow-hidden rounded-xl border border-line bg-card">
            <img
              src={figure.src}
              alt={figure.alt}
              loading="eager"
              decoding="async"
              className={`w-full ${
                figure.contain ? 'bg-white object-contain p-4' : 'object-cover'
              }`}
            />

            {figure.caption && (
              <figcaption className="border-t border-line px-5 py-3 text-sm text-muted">
                {figure.caption}
              </figcaption>
            )}
          </figure>
        )}
      </header>

      <article className="mt-16 grid gap-14">{children}</article>
    </main>
  )
}

/** A titled section within a write-up. */
export function Section({ eyebrow, title, children }) {
  return (
    <section>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}

      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-heading">
        {title}
      </h2>

      <div className="mt-5 grid gap-5 leading-8">{children}</div>
    </section>
  )
}

/** Three-up summary cards used at the top of a write-up. */
export function InfoGrid({ items }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="card p-6">
          <p className="eyebrow">{item.title}</p>
          <p className="mt-3 leading-7">{item.text}</p>
        </div>
      ))}
    </div>
  )
}

/**
 * A labelled figure with an optional caption. Set `zoomable` on dense figures
 * so the reader can open the full-resolution original in a new tab.
 */
export function Figure({ src, alt, caption, contain = false, zoomable = false, zoomHref }) {
  const fullSrc = zoomHref ?? src
  const image = (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`w-full ${contain ? 'bg-white object-contain p-4' : 'object-cover'}`}
    />
  )

  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-card">
      {zoomable ? (
        <a
          href={fullSrc}
          target="_blank"
          rel="noreferrer"
          className="focus-ring block"
          aria-label={`Open the full-size figure: ${alt}`}
        >
          {image}
        </a>
      ) : (
        image
      )}

      {caption && (
        <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-line px-5 py-3 text-sm text-muted">
          <span>{caption}</span>

          {zoomable && (
            <a
              href={fullSrc}
              target="_blank"
              rel="noreferrer"
              className="focus-ring shrink-0 rounded font-medium text-accent hover:underline"
            >
              Open full size
            </a>
          )}
        </figcaption>
      )}
    </figure>
  )
}
