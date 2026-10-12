import portfolio from '../data/portfolio'

export default function Skills() {
  return (
    <section className="section">
      <p className="eyebrow">Skills</p>
      <h2 className="h2">Tools I reach for.</h2>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {portfolio.skills.map((group) => (
          <article key={group.category} className="card p-6">
            <h3 className="font-semibold text-heading">{group.category}</h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span key={skill} className="chip">
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
