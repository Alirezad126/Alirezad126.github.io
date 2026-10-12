/**
 * Slow-rising bubbles behind the whole site.
 *
 * Deliberately cheap: each bubble animates transform and opacity only, on a
 * fixed composited layer that ignores pointer events, so there is no repaint
 * and no scroll cost. The outer element rises, the inner one sways, which keeps
 * the two motions independent without any JavaScript.
 *
 * To remove it, delete this file and its single <BackgroundFX /> in App.jsx,
 * plus the `.bg-fx` block in index.css.
 */

// size (px), left (%), rise duration (s), sway duration (s), delay (s)
const bubbles = [
  { size: 220, left: 4, rise: 96, sway: 18, delay: 0 },
  { size: 90, left: 17, rise: 72, sway: 13, delay: -34 },
  { size: 380, left: 26, rise: 128, sway: 24, delay: -58 },
  { size: 150, left: 41, rise: 84, sway: 16, delay: -16 },
  { size: 300, left: 52, rise: 112, sway: 21, delay: -74 },
  { size: 110, left: 66, rise: 78, sway: 14, delay: -42 },
  { size: 420, left: 76, rise: 136, sway: 26, delay: -22 },
  { size: 180, left: 90, rise: 90, sway: 17, delay: -62 },
  { size: 130, left: 97, rise: 80, sway: 15, delay: -8 }
]

export default function BackgroundFX() {
  return (
    <div className="bg-fx" aria-hidden="true">
      {bubbles.map((bubble, index) => (
        <span
          key={index}
          className="bg-fx-bubble"
          style={{
            '--size': `${bubble.size}px`,
            '--left': `${bubble.left}%`,
            '--rise': `${bubble.rise}s`,
            '--sway': `${bubble.sway}s`,
            '--delay': `${bubble.delay}s`
          }}
        >
          <i />
        </span>
      ))}
    </div>
  )
}
