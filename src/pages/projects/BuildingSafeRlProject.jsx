import { ArrowLeft, Github } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

const tags = ['Python', 'Safe RL', 'PD-DDPG', 'OpenAI Gym', 'NeuroMANCER', 'DPC']

export default function BuildingSafeRlProject() {
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
            <p className="section-label">Safe Building Control</p>

            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-6xl dark:text-white">
              Learning to Control Indoor Air Temperature with Safe RL and DPC
            </h1>

            <p className="mt-6 text-lg font-medium leading-8 text-slate-700 dark:text-muted">
              This project investigates learning-based control for indoor air
              temperature regulation in a single-zone building. The main goal is
              to keep the room temperature within a prescribed thermal comfort
              range while reducing heating energy consumption. To study this
              constrained control problem, I implemented and compared two
              approaches: primal-dual Deep Deterministic Policy Gradient for safe
              reinforcement learning and Differentiable Predictive Control as a
              model-based policy optimization method.
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

            <a
              href="https://github.com/pnnl/neuromancer/blob/master/examples/domain_examples/RL_DPC_building_control.ipynb"
              target="_blank"
              rel="noreferrer"
              className="focus-ring mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-slate-950 shadow-glow transition hover:-translate-y-1"
            >
              <Github size={18} />
              View GitHub
            </a>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-400 bg-white/90 shadow-card backdrop-blur-md dark:border-line dark:bg-white/[0.04]">
            <img
              src="/projects/building-safe-rl.png"
              alt="Safe reinforcement learning building control project"
              className="h-full max-h-[460px] w-full object-cover"
            />
          </div>
        </div>

        <article className="mt-16 rounded-3xl border border-slate-400 bg-white/90 p-6 shadow-card backdrop-blur-md sm:p-8 lg:p-10 dark:border-line dark:bg-white/[0.04]">
          <section>
            <p className="section-label">Objective</p>

            <h2 className="mt-3 font-display text-3xl font-bold text-slate-950 dark:text-white">
              Constrained temperature regulation
            </h2>

            <p className="mt-5 font-medium leading-8 text-slate-700 dark:text-muted">
              The control objective is to determine heating actions that regulate
              the indoor air temperature while satisfying comfort constraints.
              In practice, this means the controller should avoid overheating or
              underheating the room, but it should also avoid excessive control
              effort. Therefore, the problem is not only an energy minimization
              problem. It is a constrained decision-making problem in which
              comfort violation and energy use must be optimized together.
            </p>
          </section>

          <section className="mt-12">
            <p className="section-label">System Model</p>

            <h2 className="mt-3 font-display text-3xl font-bold text-slate-950 dark:text-white">
              Single-zone building dynamics
            </h2>

            <p className="mt-5 font-medium leading-8 text-slate-700 dark:text-muted">
              The building was represented using a discrete-time linear
              state-space model. The state vector <InlineMath math="x_t" />{' '}
              describes the thermal condition of the building, the input{' '}
              <InlineMath math="u_t" /> represents the heating action, and{' '}
              <InlineMath math="d_t" /> contains external disturbances such as
              outdoor temperature and solar radiation. The indoor air
              temperature is obtained from the output equation.
            </p>

            <Equation math={String.raw`x_{t+1}=Ax_t+Bu_t+Ed_t,\qquad y_t=Cx_t`} />

            <p className="font-medium leading-8 text-slate-700 dark:text-muted">
              This formulation provides a compact environment for evaluating
              learning-based controllers. In the implementation, the model and
              data generation were built using NeuroMANCER, while the
              reinforcement learning interface was implemented as a custom
              OpenAI Gym environment.
            </p>
          </section>

          <section className="mt-12">
            <p className="section-label">Method 01</p>

            <h2 className="mt-3 font-display text-3xl font-bold text-slate-950 dark:text-white">
              Differentiable Predictive Control
            </h2>

            <p className="mt-5 font-medium leading-8 text-slate-700 dark:text-muted">
              In the Differentiable Predictive Control formulation, the
              controller is expressed as a neural policy. The policy receives
              the current state, the reference temperature bounds, and the
              disturbance information, then outputs a control action.
            </p>

            <Equation math={String.raw`u_k=\pi_{\theta}(x_k,R,d_k)`} />

            <p className="font-medium leading-8 text-slate-700 dark:text-muted">
              Because the system model is differentiable, the policy parameters
              can be optimized directly through the predicted system trajectory.
              The objective penalizes deviation from the desired temperature
              range and unnecessary control effort over the prediction horizon.
            </p>

            <Equation
              math={String.raw`\min_{\theta}\sum_{i=1}^{m}\sum_{k=1}^{N-1}
              \left(
              Q_x\lVert x_k^i-r_k^i\rVert_2^2+
              Q_u\lVert u_k^i\rVert_2^2
              \right)`}
            />

            <p className="font-medium leading-8 text-slate-700 dark:text-muted">
              This method is model-based because the policy is trained by using
              the differentiable dynamics of the building. It is useful when a
              reliable model is available and when the controller can be trained
              offline before deployment.
            </p>
          </section>

          <section className="mt-12">
            <p className="section-label">Method 02</p>

            <h2 className="mt-3 font-display text-3xl font-bold text-slate-950 dark:text-white">
              Safe reinforcement learning with PD-DDPG
            </h2>

            <p className="mt-5 font-medium leading-8 text-slate-700 dark:text-muted">
              The second method formulates the task as a constrained
              reinforcement learning problem. A primal-dual version of DDPG was
              used because the heating action is continuous and the controller
              must account for comfort constraints. The agent receives a reward
              related to energy use and a cost related to comfort violation.
            </p>

            <Equation
              math={String.raw`\mathcal{L}(\pi,\lambda)=
              \mathbb{E}_{\pi}
              \left[
              r(s_t,a_t)-\lambda c(s_t,a_t)
              \right]`}
            />

            <p className="font-medium leading-8 text-slate-700 dark:text-muted">
              The dual variable <InlineMath math="\lambda" /> controls the
              importance of the safety cost. When the policy violates comfort
              constraints, <InlineMath math="\lambda" /> increases, forcing the
              actor to prioritize safer actions. When violations decrease, the
              penalty becomes less dominant.
            </p>

            <Equation
              math={String.raw`\lambda \leftarrow
              \max\left(0,\lambda+\alpha(C(s_t,a_t)-d)\right)`}
            />

            <p className="font-medium leading-8 text-slate-700 dark:text-muted">
              In this setup, the actor network learns the control policy, the
              critic network estimates the expected return, and a separate cost
              network estimates the constraint violation. A replay buffer and
              target networks are used to stabilize training, following the
              DDPG-style learning procedure.
            </p>
          </section>

          <section className="mt-12">
            <p className="section-label">Constraint Definition</p>

            <h2 className="mt-3 font-display text-3xl font-bold text-slate-950 dark:text-white">
              Thermal comfort violation
            </h2>

            <p className="mt-5 font-medium leading-8 text-slate-700 dark:text-muted">
              The safety cost was defined based on the distance between the
              indoor temperature and the acceptable comfort interval. If the
              temperature remains between the lower bound{' '}
              <InlineMath math="y_{\min,t}" /> and the upper bound{' '}
              <InlineMath math="y_{\max,t}" />, the violation cost is zero. A
              penalty is applied only when the temperature leaves this interval.
            </p>

            <Equation
              math={String.raw`c_t=
              50\left[
              \max(y_{\min,t}-y_t,0)+
              \max(y_t-y_{\max,t},0)
              \right]`}
            />

            <p className="font-medium leading-8 text-slate-700 dark:text-muted">
              This definition makes the constraint interpretable. The controller
              is not only rewarded for saving energy, but also penalized when it
              produces actions that lead to uncomfortable indoor temperatures.
            </p>
          </section>

          <section className="mt-12">
            <p className="section-label">Outcome</p>

            <h2 className="mt-3 font-display text-3xl font-bold text-slate-950 dark:text-white">
              Comparison of learning-based controllers
            </h2>

            <p className="mt-5 font-medium leading-8 text-slate-700 dark:text-muted">
              The final implementation provides a direct comparison between a
              model-based learning controller and a safe reinforcement learning
              controller for the same building-control task. DPC uses the
              differentiable model to optimize a policy offline, while PD-DDPG
              learns through interaction with the Gym environment and adjusts
              the safety penalty through the dual variable. This comparison
              highlights the trade-off between model-based policy optimization
              and interaction-based safe reinforcement learning for building
              temperature control.
            </p>
          </section>
        </article>
      </section>
    </main>
  )
}

function Equation({ math }) {
  return (
    <div className="my-8 overflow-x-auto text-slate-950 dark:text-white">
      <BlockMath math={math} />
    </div>
  )
}