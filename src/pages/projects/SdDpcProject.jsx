import DataTable from '../../components/DataTable'
import { Equation, EquationGroup, InlineMath } from '../../components/Math'
import ProjectLayout, {
  Figure,
  InfoGrid,
  Section
} from '../../components/ProjectLayout'

const tags = [
  'Differentiable Predictive Control',
  'SINDy',
  'Sparse Policies',
  'NeuroMANCER',
  'PyTorch'
]

const trainingColumns = [
  { key: 'param', label: 'Parameter' },
  { key: 'tank', label: 'Two-tank', align: 'right', mono: true },
  { key: 'vdp', label: 'Van der Pol', align: 'right', mono: true },
  { key: 'int2d', label: '2-D integrator', align: 'right', mono: true }
]

const trainingRows = [
  { key: 'traj', param: 'Identification trajectories', tank: '2000', vdp: '2000', int2d: '1500' },
  { key: 'nid', param: 'Identification horizon', tank: '5', vdp: '3', int2d: '3' },
  { key: 'integ', param: 'Integrator', tank: 'RK4', vdp: 'RK4', int2d: 'discrete' },
  { key: 'lam', param: 'Model sparsity λ', tank: '3 × 10⁻⁶', vdp: '1 × 10⁻⁵', int2d: '1 × 10⁻⁹' },
  { key: 'tau', param: 'Model threshold τ', tank: '5 × 10⁻³', vdp: '1 × 10⁻²', int2d: '1 × 10⁻²' },
  { key: 'scen', param: 'Policy scenarios', tank: '1000', vdp: '1000', int2d: '2000' },
  { key: 'N', param: 'Policy horizon N', tank: '50', vdp: '50', int2d: '100' },
  { key: 'lamp', param: 'Policy sparsity λπ', tank: '0.1', vdp: '0.002', int2d: '0.016' },
  { key: 'taup', param: 'Policy threshold τπ', tank: '0.2', vdp: '0.125', int2d: '0.004' },
  { key: 'lib', param: 'Policy library size', tank: '22', vdp: '14', int2d: '29' }
]

const resultColumns = [
  { key: 'method', label: 'Method' },
  { key: 'loss', label: 'Task loss [10⁻³]', align: 'right', mono: true },
  { key: 'time', label: 'Time / step', align: 'right', mono: true },
  { key: 'memory', label: 'Memory', align: 'right', mono: true },
  { key: 'violations', label: 'Violations', align: 'right', mono: true }
]

const tankRows = [
  { key: 'ipopt', method: 'IPOPT (benchmark)', loss: '8.8 × 10⁻⁶', time: '8444 µs', memory: '26 MiB', violations: '0.0%' },
  { key: 'nn', method: 'NN-DPC', loss: '0.144 ± 0.013', time: '30 µs', memory: '5.01 kB', violations: '0.0%' },
  { key: 'sd', method: 'SD-DPC', loss: '0.012 ± 0.006', time: '17 µs', memory: '0.047 kB', violations: '0.0%', highlight: true },
  { key: 'dist', method: 'NN-Distilled', loss: '0.209 ± 0.039', time: '17 µs', memory: '0.047 kB', violations: '0.0%' }
]

const vdpRows = [
  { key: 'ipopt', method: 'IPOPT (benchmark)', loss: '4.6 × 10⁻²⁴', time: '301 µs', memory: '19 MiB', violations: '0.0%' },
  { key: 'nn', method: 'NN-DPC', loss: '41.0 ± 124.4', time: '29 µs', memory: '5.01 kB', violations: '0.0%' },
  { key: 'sd', method: 'SD-DPC', loss: '49.9 ± 126.4', time: '17 µs', memory: '0.023 kB', violations: '0.0%', highlight: true },
  { key: 'dist', method: 'NN-Distilled', loss: '96.8 ± 183.8', time: '17 µs', memory: '0.023 kB', violations: '0.0%' }
]

