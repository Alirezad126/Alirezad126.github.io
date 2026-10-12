import { ArrowRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import portfolio from '../data/portfolio'
import ProjectCard from './ProjectCard'

export default function Projects({
  limit,
  heading = 'Selected work.',
  showFilters = true,
  showMore = false
}) {
  const [activeTag, setActiveTag] = useState('All')

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

    return ['All', ...useful]
  }, [])

  const filtered = useMemo(() => {
    const all =
      activeTag === 'All'
        ? portfolio.projects
        : portfolio.projects.filter((project) => project.tags?.includes(activeTag))

    return limit ? all.slice(0, limit) : all
  }, [activeTag, limit])

  return (
    <section className="section">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow">Projects</p>
          <h2 className="h2">{heading}</h2>
        </div>

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
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
