/**
 * Page background: a blueprint dot grid, a soft aurora anchored under the
 * hero, and a faint grain layer to keep the gradients from banding.
 *
 * All three are static — painted once, no animation, no runtime, no scroll
 * cost. The grid is masked so it is strongest at the top of the page and
 * fades out before the content gets dense.
 *
 * To remove it, delete this file and its single <BackgroundFX /> in App.jsx,
 * plus the `.bg-fx` block in index.css.
 */
export default function BackgroundFX() {
  return (
    <div className="bg-fx" aria-hidden="true">
      <div className="bg-fx-aurora" />
      <div className="bg-fx-grid" />
      <div className="bg-fx-grain" />
    </div>
  )
}
