import { ExternalLink, Github } from 'lucide-react';

export default function ProjectCard({ project, large = false }) {
  return (
    <article
      className={`group glass-card overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-2 hover:border-accent/70 hover:shadow-glow ${
        large ? 'md:col-span-2' : ''
      }`}
    >
      <div className="overflow-hidden border-b border-line">
        <img
          src={project.image}
          alt=""
          className={`w-full object-cover transition duration-500 group-hover:scale-105 ${large ? 'h-72' : 'h-52'}`}
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl font-bold text-white">{project.title}</h3>
          <div className="flex shrink-0 gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className="focus-ring rounded-lg border border-line p-2 text-muted transition hover:border-accent hover:text-accent"
              >
                <Github size={18} />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
                className="focus-ring rounded-lg border border-line p-2 text-muted transition hover:border-accent hover:text-accent"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
        <p className="mt-4 leading-7 text-muted">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-accent/20 bg-accentSoft px-3 py-1 font-mono text-xs text-accent">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
