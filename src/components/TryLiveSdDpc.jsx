import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, X, Zap } from 'lucide-react'

import policyData from '../data/sddpc-policies.json'
import { obstacleH, policyBytes, refAt, simulate } from '../lib/sddpc'

const CASES = policyData.cases

/* --- theme + canvas plumbing ---------------------------------------------- */

/**
 * The plots are painted with the page's own theme tokens rather than literal
 * colours, so the panel follows the light/dark toggle without a second palette.
 */
function readTheme(element) {
  const style = getComputedStyle(element)
  const token = (name) => `rgb(${style.getPropertyValue(name).trim()})`
  const alpha = (name, a) => `rgb(${style.getPropertyValue(name).trim()} / ${a})`
  return {
    accent: token('--color-accent'),
    accentSoft: alpha('--color-accent', 0.2),
    second: token('--aurora-2'),
    secondSoft: alpha('--aurora-2', 0.22),
    heading: token('--color-heading'),
    muted: token('--color-muted'),
    mutedSoft: alpha('--color-muted', 0.45),
    line: token('--color-line'),
    grid: alpha('--color-muted', 0.14),
    danger: 'rgb(239 68 68)',
    dangerSoft: 'rgb(239 68 68 / 0.12)'
  }
}

/** Size the backing store to the device pixel ratio and return a 2D context. */
function prepare(canvas) {
  const ratio = window.devicePixelRatio || 1
  const { width, height } = canvas.getBoundingClientRect()
  if (!width || !height) return null
  // Both dimensions matter: the panels differ in height between cases, and a
  // backing store left too tall keeps the previous case's axis labels.
  if (
    canvas.width !== Math.round(width * ratio) ||
    canvas.height !== Math.round(height * ratio)
  ) {
    canvas.width = Math.round(width * ratio)
    canvas.height = Math.round(height * ratio)
  }
  const ctx = canvas.getContext('2d')
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
  ctx.clearRect(0, 0, width, height)
  return { ctx, width, height }
}

const MONO = '11px ui-monospace, SFMono-Regular, Menlo, monospace'
// Left inset leaves room for the rotated axis label and the tick column side
// by side; they collide below about 52px.
const INSET = { left: 54, right: 12, top: 12, bottom: 30 }

/** Round tick positions covering [lo, hi] in roughly `count` steps. */
function ticks(lo, hi, count = 5) {
  const raw = (hi - lo) / count
  const magnitude = 10 ** Math.floor(Math.log10(raw))
  const step = [1, 2, 2.5, 5, 10].find((m) => m * magnitude >= raw) * magnitude
  const out = []
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(v)
  return out
}

/** Data-to-pixel projection for a panel, independent of any drawing. */
function project(width, height, { xLo, xHi, yLo, yHi, inset = INSET }) {
  const plotW = width - inset.left - inset.right
  const plotH = height - inset.top - inset.bottom
  return {
    plotW,
    plotH,
    inset,
    sx: (v) => inset.left + ((v - xLo) / (xHi - xLo)) * plotW,
    sy: (v) => inset.top + plotH - ((v - yLo) / (yHi - yLo)) * plotH
  }
}

/**
 * Insets that make the plot box square, centred in the panel. A phase plot has
 * to be equal-aspect or the keep-out circle is not a circle and distances on
 * screen mean nothing.
 */
function squareInset(width, height) {
  const plotW = width - INSET.left - INSET.right
  const plotH = height - INSET.top - INSET.bottom
  const side = Math.min(plotW, plotH)
  const slack = (plotW - side) / 2
  return { ...INSET, left: INSET.left + slack, right: INSET.right + slack }
}

