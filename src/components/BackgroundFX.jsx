/**
 * A slow, very low-contrast drift behind the whole site.
 *
 * Deliberately cheap: three soft radial gradients on a fixed, composited layer,
 * animated with transforms only, so there is no repaint and no scroll cost. It
 * sits behind everything and ignores pointer events.
 *
 * To remove it, delete this file and its single <BackgroundFX /> in App.jsx,
 * plus the `.bg-fx` block in index.css.
 */
export default function BackgroundFX() {
  return (
    <div className="bg-fx" aria-hidden="true">
      <span className="bg-fx-a" />
      <span className="bg-fx-b" />
      <span className="bg-fx-c" />
    </div>
  )
}
