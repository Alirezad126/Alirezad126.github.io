/**
 * Glowing points drifting slowly behind the site.
 *
 * Each point is a bright core inside a soft halo, animating transform and
 * opacity only, on a fixed composited layer that ignores pointer events — so
 * there is no repaint and no scroll cost. The layer is masked horizontally in
 * index.css so the points stay out of the reading column.
 *
 * To remove it, delete this file and its single <BackgroundFX /> in App.jsx,
 * plus the `.bg-fx` block in index.css.
 */

// x/y (%), glow size (px), drift (vmax), cycle (s), delay (s)
const points = [
  { x: 4, y: 12, size: 110, dx: 2.2, dy: -1.6, dur: 34, delay: 0 },
  { x: 11, y: 58, size: 64, dx: -1.8, dy: 2.4, dur: 46, delay: -12 },
  { x: 17, y: 86, size: 140, dx: 2.6, dy: 1.2, dur: 52, delay: -28 },
  { x: 24, y: 31, size: 48, dx: -1.4, dy: -2.2, dur: 38, delay: -7 },
  { x: 33, y: 72, size: 90, dx: 1.9, dy: -1.1, dur: 44, delay: -20 },
  { x: 41, y: 9, size: 56, dx: -2.3, dy: 1.7, dur: 50, delay: -33 },
  { x: 49, y: 47, size: 120, dx: 1.5, dy: 2.1, dur: 40, delay: -15 },
  { x: 57, y: 88, size: 70, dx: -1.7, dy: -1.9, dur: 48, delay: -41 },
  { x: 66, y: 22, size: 100, dx: 2.4, dy: 1.4, dur: 36, delay: -5 },
  { x: 74, y: 64, size: 52, dx: -2.0, dy: -2.3, dur: 54, delay: -26 },
  { x: 82, y: 15, size: 130, dx: 1.6, dy: 2.0, dur: 42, delay: -18 },
  { x: 88, y: 79, size: 76, dx: -2.5, dy: -1.3, dur: 47, delay: -37 },
  { x: 95, y: 40, size: 96, dx: 2.1, dy: 1.8, dur: 39, delay: -9 }
]

export default function BackgroundFX() {
  return (
    <div className="bg-fx" aria-hidden="true">
      {points.map((point, index) => (
        <span
          key={index}
          className="bg-fx-point"
          style={{
            '--x': `${point.x}%`,
            '--y': `${point.y}%`,
            '--size': `${point.size}px`,
            '--dx': `${point.dx}vmax`,
            '--dy': `${point.dy}vmax`,
            '--dur': `${point.dur}s`,
            '--delay': `${point.delay}s`
          }}
        />
      ))}
    </div>
  )
}
