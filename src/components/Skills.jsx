import portfolio from '../data/portfolio'
import techIcons from '../data/techIcons'

/** Brand mark where one exists, otherwise a monogram from the tool's name. */
function TechMark({ name }) {
  const path = techIcons[name]

  if (path) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] shrink-0 fill-current"
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    )
  }

  const monogram = name
    .replace(/[^A-Za-z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  return (
    <span
      className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded border border-current font-mono text-[9px] font-bold leading-none"
      aria-hidden="true"
    >
      {monogram}
    </span>
  )
}

export default function Skills({ inset = false }) {
  return (
    <section className={inset ? '' : 'section'}>
      <p className="eyebrow">Skills</p>
      <h2 className={inset ? 'h3' : 'h2'}>Tools I reach for.</h2>

      <div className={`mt-6 grid gap-5 ${inset ? '' : 'md:grid-cols-2'}`}>
        {portfolio.skills.map((group) => (
          <article key={group.category} className="card p-6">
            <h3 className="font-semibold text-heading">{group.category}</h3>

            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((name) => (
                <li
                  key={name}
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-[15px] text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <TechMark name={name} />
                  {name}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