const intRows = [
  { key: 'ipopt', method: 'IPOPT (benchmark)', loss: '0.000 ± 0.000', time: '1841 µs', memory: '18 MiB', violations: '0.0%' },
  { key: 'nn', method: 'NN-DPC', loss: '0.298 ± 0.560', time: '28 µs', memory: '5.01 kB', violations: '0.0%' },
  { key: 'sd', method: 'SD-DPC', loss: '4.75 ± 4.79', time: '17 µs', memory: '0.094 kB', violations: '0.0%', highlight: true },
  { key: 'dist', method: 'NN-Distilled', loss: '62.6 ± 58.0', time: '17 µs', memory: '0.094 kB', violations: '60.8%' }
]

export default function SdDpcProject() {
  return (
    <ProjectLayout
      eyebrow="Learning-Based Control"
      title="SD-DPC: Sparse Dictionary Differentiable Predictive Control"
      summary="A framework that learns sparse, interpretable feedback policies for nonlinear systems by differentiating a constrained predictive-control objective through a model identified from data — so the policy's terms are chosen by closed-loop performance, not by imitating a pretrained controller."
      tags={tags}
      links={[
        { href: 'https://arxiv.org/abs/2610.02466', label: 'Read the preprint' },
        {
          href: 'https://github.com/SOLARIS-JHU/SD-DPC',
          label: 'View code',
          kind: 'github'
        }
      ]}
      figure={{
        src: '/projects/sddpc-method.png',
        alt: 'SD-DPC workflow: sparse identification feeding differentiable predictive control policy learning',
        caption: 'The SD-DPC workflow.',
        contain: true,
        zoomable: true,
        zoomHref: '/projects/sddpc-method.pdf'
      }}
    >
      <InfoGrid
        items={[
          {
            title: 'Problem',
            text: 'MPC solves an optimization at every step. Learned policies avoid that, but deep networks spread the control law across thousands of coupled weights that nobody can read or verify.'
          },
          {
            title: 'Method',
            text: 'Parameterize both the model and the policy as sparse dictionary expansions, and select their terms under the constrained closed-loop objective itself.'
          },
          {
            title: 'Result',
            text: 'Explicit feedback laws with a handful of terms: all constraints satisfied, 17 µs per step, under 0.1 kB of parameters.'
          }
        ]}
      />

      <Section eyebrow="Motivation" title="Interpretability that survives deployment">
        <p>
          Model predictive control optimizes closed-loop performance under state
          and input constraints, but it solves a constrained program at every
          sampling instant — prohibitive on fast nonlinear systems or restricted
          hardware. Differentiable predictive control (DPC) moves that cost
          offline: it treats the optimal-control problem as an unsupervised
          learning problem and returns an explicit policy that is cheap to
          evaluate.
        </p>

        <p>
          The catch is what that policy looks like. DPC policies are typically
          deep networks, which distribute the control law across many coupled
          parameters and are hard to interpret, verify, modify, or adapt once
          deployed. SD-DPC keeps DPC&apos;s offline training but replaces the
          network with a <em>sparse dictionary expansion</em> — a short, explicit
          sum of known functions.
        </p>
      </Section>

      <Section eyebrow="Method" title="Two sparse stages, one training procedure">
        <p>
          SD-DPC runs in two stages, both instances of the same sequentially
          thresholded gradient procedure applied to different losses. A sparse
          dynamics model is identified first from multistep rollout error,
          giving a differentiable prediction map; a sparse dictionary policy is
          then trained by differentiating a finite-horizon closed-loop objective
          through that map.
        </p>

      </Section>

      <Section eyebrow="Stage one" title="Rollout-based sparse identification">
        <p>
          A prediction model is identified first. SINDy writes the dynamics as a
          sparse combination of candidate functions collected in a library{' '}
          <InlineMath math="\Theta(X, U)" /> — polynomial, trigonometric, and
          state–input interaction terms — so that{' '}
          <InlineMath math="\dot{X} \approx \Theta(X,U)\,\Xi" />.
        </p>

        <p>
          The standard formulation regresses against measured state derivatives.
          We estimate <InlineMath math="\Xi" /> from{' '}
          <strong className="text-heading">rollout error</strong> instead, so{' '}
          <InlineMath math="\dot{X}" /> never enters the objective and the
          identification does not inherit numerical differentiation error:
        </p>

        <Equation
          math="\min_{\Xi} \; \frac{1}{m_{\mathrm{id}}} \sum_{j=1}^{m_{\mathrm{id}}} \Big( Q_1 \lVert x^j_1 - \hat{x}^j_1 \rVert_2^2 + Q_N \sum_{k=2}^{N_{\mathrm{id}}} \lVert x^j_k - \hat{x}^j_k \rVert_2^2 \Big) + \lambda \lVert \Xi \rVert_1"
          caption="Multistep identification loss, subject to the integrator rollout x_{k+1} = ODESolve(f̂, x_k, u_k, Δt)."
        />

        <p>
          With <InlineMath math="N_{\mathrm{id}} = 1" /> and an explicit Euler
          step this reduces to the usual{' '}
          <InlineMath math="\ell_1" />-regularized SINDy regression; the
          multistep terms extend it by penalizing error accumulated along the
          rollout. On held-out trajectories the identified models reach 50-step
          rollout MSEs of{' '}
          <InlineMath math="7.64 \times 10^{-10}" />,{' '}
          <InlineMath math="3.30 \times 10^{-8}" />, and{' '}
          <InlineMath math="4.71 \times 10^{-7}" />.
        </p>
      </Section>

      <Section eyebrow="Stage two" title="A policy made of the same building blocks">
        <p>
          The feedback law reuses the dictionary structure. With policy input{' '}
          <InlineMath math="z_t = [x_t\;\; \psi_t]" /> and library{' '}
          <InlineMath math="\Theta_\pi(z)" />, the policy is a projected linear
          combination:
        </p>

        <Equation
          math="u_t = \pi_{\Xi_\pi}(z_t) = \Pi_{\mathcal{U}}\big( \Theta_\pi(z_t)\, \Xi_\pi \big), \qquad \Xi_\pi \in \mathbb{R}^{p_\pi \times n_u}"
          caption="Column i of Ξπ feeds input channel i alone, so sparsity picks the retained terms per channel."
        />

        <p>
          Input constraints hold <em>by construction</em> through the projection{' '}
          <InlineMath math="\Pi_{\mathcal{U}}" />, while state constraints enter
          the loss as differentiable penalties. Training minimizes the
          finite-horizon predictive-control objective through the identified
          model, with an <InlineMath math="\ell_1" /> term on the policy
          coefficients:
        </p>

        <Equation
          math="\min_{\Xi_\pi} \; \frac{1}{m} \sum_{j=1}^{m} \Big( \sum_{t=1}^{N} \ell_{\mathrm{DPC}}(x_t, u_{t-1}, \psi_t) + \ell_N(x_N, \psi_N) \Big) + \lambda_\pi \lVert \Xi_\pi \rVert_1"
          caption="Subject to x_{t+1} = F_Ξ(x_t, u_t) and u_t = π(z_t)."
        />

        <p>
          One subtlety makes this trainable. The exact derivative of the
          piecewise-affine projection annihilates the sensitivity of every
          saturated channel, so a surrogate is needed on the backward pass. With
          a band half-width <InlineMath math="b_i" /> and leak{' '}
          <InlineMath math="\epsilon" />:
        </p>

        <Equation
          math="\gamma^{\epsilon}_i = \begin{cases} 1, & v_i \in \mathcal{V}_i \\ \epsilon, & v_i \notin \mathcal{V}_i \end{cases}"
          caption="The forward pass evaluates the true saturated closed loop; only the gradient is relaxed."
        />

        <p>
          The two extremes both fail. At <InlineMath math="\epsilon = 0" /> a
          coefficient feeding a saturated channel receives no gradient and only
          shrinks, so thresholding acts on stale evidence; at{' '}
          <InlineMath math="\epsilon = 1" /> a deeply saturated channel exerts
          influence through a sensitivity the plant does not have.
        </p>
      </Section>

      <Section eyebrow="Guarantees" title="What the sparse structure buys">
        <p>
          Because the policy is a finite sum of known functions, properties that
          need semidefinite relaxations or products of layer norms for a deep
          network can be read straight off the retained coefficients.
        </p>

        <EquationGroup
          items={[
            {
              math: 'L_\\pi := \\Big( \\sum_{j=1}^{n_u} \\big( \\sum_{i \\in \\mathcal{S}_j} |\\Xi_{\\pi,ij}| \\, L_i \\big)^2 \\Big)^{1/2}',
              label: 'Lipschitz bound from the retained coefficients alone'
            },
            {
              math: '\\lVert \\pi(x,\\psi) - \\tilde{\\pi}(x,\\psi) \\rVert \\le B_\\Theta \\, \\tau_\\pi \\sqrt{q}',
              label: 'Effect of pruning q coefficients below the threshold'
            },
            {
              math: '\\lVert x_t - \\tilde{x}_t \\rVert \\le (\\delta + L_u \\varepsilon_\\pi) \\sum_{s=0}^{t-1} a^s, \\qquad a := L_x + L_u L_\\pi',
              label: 'Trajectory deviation under policy or model perturbation'
            }
          ]}
        />

        <p>
          In practice the certificate is tight enough to be useful: against
          automatic differentiation on a dense grid, the bound is conservative by
          a factor of at most <strong className="text-heading">1.7</strong>.
          Training also terminates provably — a pruned coefficient is never
          retained again, so the support stabilizes after finitely many changes.
        </p>
      </Section>

      <Section eyebrow="Experiments" title="Three benchmarks, one procedure">
        <p>
          SD-DPC was evaluated on constrained reference tracking of a cascaded
          two-tank system, stabilization of a forced Van der Pol oscillator at
          its unstable origin, and a 2-D integrator reaching task with a circular
          obstacle. All policies train on rollouts of the identified model and
          are then evaluated on the <em>true</em> plants, so the reported numbers
          include model mismatch.
        </p>

        <p>
          Three baselines: an IPOPT benchmark with exact model knowledge that
          solves each scenario online, NN-DPC (a two-layer MLP, the standard DPC
          parameterization), and NN-Distilled — a sparse policy regressed onto
          NN-DPC&apos;s actions using exactly the terms SD-DPC retained. The last
          one is the controlled comparison: same support, different training
          objective.
        </p>

        <DataTable
          caption="Identification and policy training parameters for the three case studies."
          columns={trainingColumns}
          rows={trainingRows}
        />
      </Section>

      <Section eyebrow="Results" title="Closed-loop evaluation on the true plants">
        <p>
          Across all three systems the sparse policy evaluates in{' '}
          <strong className="text-heading">17 µs</strong> and occupies under{' '}
          <strong className="text-heading">0.1 kB</strong> — roughly two orders
          of magnitude less memory than NN-DPC, and far below the 18–26 MiB each
          IPOPT solve allocates. All figures below are means ± standard
          deviations over 500 held-out scenarios.
        </p>

        <DataTable
          caption="Two-tank system: constrained reference tracking over 1000 steps."
          columns={resultColumns}
          rows={tankRows}
        />

        <p>
          On the two-tank system SD-DPC retains six terms and tracks about{' '}
          <strong className="text-heading">twelve times</strong> more accurately
          than NN-DPC — the sparse parameterization costs nothing in accuracy
          here. The distilled policy, on the same six terms, carries a steady
          offset and lands at seventeen times SD-DPC&apos;s loss.
        </p>

        <DataTable
          caption="Forced Van der Pol oscillator: stabilization at the unstable origin."
          columns={resultColumns}
          rows={vdpRows}
        />

        <p>
          Here SD-DPC is comparable to NN-DPC rather than better — what the
          sparse parameterization adds is structure. The learned policy is three
          terms long:
        </p>

        <Equation
          math="v(x) = \kappa_1 x_1 + \kappa_2 x_2 + \kappa_3 x_1^2 x_2, \qquad \kappa = (-0.9873,\; -2.8860,\; 0.2716)"
          caption="The complete learned feedback law for the Van der Pol oscillator."
        />

        <p>
          That is short enough to analyse by hand. Taking{' '}
          <InlineMath math="V = \tfrac{1}{2}(1-\kappa_1)x_1^2 + \tfrac{1}{2}x_2^2" />{' '}
          gives{' '}
          <InlineMath math="\dot{V} = (\mu + \kappa_2)x_2^2 - (\mu - \kappa_3)x_1^2 x_2^2 \le 0" />{' '}
          whenever <InlineMath math="\kappa_1 < 1" />,{' '}
          <InlineMath math="\kappa_2 < -\mu" />, and{' '}
          <InlineMath math="\kappa_3 \le \mu" /> — conditions the learned
          coefficients satisfy. The origin of the unsaturated closed loop is
          therefore globally asymptotically stable, proved directly from the
          learned numbers.
        </p>

        <DataTable
          caption="2-D integrator with obstacle avoidance. NN-Distilled violates the obstacle constraint in most scenarios."
          columns={resultColumns}
          rows={intRows}
        />

        <p>
          This case is the argument for training in closed loop. SD-DPC steers
          around the obstacle from every sampled initial condition with
          cumulative control effort within{' '}
          <strong className="text-heading">0.6%</strong> of the IPOPT minimum.
          The distilled policy — identical terms, fitted to a near-optimal
          teacher — violates the obstacle in{' '}
          <strong className="text-heading">60.8%</strong> of scenarios, to a
          depth of 1.61.
        </p>

        <p>
          The perturbation bound explains why. The imitation error is at most
          0.08 on states the teacher visits, but reaches 0.35 on states the{' '}
          <em>student</em> visits. For the bound to certify that the student
          inherits the teacher&apos;s constraint satisfaction, the teacher would
          need a margin of about 1.05 — and the near-optimal teacher clears the
          obstacle by only 0.06. Nothing absorbs the imitation error.
        </p>

        <Figure
          src="/projects/sddpc-evaluation.png"
          alt="Closed-loop trajectories of SD-DPC, NN-DPC, NN-Distilled and the IPOPT benchmark across the three case studies, with the retained SD-DPC policy coefficients"
          caption="Closed-loop trajectories of all four controllers on (a) the two-tank system, (b) the forced Van der Pol oscillator, and (c) the 2-D integrator with obstacle avoidance, alongside the SD-DPC coefficients retained in each channel."
          contain
          zoomable
          zoomHref="/projects/sddpc-evaluation.pdf"
        />
      </Section>

      <Section eyebrow="Next" title="Where this goes">
        <p>
          Constraint satisfaction is currently promoted through penalties and
          verified empirically. The natural continuation is to exploit the
          symbolic structure for stronger guarantees: hard feasibility through
          safety filters, systematic region-of-attraction certification,
          robustness bounds under identification error, and conditions under
          which sparsification provably preserves stability — plus noisy data,
          library mismatch, and online adaptation of the retained coefficients
          after deployment.
        </p>

        <p className="text-sm text-muted">
          With Ján Drgoňa (Johns Hopkins University). Implemented in NeuroMANCER
          v1.5.3; all computation on a MacBook with an Apple M1 and 8 GB of RAM.
          Supported by the U.S. DOE Office of Science, ASCR, under the SciDAC
          Institute &ldquo;LEADS: LEarning-Accelerated Domain Science&rdquo;.
        </p>
      </Section>
    </ProjectLayout>
  )
}
