import portfolio from '../data/portfolio';
import useInView from '../hooks/useInView';

export default function About() {
  const { ref, isVisible } = useInView();
  const projectCount = portfolio.projects.length;
  const paperCount = portfolio.publications.length;

  const stats = [
    { value: `${portfolio.stats.yearsExperience}+`, label: 'Years Experience' },
    { value: projectCount, label: 'Projects' },
    { value: paperCount, label: 'Papers' }
  ];

  return (
    <section id="about" ref={ref} className={`section-shell reveal py-24 ${isVisible ? 'is-visible' : ''}`}>
      <p className="section-label">About</p>
      <h2 className="section-title">Research-minded engineering for useful AI systems.</h2>

      <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="glass-card relative overflow-hidden rounded-3xl p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
          <img
            src={portfolio.avatar}
            alt={`${portfolio.name} portrait`}
            className="relative aspect-square w-full rounded-3xl border border-accent/30 object-cover shadow-glow"
          />
        </div>

        <div className="glass-card rounded-3xl p-7 sm:p-10">
          <p className="text-lg leading-8 text-muted">{portfolio.bio}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-line bg-white/[0.04] p-5">
                <div className="font-display text-4xl font-bold text-accent">{stat.value}</div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
