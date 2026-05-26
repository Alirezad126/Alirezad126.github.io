import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import portfolio from '../data/portfolio';
import useInView from '../hooks/useInView';

export default function Experience() {
  const { ref, isVisible } = useInView();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="experience" ref={ref} className={`section-shell reveal py-24 ${isVisible ? 'is-visible' : ''}`}>
      <p className="section-label">Experience</p>
      <h2 className="section-title">From research prototypes to deployed ML systems.</h2>

      <div className="relative mt-12 space-y-6 before:absolute before:left-4 before:top-2 before:h-full before:w-px before:bg-line md:before:left-6">
        {portfolio.experience.map((job, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={`${job.company}-${job.role}`} className="relative pl-12 md:pl-16">
              <span className="absolute left-[9px] top-7 h-4 w-4 rounded-full border-2 border-accent bg-ink shadow-glow md:left-[17px]" />
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="focus-ring glass-card w-full rounded-3xl p-6 text-left transition hover:border-accent/70"
                aria-expanded={isOpen}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">{job.period}</p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-white">{job.role}</h3>
                    <p className="mt-1 text-muted">{job.company}</p>
                  </div>
                  <ChevronDown className={`mt-2 shrink-0 text-accent transition ${isOpen ? 'rotate-180' : ''}`} />
                </div>

                <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] pt-5' : 'grid-rows-[0fr]'}`}>
                  <ul className="min-h-0 overflow-hidden space-y-3 text-muted">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 leading-7">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
