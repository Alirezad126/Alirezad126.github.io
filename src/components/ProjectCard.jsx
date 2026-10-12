import { ArrowRight, Github } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProjectCard({ project, priority = false }) {
  const detailPath = project.detail ? `/projects/${project.slug}` : null
  const hasCode = project.githubUrl && project.githubUrl !== '#'

  // Diagrams are letterboxed on white; photos and screenshots fill the frame.
  const isContain = project.imageFit === 'contain'

  const Thumb = project.image ? (
    <img
      src={project.image}
      alt=""
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={`aspect-[16/9] w-full border-b border-line ${
        isContain ? 'bg-white object-contain p-3' : 'object-cover'
      }`}
    />
  ) : (
    <div className="flex aspect-[16/9] w-full items-center justify-center border-b border-line bg-accent/5 px-6">
      <p className="text-center font-mono text-[13px] uppercase tracking-[0.2em] text-accent">
        {project.tags?.[0]}
      </p>
    </div>
  )

  return (
    <article className="card group flex flex-col overflow-hidden hover:border-accent">
      {detailPath ? (
        <Link to={detailPath} tabIndex={-1} aria-hidden="true" className="block">
          {Thumb}
        </Link>
      ) : (
        Thumb
      )}

      <div className="flex flex-1 flex-col p-6">
        {project.status && (
          <span className="self-start rounded-md bg-accent/10 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-accent">
            {project.status}
          </span>
        )}

        <h3 className="mt-3 text-lg font-semibold leading-snug text-heading group-hover:text-accent">
          {detailPath ? (
            <Link to={detailPath} className="focus-ring rounded">
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>

        <p className="mt-2.5 leading-7">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags?.slice(0, 4).map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>

        {(detailPath || hasCode) && (
          <div className="mt-auto flex items-center gap-5 border-t border-line pt-5">
            {detailPath && (
              <Link
                to={detailPath}
                className="focus-ring inline-flex items-center gap-1.5 rounded font-semibold text-accent hover:gap-2.5"
              >
                Details
                <ArrowRight size={16} />
              </Link>
            )}

            {hasCode && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex items-center gap-1.5 rounded font-medium text-muted hover:text-accent"
              >
                <Github size={16} />
                Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
