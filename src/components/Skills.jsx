import portfolio from '../data/portfolio'
import useInView from '../hooks/useInView'

export default function Skills() {
  const { ref, isVisible } = useInView()

  return (
    <section
      id="skills"
      ref={ref}
      className={`section-shell reveal !h-auto !min-h-0 pt-8 pb-2 sm:pt-10 sm:pb-4 lg:pt-12 lg:pb-6 ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      <p className="section-label">Skills</p>

      <h2 className="section-title mt-3 max-w-4xl">
        A stack built for applied research and production ML.
      </h2>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {portfolio.skills.map((group) => (
          <article
            key={group.category}
            className="group rounded-3xl border border-slate-400 bg-white/90 p-5 shadow-card backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-accent dark:border-line dark:bg-white/[0.04]"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-xl font-bold text-slate-950 sm:text-2xl dark:text-white">
                {group.category}
              </h3>

              <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-glow" />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide text-emerald-800 transition group-hover:border-accent/60 dark:text-accent"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}