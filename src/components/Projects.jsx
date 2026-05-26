import { useMemo, useState } from 'react'

import portfolio from '../data/portfolio'
import useInView from '../hooks/useInView'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const { ref, isVisible } = useInView()
  const [activeTag, setActiveTag] = useState('All')

  const tags = useMemo(() => {
    const allTags = portfolio.projects.flatMap((project) => project.tags || [])
    return ['All', ...new Set(allTags)]
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeTag === 'All') return portfolio.projects

    return portfolio.projects.filter((project) =>
      project.tags?.includes(activeTag)
    )
  }, [activeTag])

  return (
    <section
      id="projects"
      ref={ref}
      className={`section-shell reveal !h-auto !min-h-0 pt-6 pb-16 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24 ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      <p className="section-label">Projects</p>

      <div className="mt-3 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <h2 className="section-title max-w-4xl">
          Selected machine learning and AI systems.
        </h2>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isActive = activeTag === tag

            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`focus-ring rounded-full border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide transition sm:px-4 sm:py-2 sm:text-xs ${
                  isActive
                    ? 'border-accent bg-accent text-slate-950 shadow-glow'
                    : 'border-slate-400 bg-white/60 text-slate-800 hover:border-accent hover:bg-accent/10 hover:text-accent dark:border-line dark:bg-white/5 dark:text-muted'
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-6 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            priority={index < 3}
          />
        ))}
      </div>
    </section>
  )
}