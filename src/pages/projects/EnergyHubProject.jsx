import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function EnergyHubProject() {
  return (
    <main className="shell py-12 sm:py-16">

      <section className="relative">
        <Link
          to="/projects"
          className="focus-ring inline-flex items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Research Project</p>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              Safe Reinforcement Learning for Energy Hub Optimization
            </h1>

            <p className="mt-6 leading-7 text-muted">
              This project was my M.Sc. thesis, focused on optimal dispatch of an
              energy hub with compressed air energy storage using safe deep
              reinforcement learning.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {['Safe RL', 'Energy Systems', 'Optimization', 'PyTorch'].map((tag) => (
                <span
                  key={tag}
                  className="chip"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-line bg-card">
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

        <section className="mt-10 rounded-xl border border-line bg-card p-6 sm:p-8">
          <p className="eyebrow">Publication</p>

          <h2 className="mt-3 text-xl font-semibold text-heading">
            Journal of Energy Storage
          </h2>

          <p className="mt-4 font-medium leading-8 text-muted">
            Optimal dispatch of an energy hub with compressed air energy storage:
            A safe reinforcement learning approach.
          </p>

          <a
            href="https://doi.org/10.1016/j.est.2022.105488"
            target="_blank"
            rel="noreferrer"
            className="focus-ring mt-6 inline-flex items-center gap-2 btn-primary"
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
    <div className="rounded-xl border border-line bg-card p-6">
      <p className="eyebrow">
        {title}
      </p>

      <p className="mt-4 font-medium leading-7 text-muted">
        {text}
      </p>
    </div>
  )
}