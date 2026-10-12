import portfolio from '../data/portfolio'

export default function Experience({ inset = false }) {
  return (
    <section className={inset ? '' : 'section'}>
      <p className="eyebrow">Experience</p>
      <h2 className={inset ? 'h3' : 'h2'}>Work history.</h2>

      <div className="mt-6 grid items-start gap-5">
        {portfolio.experience.map((job) => (
          <article key={`${job.company}-${job.period}`} className="card p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
              <h3 className="text-[17px] font-semibold leading-snug text-heading">
                {job.role}
                <span className="font-normal text-muted"> · {job.company}</span>
              </h3>

              <p className="shrink-0 font-mono text-[13px] text-muted">{job.period}</p>
            </div>

            {job.location && (
              <p className="mt-1 text-[15px] text-muted">{job.location}</p>
            )}

            <ul className="mt-4 grid gap-2 text-[15px] leading-7">
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
