import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import portfolio from '../data/portfolio';

export default function ProjectDetail() {
  const { slug } = useParams();

  const project = portfolio.projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <main className="section-shell min-h-screen pt-32">
        <p className="section-label">Project Not Found</p>

        <h1 className="mt-4 font-display text-4xl font-bold text-white">
          This project does not exist.
        </h1>

        <Link
          to="/"
          className="focus-ring mt-8 inline-flex items-center gap-2 rounded-xl border border-line bg-white/5 px-5 py-3 font-bold text-white transition hover:border-accent hover:text-accent"
        >
          <ArrowLeft size={18} />
          Back Home
        </Link>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-[-20%] top-[15%] h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-20%] bottom-[10%] h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <Link
          to="/"
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-muted transition hover:border-accent hover:text-accent"
        >
          <ArrowLeft size={16} />
          Back Home
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            {project.status && (
              <span className="inline-flex rounded-full bg-accent px-3 py-1 font-mono text-xs font-bold uppercase text-ink">
                {project.status}
              </span>
            )}

            <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              {project.title}
            </h1>

            <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
              {project.longDescription || project.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.githubUrl && project.githubUrl !== '#' && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex items-center gap-2 rounded-xl border border-line bg-white/5 px-5 py-3 font-bold text-white transition hover:border-accent hover:text-accent"
                >
                  <Github size={18} />
                  GitHub
                </a>
              )}

              {project.demoUrl && project.demoUrl !== '#' && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-ink shadow-glow transition hover:-translate-y-1"
                >
                  Live Demo
                  <ArrowUpRight size={18} />
                </a>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-line bg-white/[0.04] shadow-card backdrop-blur-md">
            <img
              src={project.image}
              alt={project.title}
              className="h-full max-h-[460px] w-full object-cover"
            />
          </div>
        </div>

        {project.highlights?.length > 0 && (
          <section className="mt-14 rounded-3xl border border-line bg-white/[0.04] p-6 shadow-card backdrop-blur-md sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              Highlights
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {project.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-line bg-ink/40 p-5"
                >
                  <p className="leading-7 text-muted">{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}