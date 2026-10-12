import {
  Cloud,
  Database,
  Sigma,
  SquareFunction,
  TrendingDown,
  Waypoints
} from 'lucide-react'
import portfolio from '../data/portfolio'
import techIcons from '../data/techIcons'

/*
 * Tools with no brand mark anywhere (solvers, modelling languages, and AWS,
 * whose mark is not redistributable) get a glyph that says what they do.
 */
const glyphs = {
  SQL: Database,
  Pyomo: Sigma,
  CasADi: SquareFunction,
  IPOPT: TrendingDown,
  NeuroMANCER: Waypoints,
  AWS: Cloud
}

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

  const Glyph = glyphs[name]

  if (Glyph) {
    return <Glyph size={18} strokeWidth={1.75} className="shrink-0" aria-hidden="true" />
  }

  // Nothing should reach here; if it does, it is a missing mapping, not a label.
  return <Database size={18} strokeWidth={1.75} className="shrink-0" aria-hidden="true" />
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
