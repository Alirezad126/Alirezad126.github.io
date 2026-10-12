import portfolio from '../data/portfolio'

export default function Experience() {
  return (
    <section className="section">
      <p className="eyebrow">Experience</p>
      <h2 className="h2">Research, optimization, and data engineering.</h2>

      <div className="mt-10 grid gap-5">
        {portfolio.experience.map((job) => (
          <article key={`${job.company}-${job.period}`} className="card p-6 sm:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
              <h3 className="text-lg font-semibold text-heading">
                {job.role}
                <span className="font-normal text-muted"> · {job.company}</span>
              </h3>

              <p className="font-mono text-[13px] text-muted">{job.period}</p>
            </div>

            {job.location && (
              <p className="mt-1 text-[15px] text-muted">{job.location}</p>
            )}

            <ul className="mt-4 grid gap-2.5 leading-7">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="mt-[13px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
