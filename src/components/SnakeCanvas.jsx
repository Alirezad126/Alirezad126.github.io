import { useEffect, useRef, useState } from 'react'

/**
 * Draws one frame of a recorded episode.
 *
 * Colours come from the stylesheet rather than constants so the board follows
 * the site's light and dark themes, and the canvas is sized in device pixels so
 * the cells stay sharp on retina screens instead of being upscaled.
 */
function readTheme(element) {
  const style = getComputedStyle(element)
  const token = (name) => `rgb(${style.getPropertyValue(name).trim()})`
  return {
    card: token('--color-card'),
    line: token('--color-line'),
    accent: token('--color-accent'),
    ink: token('--color-ink'),
    muted: token('--color-muted')
  }
}

function mix(a, b, t) {
  const parse = (c) => c.match(/\d+/g).map(Number)
  const [r1, g1, b1] = parse(a)
  const [r2, g2, b2] = parse(b)
  const at = (x, y) => Math.round(x + (y - x) * t)
  return `rgb(${at(r1, r2)}, ${at(g1, g2)}, ${at(b1, b2)})`
}

function draw(canvas, frame, grid, theme) {
  const [cols, rows] = grid
  const dpr = window.devicePixelRatio || 1
  const width = canvas.clientWidth
  const cell = width / cols
  const height = cell * rows

  if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    canvas.style.height = `${height}px`
  }

  const ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, width, height)

  ctx.fillStyle = theme.card
  ctx.fillRect(0, 0, width, height)

  ctx.strokeStyle = theme.line
  ctx.lineWidth = 1
  ctx.beginPath()
  for (let x = 1; x < cols; x += 1) {
    ctx.moveTo(Math.round(x * cell) + 0.5, 0)
    ctx.lineTo(Math.round(x * cell) + 0.5, height)
  }
  for (let y = 1; y < rows; y += 1) {
    ctx.moveTo(0, Math.round(y * cell) + 0.5)
    ctx.lineTo(width, Math.round(y * cell) + 0.5)
  }
  ctx.stroke()

  // Walls occupy the outermost ring of cells, matching the environment's own
  // collision bounds. Tinted towards the muted text colour rather than the page
  // background, which inverts between themes and would leave the wall
  // invisible in one of them.
  ctx.fillStyle = mix(theme.card, theme.muted, 0.28)
  ctx.fillRect(0, 0, width, cell)
  ctx.fillRect(0, height - cell, width, cell)
  ctx.fillRect(0, 0, cell, height)
  ctx.fillRect(width - cell, 0, cell, height)

  ctx.strokeStyle = theme.line
  ctx.strokeRect(cell, cell, width - 2 * cell, height - 2 * cell)

  // Food: a halo under a solid dot.
  const [fx, fy] = frame.f
  const cx = (fx + 0.5) * cell
  const cy = (fy + 0.5) * cell
  const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, cell * 0.75)
  halo.addColorStop(0, mix(theme.card, theme.accent, 0.45))
  halo.addColorStop(1, mix(theme.card, theme.accent, 0))
  ctx.fillStyle = halo
  ctx.beginPath()
  ctx.arc(cx, cy, cell * 0.75, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = theme.accent
  ctx.beginPath()
  ctx.arc(cx, cy, cell * 0.26, 0, Math.PI * 2)
  ctx.fill()

  // Snake: rounded segments fading towards the tail so direction reads in a
  // paused frame.
  const cells = frame.s
  const count = cells.length / 2
  const inset = Math.max(1, cell * 0.11)
  const radius = Math.max(2, cell * 0.28)
  const deep = mix(theme.accent, theme.ink, 0.55)

  for (let i = count - 1; i >= 0; i -= 1) {
    const x = cells[i * 2] * cell + inset / 2
    const y = cells[i * 2 + 1] * cell + inset / 2
    const size = cell - inset
    ctx.fillStyle = i === 0 ? theme.accent : mix(theme.accent, deep, i / Math.max(count - 1, 1))
    ctx.beginPath()
    ctx.roundRect(x, y, size, size, radius)
    ctx.fill()
  }

  // Eye on the head, offset towards the heading.
  const offsets = { UP: [0, -1], DOWN: [0, 1], LEFT: [-1, 0], RIGHT: [1, 0] }
  const [dx, dy] = offsets[frame.d] ?? [1, 0]
  const hx = (cells[0] + 0.5) * cell + dx * cell * 0.19
  const hy = (cells[1] + 0.5) * cell + dy * cell * 0.19
  ctx.fillStyle = theme.ink
  ctx.beginPath()
  ctx.arc(hx, hy, Math.max(1.5, cell * 0.1), 0, Math.PI * 2)
  ctx.fill()
}

export default function SnakeCanvas({ trajectory, grid, index }) {
  const canvasRef = useRef(null)
  const themeRef = useRef(null)
  const [themeTick, setThemeTick] = useState(0)

  // Reading the theme means getComputedStyle, which forces a style recalc, and
  // attaching an observer per frame would too. Both are set up once and only
  // redone when the theme toggles or the dialog resizes; the draw effect below
  // runs on every frame and does nothing but paint.
  useEffect(() => {
    const invalidate = () => {
      themeRef.current = null
      setThemeTick((value) => value + 1)
    }
    const observer = new MutationObserver(invalidate)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    window.addEventListener('resize', invalidate)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', invalidate)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (!themeRef.current) themeRef.current = readTheme(document.documentElement)
    draw(canvas, trajectory[index], grid, themeRef.current)
  }, [trajectory, grid, index, themeTick])

  return (
    <canvas
      ref={canvasRef}
      className="w-full rounded-lg border border-line"
      role="img"
      aria-label={`Frame ${index + 1} of ${trajectory.length}, score ${trajectory[index].p}`}
    />
  )
}
