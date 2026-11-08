import { ArrowDown, ArrowRight } from 'lucide-react'

/**
 * A row of labelled boxes joined by arrows. Horizontal on a wide screen and
 * stacked on a narrow one, so the arrows always point the way the data moves.
 */
export function Flow({ steps, caption }) {
  return (
    <figure className="my-8">
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="contents sm:flex sm:flex-1 sm:items-center"
          >
            <div
              className={`flex-1 rounded-lg border px-4 py-3 ${
                step.accent
                  ? 'border-accent/60 bg-accent/10'
                  : 'border-line bg-card'
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  step.accent ? 'text-accent' : 'text-heading'
                }`}
              >
                {step.title}
              </p>
              {step.note && (
                <p className="mt-1 text-xs leading-5 text-muted">{step.note}</p>
              )}
            </div>

            {index < steps.length - 1 && (
              <>
                <ArrowDown
                  size={16}
                  aria-hidden="true"
                  className="mx-auto shrink-0 text-muted sm:hidden"
                />
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="mx-2 hidden shrink-0 text-muted sm:block"
                />
              </>
            )}
          </div>
        ))}
      </div>

      {caption && (
        <figcaption className="mt-3 text-xs text-muted">{caption}</figcaption>
      )}
    </figure>
  )
}

/**
 * Why the match is an angle and not a word count. Two passages point near the
 * question, one points elsewhere, and none of that depends on shared words.
 */
export function SimilarityDiagram() {
  // Angles carry the meaning here, so the scores are the angles: the closer a
  // passage points to the question, the higher its number.
  const rays = [
    { angle: -30, label: 'passage A', score: '0.81', match: true },
    { angle: -42, label: 'your question', score: null, query: true },
    { angle: -62, label: 'passage B', score: '0.74', match: true },
    { angle: -6, label: 'passage C', score: '0.19', match: false }
  ]

  const origin = { x: 70, y: 210 }
  const length = 180

  return (
    <figure className="my-8 rounded-xl border border-line bg-card p-6">
      <svg
        viewBox="0 0 440 250"
        className="h-auto w-full max-w-lg"
        role="img"
        aria-label="Vectors drawn from a common origin. Passages pointing in a similar direction to the question score higher."
      >
        <line
          x1={origin.x}
          y1={origin.y}
          x2={origin.x + 300}
          y2={origin.y}
          stroke="rgb(var(--color-line))"
          strokeWidth="1"
        />
        <line
          x1={origin.x}
          y1={origin.y}
          x2={origin.x}
          y2={origin.y - 190}
          stroke="rgb(var(--color-line))"
          strokeWidth="1"
        />

        {rays.map((ray) => {
          const radians = (ray.angle * Math.PI) / 180
          const x = origin.x + Math.cos(radians) * length
          const y = origin.y + Math.sin(radians) * length
          const stroke = ray.query
            ? 'rgb(var(--color-accent))'
            : ray.match
              ? 'rgb(var(--color-heading))'
              : 'rgb(var(--color-muted))'

          return (
            <g key={ray.label}>
              <line
                x1={origin.x}
                y1={origin.y}
                x2={x}
                y2={y}
                stroke={stroke}
                strokeWidth={ray.query ? 2.5 : 1.5}
                strokeDasharray={ray.match === false ? '4 4' : undefined}
              />
              <circle cx={x} cy={y} r={ray.query ? 4 : 3} fill={stroke} />
              <text
                x={x + 10}
                y={y + 4}
                fill={stroke}
                fontSize="12"
                fontWeight={ray.query ? 700 : 500}
              >
                {ray.label}
                {ray.score ? ` (${ray.score})` : ''}
              </text>
            </g>
          )
        })}

        <path
          d="M 124.6 178.5 A 63 63 0 0 0 116.8 167.8"
          fill="none"
          stroke="rgb(var(--color-accent))"
          strokeWidth="1.5"
        />
        <text
          x={origin.x + 62}
          y={origin.y - 48}
          fill="rgb(var(--color-accent))"
          fontSize="11"
        >
          angle = similarity
        </text>
      </svg>

      <figcaption className="mt-4 text-xs leading-5 text-muted">
        Every passage and the question become points in the same space. The
        closer the direction, the higher the score, which is why a passage can
        match well without repeating any of your words.
      </figcaption>
    </figure>
  )
}
