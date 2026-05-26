import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const tags = ['DQN', 'Q-Learning', 'Experience Replay', 'Exploration', 'PyTorch']

export default function SnakeProject() {
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

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="section-label">Reinforcement Learning</p>

            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-6xl dark:text-white">
              DQN Agent Playing a Snake Game
            </h1>

            <p className="mt-6 text-lg font-medium leading-8 text-slate-700 dark:text-muted">
              This project integrates a Pygame-based interface with a reinforcement
              learning environment. It demonstrates how a Deep Q-Network agent can
              learn to play the Snake game by interacting with the environment and
              improving its behavior from reward feedback.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag) => (
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
              src="https://www.coolmathgames.com/sites/default/files/Snake_OG-logo.jpg"
              alt="Snake reinforcement learning project"
              className="h-full max-h-[460px] w-full object-cover"
            />
          </div>
        </div>

        <article className="mt-14 rounded-3xl border border-slate-400 bg-white/90 p-6 shadow-card backdrop-blur-md sm:p-8 lg:p-10 dark:border-line dark:bg-white/[0.04]">
          <section>
            <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
              1. Description
            </h2>

            <p className="mt-4 font-medium leading-8 text-slate-700 dark:text-muted">
              This project integrates a Pygame-based interface with a reinforcement
              learning environment. It allows both machine learning agents and human
              players to interact with the PySnake game. The project demonstrates
              the use of a Deep Q-Network agent to autonomously play and learn from
              the game environment. The objective is to train an AI agent to
              navigate the game by controlling a snake, maximizing its score by
              consuming food items while avoiding collisions with itself and the
              game boundaries.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
              2. Game Mechanics
            </h2>

            <div className="mt-5 space-y-4 font-medium leading-8 text-slate-700 dark:text-muted">
              <p className="flex gap-3">
                <span className="mt-3 h-2 w-2 shrink-0 rotate-45 bg-accent" />
                <span>
                  <strong className="text-slate-950 dark:text-white">
                    Game Environment:
                  </strong>{' '}
                  The environment consists of a fixed-size grid with defined
                  boundaries. Within this grid, the snake moves in discrete steps
                  from one cell to another.
                </span>
              </p>

              <p className="flex gap-3">
                <span className="mt-3 h-2 w-2 shrink-0 rotate-45 bg-accent" />
                <span>
                  <strong className="text-slate-950 dark:text-white">
                    Action Space:
                  </strong>{' '}
                  The agent can choose from four discrete actions corresponding
                  to the directions up, down, left, and right. Each action
                  determines the snake&apos;s movement direction.
                </span>
              </p>

              <p className="flex gap-3">
                <span className="mt-3 h-2 w-2 shrink-0 rotate-45 bg-accent" />
                <span>
                  <strong className="text-slate-950 dark:text-white">
                    State Representation:
                  </strong>{' '}
                  The game&apos;s state includes the position of the snake&apos;s
                  head, the location of the food item, and the presence of
                  immediate threats such as approaching walls or the snake&apos;s
                  body. This helps the agent understand its current situation and
                  make informed decisions.
                </span>
              </p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
              3. Objectives and Rewards
            </h2>

            <div className="mt-5 space-y-4 font-medium leading-8 text-slate-700 dark:text-muted">
              <p className="flex gap-3">
                <span className="mt-3 h-2 w-2 shrink-0 rotate-45 bg-accent" />
                <span>
                  <strong className="text-slate-950 dark:text-white">
                    Objective:
                  </strong>{' '}
                  The primary goal for the agent is to increase its score, which
                  it achieves by eating food. Each piece of food consumed not
                  only increases the score but also extends the snake&apos;s
                  length.
                </span>
              </p>

              <p className="flex gap-3">
                <span className="mt-3 h-2 w-2 shrink-0 rotate-45 bg-accent" />
                <span>
                  <strong className="text-slate-950 dark:text-white">
                    Reward:
                  </strong>{' '}
                  The training process involves a reward system where positive
                  rewards are given for eating food and negative rewards are
                  assigned for crashing into the walls or the snake itself. The
                  agent learns to navigate by maximizing its cumulative reward.
                </span>
              </p>
            </div>
          </section>
        </article>
      </section>
    </main>
  )
}