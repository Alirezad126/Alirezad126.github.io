import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function EnergyHubProject() {
  return (
    <main className="relative overflow-hidden px-4 pt-28 pb-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-[-20%] top-[10%] h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute right-[-20%] bottom-[10%] h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <section className="relative mx-auto max-w-6xl">
        <Link
          to="/#projects"
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-slate-400 bg-white/80 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-slate-800 shadow-card transition hover:border-accent hover:text-accent dark:border-line dark:bg-white/5 dark:text-muted"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="section-label">Research Project</p>

            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-6xl dark:text-white">
              Safe Reinforcement Learning for Energy Hub Optimization
            </h1>

            <p className="mt-6 text-lg font-medium leading-8 text-slate-700 dark:text-muted">
              This project was my M.Sc. thesis, focused on optimal dispatch of an
              energy hub with compressed air energy storage using safe deep
              reinforcement learning.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {['Safe RL', 'Energy Systems', 'Optimization', 'PyTorch'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide text-emerald-800 dark:text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-400 bg-white/90 shadow-card backdrop-blur-md dark:border-line dark:bg-white/[0.04]">
            <img
              src="/projects/energy-hub.png"
              alt="Safe reinforcement learning energy hub"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          <InfoCard
            title="Problem"
            text="Energy hubs involve coupled storage systems, nonlinear dynamics, and operational constraints that make control difficult."
          />

          <InfoCard
            title="Method"
            text="I developed a safe deep reinforcement learning approach that learns dispatch policies while respecting system constraints."
          />

          <InfoCard
            title="Result"
            text="The approach achieved near-optimal performance with 2.7% error while satisfying operational constraints."
          />
        </section>

        <section className="mt-10 rounded-3xl border border-slate-400 bg-white/90 p-6 shadow-card backdrop-blur-md sm:p-8 dark:border-line dark:bg-white/[0.04]">
          <p className="section-label">Publication</p>

          <h2 className="mt-3 font-display text-3xl font-bold text-slate-950 dark:text-white">
            Journal of Energy Storage
          </h2>

          <p className="mt-4 font-medium leading-8 text-slate-700 dark:text-muted">
            Optimal dispatch of an energy hub with compressed air energy storage:
            A safe reinforcement learning approach.
          </p>

          <a
            href="https://doi.org/10.1016/j.est.2022.105488"
            target="_blank"
            rel="noreferrer"
            className="focus-ring mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-slate-950 shadow-glow transition hover:-translate-y-1"
          >
            View Publication
            <ExternalLink size={18} />
          </a>
        </section>
      </section>
    </main>
  )
}

function InfoCard({ title, text }) {
  return (
    <div className="rounded-3xl border border-slate-400 bg-white/90 p-6 shadow-card backdrop-blur-md dark:border-line dark:bg-white/[0.04]">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-accent">
        {title}
      </p>

      <p className="mt-4 font-medium leading-7 text-slate-700 dark:text-muted">
        {text}
      </p>
    </div>
  )
}