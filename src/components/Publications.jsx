import portfolio from '../data/portfolio';
import useInView from '../hooks/useInView';

export default function Publications() {
  const { ref, isVisible } = useInView();

  if (!portfolio.publications.length) return null;

  return (
    <section id="publications" ref={ref} className={`section-shell reveal py-24 ${isVisible ? 'is-visible' : ''}`}>
      <p className="section-label">Publications</p>
      <h2 className="section-title">Peer-reviewed work and technical writing.</h2>

      <div className="mt-12 grid gap-4">
        {portfolio.publications.map((paper) => (
          <a
            key={paper.title}
            href={paper.url}
            target="_blank"
            rel="noreferrer"
            className="focus-ring glass-card rounded-3xl p-6 transition hover:-translate-y-1 hover:border-accent/70"
          >
            <h3 className="font-display text-2xl font-bold text-white">{paper.title}</h3>
            <p className="mt-2 font-mono text-sm text-muted">
              {paper.venue} <span className="text-accent">/</span> {paper.year}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
