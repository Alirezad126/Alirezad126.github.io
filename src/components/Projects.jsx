import { useMemo, useState } from 'react';
import portfolio from '../data/portfolio';
import useInView from '../hooks/useInView';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const { ref, isVisible } = useInView();
  const [activeTag, setActiveTag] = useState('All');

  const tags = useMemo(() => {
    const unique = new Set(portfolio.projects.flatMap((project) => project.tags));
    return ['All', ...Array.from(unique)];
  }, []);

  const filteredProjects = activeTag === 'All'
    ? portfolio.projects
    : portfolio.projects.filter((project) => project.tags.includes(activeTag));

  const featured = filteredProjects.filter((project) => project.featured);
  const regular = filteredProjects.filter((project) => !project.featured);

  return (
    <section id="projects" ref={ref} className={`section-shell reveal py-24 ${isVisible ? 'is-visible' : ''}`}>
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="section-label">Projects</p>
          <h2 className="section-title">Selected systems, models, and research tools.</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`focus-ring rounded-full border px-4 py-2 font-mono text-xs transition ${
                activeTag === tag
                  ? 'border-accent bg-accent text-ink'
                  : 'border-line bg-white/5 text-muted hover:border-accent hover:text-accent'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.title} project={project} large />
        ))}
        {regular.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
