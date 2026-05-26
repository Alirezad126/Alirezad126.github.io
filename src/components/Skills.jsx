import portfolio from '../data/portfolio';
import useInView from '../hooks/useInView';

export default function Skills() {
  const { ref, isVisible } = useInView();

  return (
    <section id="skills" ref={ref} className={`section-shell reveal py-24 ${isVisible ? 'is-visible' : ''}`}>
      <p className="section-label">Skills</p>
      <h2 className="section-title">A stack built for applied research and production ML.</h2>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {portfolio.skills.map((group, groupIndex) => (
          <div key={group.category} className="glass-card rounded-3xl p-6">
            <h3 className="font-display text-2xl font-bold text-white">{group.category}</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {group.items.map((skill, index) => (
                <span
                  key={skill}
                  className="relative overflow-hidden rounded-full border border-line bg-white/[0.04] px-4 py-2 font-mono text-xs text-white"
                >
                  <span
                    className="absolute inset-y-0 left-0 bg-accent/10 transition-all duration-700"
                    style={{ width: isVisible ? `${58 + ((index + groupIndex) % 5) * 8}%` : '0%' }}
                  />
                  <span className="relative">{skill}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
