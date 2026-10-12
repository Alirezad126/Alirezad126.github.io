import portfolio from '../data/portfolio'

export default function Education({ inset = false }) {
  const education = portfolio.education ?? []

  if (education.length === 0) return null

  return (
    <section className={inset ? '' : 'section'}>
      <h2 className={inset ? 'section-title-sm' : 'section-title'}>Education</h2>

      <div className={`mt-6 grid gap-5 ${inset ? '' : 'md:grid-cols-2'}`}>
        {education.map((item) => (
          <article key={item.school} className="card p-6">
            <h3 className="text-lg font-semibold text-heading">{item.degree}</h3>

            <p className="mt-1.5">{item.school}</p>

            {item.note && <p className="mt-2 text-[15px] text-accent">{item.note}</p>}

            <p className="mt-3 font-mono text-[13px] text-muted">
              {item.period}
              {item.location ? ` · ${item.location}` : ''}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
