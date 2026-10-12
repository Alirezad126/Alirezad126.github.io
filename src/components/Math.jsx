import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

/** Centred display equation with an optional caption. */
export function Equation({ math, caption }) {
  return (
    <figure className="overflow-x-auto rounded-xl border border-line bg-card px-5 py-6 text-heading">
      <BlockMath math={math} />

      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/** Several related equations stacked in one card. */
export function EquationGroup({ items }) {
  return (
    <figure className="grid gap-5 rounded-xl border border-line bg-card px-5 py-6">
      {items.map((item) => (
        <div key={item.math} className="overflow-x-auto text-heading">
          <BlockMath math={item.math} />

          {item.label && (
            <p className="mt-2 text-center text-sm text-muted">{item.label}</p>
          )}
        </div>
      ))}
    </figure>
  )
}

export { InlineMath, BlockMath }
