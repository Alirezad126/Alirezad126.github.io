import { ArrowRight, Zap } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import portfolio from '../data/portfolio'
import ProjectCard from './ProjectCard'

const LIVE_FILTER = 'Live demos'

export default function Projects({
  limit,
  heading = 'Projects',
  showFilters = true,
  showMore = false
}) {
  // The hero links here with #live so "Try live projects" lands on the
  // demos rather than the full grid.
  const { hash } = useLocation()
  const [activeTag, setActiveTag] = useState(hash === '#live' ? LIVE_FILTER : 'All')

  const tags = useMemo(() => {
    const counts = new Map()

    for (const project of portfolio.projects) {
      for (const tag of project.tags ?? []) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1)
      }
    }

    // Only offer filters that match more than one project.
    const useful = [...counts.entries()]
      .filter(([, count]) => count > 1)
      .map(([tag]) => tag)

    const hasLive = portfolio.projects.some((project) => project.live)

    return ['All', ...(hasLive ? [LIVE_FILTER] : []), ...useful]
  }, [])

  const filtered = useMemo(() => {
    let all = portfolio.projects
    if (activeTag === LIVE_FILTER) {
      all = all.filter((project) => project.live)
    } else if (activeTag !== 'All') {
      all = all.filter((project) => project.tags?.includes(activeTag))
    }

    return limit ? all.slice(0, limit) : all
  }, [activeTag, limit])

  return (
    <section className="section">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <h2 className="section-title">{heading}</h2>

        {showFilters && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                aria-pressed={activeTag === tag}
                className={`focus-ring rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeTag === tag
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-line text-muted hover:border-accent hover:text-accent'
                }`}
              >
                {tag === LIVE_FILTER && <Zap size={13} className="mr-1.5 inline align-[-1px]" />}
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project, index) => (
          <ProjectCard key={project.slug} project={project} priority={index < 2} />
        ))}
      </div>

      {showMore && (
        <Link
          to="/projects"
          className="focus-ring mt-8 inline-flex items-center gap-2 rounded font-semibold text-accent hover:gap-3"
        >
          All projects
          <ArrowRight size={17} />
        </Link>
      )}
    </section>
  )
}
