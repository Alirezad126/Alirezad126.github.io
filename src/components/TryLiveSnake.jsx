import { useEffect, useRef, useState } from 'react'
import { Play, Pause, RotateCcw, X, Loader2, Zap } from 'lucide-react'
import SnakeCanvas from './SnakeCanvas'

const ENDPOINT = import.meta.env.VITE_SNAKE_API_URL ?? ''

const BASE_FRAME_MS = 90

const SPEEDS = [0.5, 1, 2, 4]

const MIN_GRID = 8
const MAX_GRID = 24

/**
 * The agent was trained on a square board and starts three cells in from the
 * left, so very small grids leave it no room and very large ones just make the
 * episode -- and the Lambda invocation behind it -- run longer. The handler
 * enforces the same bounds server-side.
 */
function GridSlider({ label, value, onChange, disabled }) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-sm font-medium text-muted">
        {label}
        <span className="font-mono text-accent">{value}</span>
      </span>
      <input
        type="range"
        min={MIN_GRID}
        max={MAX_GRID}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
        className="focus-ring mt-2 w-full accent-accent disabled:opacity-50"
      />
    </label>
  )
}

function Stat({ label, value, highlight }) {
  return (
    <div className="px-3 py-3 text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      <p
        className={`mt-1 font-mono text-2xl font-bold tabular-nums ${
          highlight ? 'text-accent' : 'text-heading'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

export default function TryLiveSnake() {
  const [open, setOpen] = useState(false)
  const [gridX, setGridX] = useState(15)
  const [gridY, setGridY] = useState(15)
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [frame, setFrame] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [playing, setPlaying] = useState(false)
  const closeRef = useRef(null)

  // The whole episode is already in memory, so speed is a playback concern:
  // changing it retimes the animation in place rather than asking AWS again.
  useEffect(() => {
    if (!playing || !result) return undefined
    const interval = BASE_FRAME_MS / speed
    let raf
    let last = performance.now()
    const tick = (now) => {
      // Advance by however many intervals have elapsed rather than one frame
      // per repaint: at 4x the step is shorter than a 60Hz frame, and a tab
      // that drops to a low refresh rate would otherwise play in slow motion.
      const due = Math.floor((now - last) / interval)
      if (due > 0) {
        last += due * interval
        setFrame((current) => {
          const next = Math.min(current + Math.min(due, 12), result.trajectory.length - 1)
          if (next >= result.trajectory.length - 1) setPlaying(false)
          return next
        })
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, speed, result])

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

  async function run() {
    setStatus('running')
    setError(null)
    setResult(null)
    try {
      if (!ENDPOINT) throw new Error('No endpoint configured yet.')
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ x: gridX, y: gridY })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? `Request failed (${response.status})`)
      setResult(data)
      setFrame(0)
      setPlaying(true)
      setStatus('done')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  const busy = status === 'running'

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-primary focus-ring"
      >
        <Zap size={18} />
        Try it live
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={(event) => event.target === event.currentTarget && setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Run the DQN agent"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-line bg-card p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Live inference</p>
                <h2 className="mt-2 text-xl font-semibold text-heading">
                  Watch the agent play
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

            <p className="mt-4 text-sm leading-6 text-muted">
              Pick a board size. The trained DQN plays one full episode on AWS
              Lambda and sends back the recording.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <GridSlider label="Width" value={gridX} onChange={setGridX} disabled={busy} />
              <GridSlider label="Height" value={gridY} onChange={setGridY} disabled={busy} />
            </div>

            <button
              type="button"
              onClick={run}
              disabled={busy}
              className="btn-primary focus-ring mt-6 w-full disabled:opacity-60"
            >
              {busy ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
              {busy ? 'Playing an episode…' : 'Run the agent'}
            </button>

            {busy && (
              <p className="mt-3 text-center text-xs text-muted">
                A cold start adds a few seconds the first time.
              </p>
            )}

            {error && (
              <p className="mt-5 rounded-lg border border-line bg-black/20 p-3 text-sm text-muted">
                {error}
              </p>
            )}

            {result && (
              <div className="mt-6">
                <div className="grid grid-cols-3 divide-x divide-line overflow-hidden rounded-lg border border-line">
                  <Stat label="Score" value={result.trajectory[frame].p} highlight />
                  <Stat label="Step" value={`${frame + 1}/${result.frames}`} />
                  <Stat label="Board" value={`${result.grid[0]}×${result.grid[1]}`} />
                </div>

                <div className="mt-4">
                  <SnakeCanvas
                    trajectory={result.trajectory}
                    grid={result.grid}
                    index={frame}
                  />
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (frame + 1 >= result.trajectory.length) setFrame(0)
                      setPlaying((value) => !value)
                    }}
                    aria-label={playing ? 'Pause' : 'Play'}
                    className="focus-ring rounded-lg border border-line p-2 text-heading transition-colors hover:border-accent hover:text-accent"
                  >
                    {playing ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFrame(0)
                      setPlaying(true)
                    }}
                    aria-label="Replay from the start"
                    className="focus-ring rounded-lg border border-line p-2 text-heading transition-colors hover:border-accent hover:text-accent"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={result.trajectory.length - 1}
                    value={frame}
                    aria-label="Scrub through the episode"
                    onChange={(event) => {
                      setPlaying(false)
                      setFrame(Number(event.target.value))
                    }}
                    className="focus-ring h-1 flex-1 accent-accent"
                  />
                </div>

                <div
                  role="group"
                  aria-label="Playback speed"
                  className="mt-3 grid grid-cols-4 overflow-hidden rounded-lg border border-line"
                >
                  {SPEEDS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSpeed(option)}
                      aria-pressed={speed === option}
                      className={`focus-ring border-line py-2 font-mono text-sm transition-colors not-first:border-l ${
                        speed === option
                          ? 'bg-accent font-bold text-ink'
                          : 'text-muted hover:text-accent'
                      }`}
                    >
                      {option}×
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