/** Axis frame shared by every panel: ticks, labels, dotted grid. */
function drawFrame(ctx, width, height, axes, theme) {
  const { xLo, xHi, yLo, yHi, xLabel, yLabel } = axes
  const { sx, sy, plotW, plotH, inset: pad } = project(width, height, axes)

  ctx.font = MONO
  ctx.strokeStyle = theme.grid
  ctx.lineWidth = 1

  const xt = ticks(xLo, xHi, 4)
  const yt = ticks(yLo, yHi, 4)

  ctx.setLineDash([1, 3])
  ctx.beginPath()
  for (const v of xt) {
    ctx.moveTo(sx(v), pad.top)
    ctx.lineTo(sx(v), pad.top + plotH)
  }
  for (const v of yt) {
    ctx.moveTo(pad.left, sy(v))
    ctx.lineTo(pad.left + plotW, sy(v))
  }
  ctx.stroke()
  ctx.setLineDash([])

  ctx.fillStyle = theme.muted
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  const decimals = xHi - xLo > 20 ? 0 : 1
  for (const v of xt) ctx.fillText(v.toFixed(decimals), sx(v), pad.top + plotH + 6)

  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  const yDecimals = yHi - yLo > 20 ? 0 : yHi - yLo > 3 ? 1 : 2
  for (const v of yt) ctx.fillText(v.toFixed(yDecimals), pad.left - 7, sy(v))

  ctx.strokeStyle = theme.line
  ctx.strokeRect(pad.left, pad.top, plotW, plotH)

  ctx.fillStyle = theme.muted
  ctx.textAlign = 'center'
  ctx.textBaseline = 'bottom'
  ctx.fillText(xLabel, pad.left + plotW / 2, height - 2)
  ctx.save()
  // Sit just left of the tick column, which moves with a square inset.
  ctx.translate(Math.max(10, pad.left - 40), pad.top + plotH / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.textBaseline = 'top'
  ctx.fillText(yLabel, 0, 0)
  ctx.restore()

  return { sx, sy, plotW, plotH }
}

/** Red dashed constraint lines, as in the paper's figures. */
function drawLimits(ctx, sy, limits, bounds, left, right, theme) {
  ctx.strokeStyle = theme.danger
  ctx.setLineDash([6, 4])
  ctx.lineWidth = 1
  ctx.beginPath()
  for (const limit of limits) {
    if (limit < bounds[0] || limit > bounds[1]) continue
    ctx.moveTo(left, sy(limit))
    ctx.lineTo(right, sy(limit))
  }
  ctx.stroke()
  ctx.setLineDash([])
}

/* --- time-series panel (x(t) and u(t)) ------------------------------------ */

function TimeSeries({
  series,
  colors,
  reference,
  head,
  steps,
  bounds,
  limits,
  yLabel,
  theme,
  height = 190
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const frame = prepare(canvasRef.current)
    if (!frame) return
    const { ctx, width, height: h } = frame
    const { sx, sy, plotW } = drawFrame(
      ctx,
      width,
      h,
      {
        xLo: 0,
        xHi: steps,
        yLo: bounds[0],
        yHi: bounds[1],
        xLabel: 't',
        yLabel
      },
      theme
    )

    drawLimits(ctx, sy, limits, bounds, INSET.left, INSET.left + plotW, theme)

    // The commanded reference, dotted, exactly as the paper draws it.
    if (reference) {
      ctx.strokeStyle = theme.heading
      ctx.setLineDash([2, 3])
      ctx.lineWidth = 1.4
      ctx.beginPath()
      ctx.moveTo(sx(0), sy(reference[0]))
      for (let k = 1; k < reference.length; k += 1) {
        // Draw the steps square rather than ramped.
        ctx.lineTo(sx(k), sy(reference[k - 1]))
        ctx.lineTo(sx(k), sy(reference[k]))
      }
      ctx.stroke()
      ctx.setLineDash([])
    }

    series.forEach((values, index) => {
      const color = colors[index % colors.length]
      // Whole episode faint, the played part solid.
      ctx.lineWidth = 1.6
      ctx.globalAlpha = 0.26
      ctx.strokeStyle = color
      ctx.beginPath()
      ctx.moveTo(sx(0), sy(values[0]))
      for (let k = 1; k < values.length; k += 1) ctx.lineTo(sx(k), sy(values[k]))
      ctx.stroke()

      ctx.globalAlpha = 1
      ctx.beginPath()
      ctx.moveTo(sx(0), sy(values[0]))
      const upto = Math.min(head, values.length - 1)
      for (let k = 1; k <= upto; k += 1) ctx.lineTo(sx(k), sy(values[k]))
      ctx.stroke()

      const dotY = sy(values[upto])
      ctx.fillStyle = color
      ctx.shadowColor = color
      ctx.shadowBlur = 8
      ctx.beginPath()
      ctx.arc(sx(upto), dotY, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    })

    ctx.strokeStyle = theme.mutedSoft
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(sx(Math.min(head, steps)), INSET.top)
    ctx.lineTo(sx(Math.min(head, steps)), h - INSET.bottom)
    ctx.stroke()
  }, [series, colors, reference, head, steps, bounds, limits, yLabel, theme])

  return <canvas ref={canvasRef} style={{ height }} className="w-full" />
}

/* --- state-space panel (the integrator's phase plot) ---------------------- */

function StateSpace({ spec, result, head, x0, target, onPick, theme, height = 330 }) {
  const canvasRef = useRef(null)
  const [ix, iy] = spec.plotAxes
  const [lo, hi] = spec.view

  // Both axes span the same range inside a square plot box, so a unit is the
  // same number of pixels either way and the keep-out circle reads as a circle.
  const axes = useCallback(
    (width, h) => ({
      xLo: lo,
      xHi: hi,
      yLo: lo,
      yHi: hi,
      xLabel: 'x₁',
      yLabel: 'x₂',
      inset: squareInset(width, h)
    }),
    [lo, hi]
  )

  const geometry = useCallback(
    (width, h) => project(width, h, axes(width, h)),
    [axes]
  )

  useEffect(() => {
    const frame = prepare(canvasRef.current)
    if (!frame) return
    const { ctx, width, height: h } = frame
    const { sx, sy } = drawFrame(ctx, width, h, axes(width, h), theme)
    const unit = sx(1) - sx(0)

    // The two boxes the policy was trained over -- the only region the demo
    // lets you place the start and the target.
    const box = (bounds, color, label) => {
      ctx.strokeStyle = color
      ctx.setLineDash([3, 3])
      ctx.lineWidth = 1
      ctx.strokeRect(
        sx(bounds[0][0]),
        sy(bounds[1][1]),
        sx(bounds[0][1]) - sx(bounds[0][0]),
        sy(bounds[1][0]) - sy(bounds[1][1])
      )
      ctx.setLineDash([])
      ctx.fillStyle = color
      ctx.font = MONO
      ctx.textAlign = 'left'
      ctx.textBaseline = 'bottom'
      ctx.fillText(label, sx(bounds[0][0]) + 2, sy(bounds[1][1]) - 3)
    }
    box(spec.x0Box, theme.mutedSoft, 'x₀')
    box(spec.refBox, theme.mutedSoft, 'target')

    // Keep-out region.
    if (spec.obstacle) {
      // h(x) = b*x1^2 + x2^2 - (p/2)^2, so the semi-axes are (p/2)/sqrt(b) and
      // p/2 in data units. Drawn as an ellipse rather than a scaled circle so
      // the outline keeps an even stroke width.
      const { b, p, c, d } = spec.obstacle
      const unitY = sy(0) - sy(1)
      ctx.beginPath()
      ctx.ellipse(
        sx(c),
        sy(d),
        ((p / 2) / Math.sqrt(b)) * unit,
        (p / 2) * unitY,
        0,
        0,
        Math.PI * 2
      )
      ctx.fillStyle = theme.dangerSoft
      ctx.fill()
      ctx.strokeStyle = theme.danger
      ctx.setLineDash([5, 4])
      ctx.lineWidth = 1.2
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Trajectory: whole episode faint, played part solid.
    const states = result.states
    const stroke = (to, color, lineWidth, alpha) => {
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.globalAlpha = alpha
      ctx.lineJoin = 'round'
      ctx.beginPath()
      ctx.moveTo(sx(states[0][ix]), sy(states[0][iy]))
      for (let k = 1; k <= to; k += 1) ctx.lineTo(sx(states[k][ix]), sy(states[k][iy]))
      ctx.stroke()
      ctx.globalAlpha = 1
    }
    stroke(states.length - 1, theme.accent, 1.6, 0.26)
    if (head > 0) stroke(head, theme.accent, 2.2, 1)

    // Target star, as in Fig. 7(c).
    ctx.fillStyle = theme.heading
    ctx.beginPath()
    for (let i = 0; i < 10; i += 1) {
      const radius = i % 2 === 0 ? 8 : 3.4
      const angle = (Math.PI / 5) * i - Math.PI / 2
      const px = sx(target[0]) + radius * Math.cos(angle)
      const py = sy(target[1]) + radius * Math.sin(angle)
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
    ctx.fill()

    // Start marker.
    ctx.strokeStyle = theme.muted
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(sx(x0[ix]), sy(x0[iy]), 4.5, 0, Math.PI * 2)
    ctx.stroke()

    // Leading dot, red while inside the keep-out region.
    const current = states[head]
    const margin = obstacleH(spec.obstacle, current)
    const color = margin !== null && margin < 0 ? theme.danger : theme.accent
    ctx.fillStyle = color
    ctx.shadowColor = color
    ctx.shadowBlur = 14
    ctx.beginPath()
    ctx.arc(sx(current[ix]), sy(current[iy]), 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0
  }, [spec, result, head, x0, target, theme, axes, ix, iy])

  // Clicking inside the x0 box moves the start; the policy was never trained
  // anywhere else, so clicks elsewhere clamp into it.
  const pick = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const { sx, sy } = geometry(rect.width, rect.height)
    const { xLo, xHi, yLo, yHi } = axes(rect.width, rect.height)
    const invert = (pixel, scale, dataLo, dataHi) => {
      const a = scale(dataLo)
      const b = scale(dataHi)
      return dataLo + ((pixel - a) / (b - a)) * (dataHi - dataLo)
    }
    const raw = [
      invert(event.clientX - rect.left, sx, xLo, xHi),
      invert(event.clientY - rect.top, sy, yLo, yHi)
    ]
    onPick(
      raw.map((value, i) =>
        Math.min(spec.x0Box[i][1], Math.max(spec.x0Box[i][0], value))
      )
    )
  }

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={pick}
      onPointerMove={(event) => event.buttons === 1 && pick(event)}
      style={{ height }}
      className="w-full cursor-crosshair touch-none"
    />
  )
}

/* --- coefficient table ---------------------------------------------------- */

const SUPERSCRIPT = { 2: '²', 3: '³', 4: '⁴' }

/** Render an exported term name the way the paper writes it. */
function prettyTerm(term, nref) {
  return term
    .replace(/\*/g, '·')
    .replace(/\^(\d)/g, (_, digit) => SUPERSCRIPT[digit] ?? `^${digit}`)
    .replace(/sqrt\(([^)]+)\)/g, '√$1')
    .replace(/(\d)·/g, '$1')
    .replace(/x0/g, 'x₁')
    .replace(/x1/g, 'x₂')
    // A single setpoint is just r; only the integrator has a 2-vector.
    .replace(/r0/g, nref > 1 ? 'r₁' : 'r')
    .replace(/r1/g, 'r₂')
}

/**
 * Xi_pi as the paper prints it: the whole library, with the surviving
 * coefficients shaded by sign. The ring on a cell tracks that term's share of
 * the action right now -- the thing a dense network cannot show you.
 */
function CoefficientTable({ spec, contributions }) {
  const peak = useMemo(() => {
    let largest = 1e-9
    for (const row of spec.coefficients) {
      for (const value of row) largest = Math.max(largest, Math.abs(value))
    }
    return largest
  }, [spec])

  const livePeak = Math.max(
    ...contributions.flatMap((row) => row.map(Math.abs)),
    1e-9
  )

  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <table className="w-full border-collapse font-mono text-[10px] tabular-nums">
        <thead>
          <tr className="border-b border-line">
            {spec.inputNames.map((_, channel) => (
              <th
                key={channel}
                className="px-1 py-1 text-center font-medium text-muted"
              >
                u{spec.nu > 1 ? ['₁', '₂'][channel] : ''}
              </th>
            ))}
            <th className="px-2 py-1 text-left font-medium text-muted">term</th>
          </tr>
        </thead>
        <tbody>
          {spec.terms.map((term, index) => (
            <tr key={term} className="border-b border-line/60 last:border-0">
              {spec.coefficients[index].map((coef, channel) => {
                const share = Math.abs(contributions[index][channel]) / livePeak
                const weight = Math.abs(coef) / peak
                const tint = coef === 0 ? 0 : 0.14 + 0.5 * weight
                return (
                  <td
                    key={channel}
                    className="w-[46px] px-1 py-[3px] text-center"
                    style={{
                      backgroundColor:
                        coef === 0
                          ? 'transparent'
                          : coef < 0
                            ? `rgb(56 132 255 / ${tint})`
                            : `rgb(239 90 70 / ${tint})`,
                      boxShadow:
                        coef === 0
                          ? 'none'
                          : `inset 0 0 0 1.5px rgb(var(--color-accent) / ${(0.9 * share).toFixed(3)})`
                    }}
                  >
                    <span className={coef === 0 ? 'text-muted/50' : 'text-heading'}>
                      {coef === 0 ? '0' : coef.toFixed(2)}
                    </span>
                  </td>
                )
              })}
              <td className="whitespace-nowrap px-2 py-[3px] text-muted">
                {prettyTerm(term, spec.nref)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* --- controls and readouts ------------------------------------------------ */

function Readout({ label, value, tone = 'heading' }) {
  const color =
    tone === 'accent' ? 'text-accent' : tone === 'danger' ? 'text-red-400' : 'text-heading'
  return (
    <div className="px-3 py-2.5 text-center">
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      <p className={`mt-0.5 font-mono text-sm font-bold tabular-nums ${color}`}>
        {value}
      </p>
    </div>
  )
}

function Slider({ label, value, bounds, onChange }) {
  const [min, max] = bounds
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-2 text-[12px] font-medium text-muted">
        <span className="truncate">{label}</span>
        <span className="font-mono tabular-nums text-accent">{value.toFixed(2)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={(max - min) / 200}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="focus-ring mt-1 w-full accent-accent"
      />
    </label>
  )
}

/* --- the panel ------------------------------------------------------------ */

function Panel() {
  // The case and the scenario it describes move together: a state vector from
  // the previous case would be the wrong length for one render otherwise.
  const [scenario, setScenario] = useState(() => ({
    key: CASES[0].key,
    x: CASES[0].initial.x,
    r: CASES[0].initial.r
  }))
  const spec = useMemo(
    () => CASES.find((item) => item.key === scenario.key),
    [scenario.key]
  )
  const { x: x0, r: ref } = scenario

  const [head, setHead] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [theme, setTheme] = useState(null)
  const rootRef = useRef(null)

  const selectCase = (item) =>
    setScenario({ key: item.key, x: item.initial.x, r: item.initial.r })
  const setX0 = (x) => setScenario((current) => ({ ...current, x }))
  const setRef = (r) => setScenario((current) => ({ ...current, r }))

  useEffect(() => {
    const element = rootRef.current
    if (!element) return undefined
    const sync = () => setTheme(readTheme(element))
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    return () => observer.disconnect()
  }, [])

  const result = useMemo(() => simulate(spec, x0, ref), [spec, x0, ref])

  // Moving a control restarts the episode: the trajectory you are looking at is
  // always the one the controls describe.
  useEffect(() => {
    setHead(0)
    setPlaying(true)
  }, [scenario])

  useEffect(() => {
    if (!playing) return undefined
    let raf = 0
    let last = performance.now()
    const perSecond = spec.steps / 8 // an eight-second episode, whatever its length
    const tick = (now) => {
      const advance = ((now - last) / 1000) * perSecond
      last = now
      setHead((current) => {
        const next = current + advance
        if (next >= spec.steps) {
          setPlaying(false)
          return spec.steps
        }
        return next
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, spec])

  const k = Math.max(0, Math.min(Math.round(head) || 0, spec.steps))
  const stepIndex = Math.min(k, spec.steps - 1)
  const state = result.states[k]
  const input = result.inputs[stepIndex]
  const contributions = result.contributions[stepIndex]
  const margin = obstacleH(spec.obstacle, state)
  const violations = result.boxViolations + result.obstacleViolations

  const stateSeries = useMemo(
    () => Array.from({ length: spec.nx }, (_, i) => result.states.map((row) => row[i])),
    [result, spec.nx]
  )
  const inputSeries = useMemo(
    () => Array.from({ length: spec.nu }, (_, i) => result.inputs.map((row) => row[i])),
    [result, spec.nu]
  )
  // Only the shared-setpoint cases get a reference trace; the integrator's
  // target is a point in the phase plane instead.
  const referenceTrace = useMemo(
    () => (spec.nref === 1 ? result.references.map((row) => row[0]) : null),
    [result, spec.nref]
  )

  if (!theme) return <div ref={rootRef} className="h-4" />

  const pad = (lo, hi) => {
    const slack = 0.08 * (hi - lo)
    return [lo - slack, hi + slack]
  }
  const stateBounds = pad(spec.view[0], spec.view[1])
  const inputBounds = pad(spec.umin, spec.umax)
  const seriesColors = [theme.accent, theme.second]

  return (
    <div ref={rootRef}>
      <div
        role="tablist"
        aria-label="Case study"
        className="flex flex-wrap gap-1 rounded-lg border border-line bg-ink p-1"
      >
        {CASES.map((item) => {
          const selected = item.key === scenario.key
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => selectCase(item)}
              className={`focus-ring flex-1 whitespace-nowrap rounded-md px-3 py-2 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                selected ? 'bg-accent text-ink' : 'text-muted hover:text-accent'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <p className="mt-3 text-sm leading-6 text-muted">{spec.blurb}</p>

      {/* The paper's panel: stacked traces on the left, Xi_pi on the right. */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="rounded-lg border border-line bg-ink px-2 py-3">
          {spec.layout === 'statespace' ? (
            <StateSpace
              spec={spec}
              result={result}
              head={k}
              x0={x0}
              target={ref}
              onPick={setX0}
              theme={theme}
            />
          ) : (
            <TimeSeries
              series={stateSeries}
              colors={seriesColors}
              reference={referenceTrace}
              head={k}
              steps={spec.steps}
              bounds={stateBounds}
              limits={[spec.xmin, spec.xmax]}
              yLabel="x"
              theme={theme}
              height={spec.nref === 1 ? 210 : 190}
            />
          )}
          <TimeSeries
            series={inputSeries}
            colors={seriesColors}
            head={k}
            steps={spec.steps}
            bounds={inputBounds}
            limits={[spec.umin, spec.umax]}
            yLabel="u"
            theme={theme}
            height={spec.layout === 'statespace' ? 170 : 190}
          />
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 pt-1 text-[11px] text-muted">
            {/* Where the state panel is a phase plot, the only traces left are
                the control channels, so the legend names those instead. */}
            {(spec.layout === 'statespace' ? spec.inputNames : spec.stateNames).map(
              (name, i) => (
                <span key={name} className="inline-flex items-center gap-1.5">
                  <span
                    className="inline-block h-[2px] w-4"
                    style={{ backgroundColor: seriesColors[i % seriesColors.length] }}
                  />
                  {name}
                </span>
              )
            )}
            {referenceTrace && (
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block h-0 w-4 border-t border-dotted border-heading" />
                reference
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-0 w-4 border-t border-dashed border-red-500" />
              constraints
            </span>
          </div>
        </div>

        <div className="lg:w-[230px]">
          <p className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
            Policy coefficients <span className="normal-case">Ξπ</span>
          </p>
          <div className="max-h-[420px] overflow-y-auto">
            <CoefficientTable spec={spec} contributions={contributions} />
          </div>
        </div>
      </div>

      {/* Controls. */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
          {spec.stateNames.map((name, i) => (
            <Slider
              key={name}
              label={`x₀: ${name}`}
              value={x0[i]}
              bounds={spec.x0Box[i]}
              onChange={(value) => {
                const next = x0.slice()
                next[i] = value
                setX0(next)
              }}
            />
          ))}
          {spec.segment
            ? ref.map((value, i) => (
                <Slider
                  key={i}
                  label={`setpoint, t = ${i * spec.segment} to ${(i + 1) * spec.segment}`}
                  value={value}
                  bounds={spec.refBox[0]}
                  onChange={(next) => {
                    const updated = ref.slice()
                    updated[i] = next
                    setRef(updated)
                  }}
                />
              ))
            : spec.refNames.map((name, i) => (
                <Slider
                  key={name}
                  label={`target: ${name}`}
                  value={ref[i]}
                  bounds={spec.refBox[i]}
                  onChange={(value) => {
                    const next = ref.slice()
                    next[i] = value
                    setRef(next)
                  }}
                />
              ))}
        </div>

        <div className="flex flex-col gap-2 lg:w-[230px]">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                if (k >= spec.steps) setHead(0)
                setPlaying((value) => !value)
              }}
              className="btn-primary focus-ring flex-1 px-4 py-2.5 text-sm"
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
              {playing ? 'Pause' : k >= spec.steps ? 'Replay' : 'Play'}
            </button>
            <button
              type="button"
              onClick={() => selectCase(spec)}
              aria-label="Reset to the nominal scenario"
              className="btn-ghost focus-ring px-3 py-2.5 text-sm"
            >
              <RotateCcw size={16} />
            </button>
          </div>
          <input
            type="range"
            min={0}
            max={spec.steps}
            value={k}
            onChange={(event) => {
              setPlaying(false)
              setHead(Number(event.target.value))
            }}
            aria-label="Scrub through the episode"
            className="focus-ring w-full accent-accent"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 divide-x divide-line overflow-hidden rounded-lg border border-line sm:grid-cols-6">
        <Readout label="Step" value={`${k} / ${spec.steps}`} />
        <Readout label="State" value={state.map((v) => v.toFixed(2)).join(', ')} />
        <Readout
          label="Action"
          value={input.map((v) => v.toFixed(2)).join(', ')}
          tone="accent"
        />
        <Readout
          label={spec.nref === 1 ? 'Setpoint' : 'Final error'}
          value={
            spec.nref === 1
              ? refAt(spec, ref, stepIndex)[0].toFixed(2)
              : result.finalError.toFixed(3)
          }
        />
        <Readout
          // For the obstacle case the useful number is the closest the whole
          // trajectory ever came to the keep-out region, not today's distance.
          label={spec.obstacle ? 'Closest approach' : 'Violations'}
          value={spec.obstacle ? result.minMargin.toFixed(2) : `${violations}`}
          tone={violations > 0 ? 'danger' : 'heading'}
        />
        <Readout label="Policy size" value={`${policyBytes(spec)} B`} tone="accent" />
      </div>

      <p className="mt-3 text-[11px] leading-5 text-muted">
        Everything above runs in this page: the retained coefficients are{' '}
        {policyBytes(spec)} bytes, and the plant is the <em>true</em> nonlinear
        system integrated with RK4, not the identified model the policy was
        trained against, so the mismatch is included. The sliders are bounded by
        the regions the policy was actually trained over.
      </p>
    </div>
  )
}

export default function TryLiveSdDpc() {
  const [open, setOpen] = useState(false)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn-primary focus-ring">
        <Zap size={18} />
        Try it live
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-6"
          onClick={(event) => event.target === event.currentTarget && setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Run the SD-DPC controllers"
            className="w-full max-w-5xl rounded-xl border border-line bg-card p-5 shadow-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Live closed loop</p>
                <h2 className="mt-2 text-xl font-semibold text-heading">
                  Drive the sparse controllers
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="focus-ring rounded-lg border border-line p-2 text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5">
              <Panel />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
