import { ArrowUpRight, Github } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProjectCard({ project, priority = false }) {
  const projectPath = `/projects/${project.slug}`

  return (
    <article className="group flex h-full min-h-[500px] flex-col overflow-hidden rounded-3xl border border-slate-400 bg-white/90 shadow-card backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-accent dark:border-line dark:bg-white/[0.04]">
      <Link
        to={projectPath}
        className="block overflow-hidden"
        aria-label={`Open project details for ${project.title}`}
      >
        <div className="relative h-52 overflow-hidden border-b border-slate-300 bg-slate-100 dark:border-line dark:bg-white/[0.03]">
          <img
            src={project.image}
            alt={project.title}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {project.status && (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 font-mono text-xs font-bold uppercase text-slate-950 shadow-card">
              {project.status}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Link to={projectPath}>
          <h3 className="line-clamp-3 min-h-[78px] font-display text-lg font-bold leading-snug text-slate-950 transition group-hover:text-accent sm:text-xl dark:text-white">
            {project.title}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-4 min-h-[104px] text-sm font-medium leading-7 text-slate-700 dark:text-muted">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags?.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-emerald-800 dark:text-accent"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-5">
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="focus-ring rounded-full border border-slate-400 bg-white/80 p-2.5 text-slate-700 transition hover:border-accent hover:text-accent dark:border-line dark:bg-white/5 dark:text-muted"
            >
              <Github size={18} />
            </a>
          )}

          <Link
            to={projectPath}
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-slate-400 bg-white/80 px-4 py-2 text-sm font-bold text-slate-900 transition hover:border-accent hover:text-accent dark:border-line dark:bg-white/5 dark:text-white"
          >
            View Details
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  )
}