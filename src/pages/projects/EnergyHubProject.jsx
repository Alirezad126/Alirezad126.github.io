import DataTable from '../../components/DataTable'
import { Equation, EquationGroup, InlineMath } from '../../components/Math'
import ProjectLayout, {
  Figure,
  InfoGrid,
  Section
} from '../../components/ProjectLayout'

const tags = [
  'Safe Reinforcement Learning',
  'Constrained MDP',
  'Energy Systems',
  'MILP',
  'PyTorch'
]

const spaceColumns = [
  { key: 'symbol', label: 'Symbol', mono: true },
  { key: 'meaning', label: 'Meaning' },
  { key: 'range', label: 'Range', align: 'right', mono: true }
]

const actionRows = [
  { key: 'caes', symbol: 'P_CAES', meaning: 'Storage power, negative while charging', range: '[-1, 1]' },
  { key: 'hp', symbol: 'P_HP', meaning: 'Heat pump power, negative while cooling', range: '[-1, 1]' },
  { key: 'mt', symbol: 'P_MT', meaning: 'Micro turbine electrical output', range: '[0, 1]' },
  { key: 'ac', symbol: 'H_AC', meaning: 'Heat drawn by the absorption chiller', range: '[0, 1]' },
  { key: 'gb', symbol: 'H_GB', meaning: 'Gas boiler heat output', range: '[0, 1]' },
  { key: 'ratio', symbol: 'r_CAES', meaning: 'Share of storage by-product heat or cold recovered', range: '[0, 1]' }
]

const costColumns = [
  { key: 'index', label: 'Cost', align: 'right', mono: true },
  { key: 'constraint', label: 'Constraint' },
  { key: 'signal', label: 'Violation signal' }
]

const costRows = [
  {
    key: 'c1',
    index: 'C₁',
    constraint: 'Storage remains within its pressure band',
    signal: 'Distance of the state of charge outside [0.2, 0.9]'
  },
  {
    key: 'c2',
    index: 'C₂',
    constraint: 'Grid exchange within the connection rating',
    signal: 'Power beyond ±2000 kW'
  },
  {
    key: 'c3',
    index: 'C₃',
    constraint: 'Cooling demand met exactly',
    signal: 'Absolute mismatch between cooling supply and load'
  },
  {
    key: 'c4',
    index: 'C₄',
    constraint: 'Heating demand met exactly',
    signal: 'Absolute mismatch between heating supply and load'
  }
]

export default function EnergyHubProject() {
  return (
    <ProjectLayout
      eyebrow="M.A.Sc. Thesis"
      title="Optimal Dispatch of an Energy Hub with Compressed Air Energy Storage"
      summary="A real-time dispatch controller for a trigenerative energy hub, formulated as a constrained Markov decision process. Operational limits are priced by learned dual variables rather than hand-tuned reward penalties, and a MILP solved under perfect foresight provides the expert demonstrations from which the policy is initialised."
      tags={tags}
      links={[
        {
          href: 'https://doi.org/10.1016/j.est.2022.106147',
          label: 'Read the paper'
        },
        {
          href: 'https://github.com/Alirezad126/PD-DDPGfD',
          label: 'View code',
          kind: 'github'
        },
        {
          href: 'https://spectrum.library.concordia.ca/id/eprint/992037/',
          label: 'Full thesis'
        }
      ]}
      figure={{
        src: '/projects/energy-hub-schematic.svg',
        alt: 'Energy hub schematic showing the micro turbine, gas boiler, grid, renewables, AA-CAES, heat pump and absorption chiller feeding the electricity, heating and cooling networks',
        caption: 'Structure of the energy hub: four supply networks, seven conversion and storage units, and three demands to be met at every hour.',
        contain: true
      }}
    >
      <InfoGrid
        items={[
          {
            title: 'Problem',
            text: 'Day-ahead schedules become suboptimal as soon as renewable generation or demand deviates from forecast. Reinforcement learning adapts in real time, but a learned policy has no explicit representation of operational limits.'
          },
          {
            title: 'Method',
            text: 'Constraints are excluded from the reward and assigned individual cost critics, each priced by a dual variable updated through projected gradient ascent. The policy is initialised by behavioural cloning of a MILP solution.'
          },
          {
            title: 'Result',
            text: 'Daily operational cost within 2.7% of the MILP optimum obtained under perfect foresight, with constraint violations reduced to near zero and the storage unit still actively cycled.'
          }
        ]}
      />

      <Section
        eyebrow="Motivation"
        title="Limitations of penalty-based constraint handling"
      >
        <p>
          The hub couples four energy networks. Natural gas supplies a micro
          turbine and a gas boiler, the grid and the renewable units supply the
          electrical bus, and the heating and cooling demands are met by a
          combination of recovered turbine heat, boiler output, heat pump output,
          absorption chiller output and storage by-product selected by the
          controller. The three carriers must balance at every hour, the storage
          unit must remain within its pressure band and return to its initial
          level at the end of the horizon, and the grid connection is bounded by
          its rating.
        </p>

        <p>
          An exact solution requires perfect foresight of load and weather. A
          mixed integer linear program yields the cost-optimal schedule for a day
          whose realisations are known in advance, which provides an appropriate
          benchmark but not a controller. Reinforcement learning yields a
          controller, but operational limits are conventionally imposed by
          folding violations into the reward as weighted penalty terms. This
          embeds the cost-versus-safety trade-off in scalar weights that must be
          tuned manually, and provides no guarantee in either direction.
          Increasing the weights leads the agent to preserve feasibility by
          leaving the storage idle, whereas decreasing them leads it to reduce
          cost at the expense of the heating balance.
        </p>
      </Section>

      <Section
        eyebrow="Formulation"
        title="Dispatch as a constrained Markov decision process"
      >
        <p>
          Instead of a single scalar reward, the formulation separates the
          objective from the operational limits. The agent minimises the
          expected discounted operational cost subject to four expected
          constraint costs remaining below their respective tolerances:
        </p>

        <Equation
          math="\min_{\pi}\; \mathbb{E}_{\pi}\!\left[\sum_{t=0}^{T} \gamma^{t} c(s_t, a_t)\right] \quad \text{subject to} \quad \mathbb{E}_{\pi}\!\left[\sum_{t=0}^{T} \gamma^{t} c_i(s_t, a_t)\right] \le d_i, \quad i = 1, \dots, 4"
          caption="The constrained Markov decision process. Each tolerance d_i is a physical quantity, not a tuning weight."
        />

        <p>
          The stage cost <InlineMath math="c(s_t, a_t)" /> is the hourly
          operating expenditure: imported electricity at the time-of-use tariff,
          exported electricity credited at half that tariff, and natural gas
          consumed by the turbine and the boiler at their respective
          efficiencies.
        </p>

        <Equation
          math="c(s_t, a_t) = \pi^{\mathrm{el}}_t P^{\mathrm{grid}}_t + \pi^{\mathrm{gas}} \left( \frac{P^{\mathrm{MT}}_t}{\eta_{\mathrm{MT}}} + \frac{H^{\mathrm{GB}}_t}{\eta_{\mathrm{GB}}} \right)"
          caption="Hourly operational cost. The reward is its negative."
        />

        <p>
          The state comprises nine normalised signals and the action specifies
          six setpoints. Storage power and heat pump power are signed, since
          each unit operates in one of two opposing modes, and the actor
          therefore applies a tanh output head to those two components and a
          sigmoid head to the remaining four.
        </p>

        <DataTable
          caption="Action space. One decision per unit, plus the recovery ratio for the storage by-product."
          columns={spaceColumns}
          rows={actionRows}
        />

        <DataTable
          caption="The four constraint costs, each tracked by its own critic."
          columns={costColumns}
          rows={costRows}
        />
      </Section>

      <Section
        eyebrow="Method"
        title="Primal-dual optimisation of the constraint prices"
      >
        <p>
          The Lagrangian of the constrained program augments the objective with
          each constraint cost, weighted by an associated dual variable. The
          actor maximises this combination, and the dual variables are learned
          rather than prescribed:
        </p>

        <EquationGroup
          items={[
            {
              math: "\\mathcal{L}(\\theta, \\lambda) = Q_\\phi\\big(s, \\mu_\\theta(s)\\big) - \\sum_{i=1}^{4} \\lambda_i\\, C_{\\psi_i}\\big(s, \\mu_\\theta(s)\\big) - \\alpha \\left\\lVert a^{\\mathrm{expert}} - \\mu_\\theta(s) \\right\\rVert^2",
              label: 'Actor objective: value, minus the priced constraint costs, minus the distance to the expert action.'
            },
            {
              math: "\\lambda_i \\leftarrow \\max\\Big(0,\\; \\lambda_i + \\beta \\big( C_{\\psi_i}(s, \\mu_\\theta(s)) - d_i \\big)\\Big)",
              label: 'Dual ascent, projected onto the non-negative reals.'
            }
          ]}
        />

        <p>
          The second expression governs the safety behaviour. A constraint
          satisfied by the current policy yields a negative gradient, so its
          price decays towards zero and ceases to distort the objective. A
          violated constraint yields a positive gradient, so its price increases
          at every update until satisfying the constraint is less costly than
          violating it. No quantity is tuned manually apart from the dual step
          size, and each limit converges to its own weight.
        </p>

        <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <Figure
            src="/projects/energy-hub-lambdas.svg"
            alt="Dual variables over training, showing the heating and cooling prices rising while the grid price stays at zero"
            contain
          />

          <p className="text-muted">
            Evolution of the dual variables during training. The heating and
            cooling prices increase because those constraints are active at
            every hour, the storage price settles at a low value once the policy
            learns to respect the pressure band, and the grid price remains at
            zero because the connection rating is never approached. This
            ordering was not specified in advance: it reflects the relative
            difficulty of the four constraints as determined during training.
          </p>
        </div>

        <p>
          The remaining updates follow DDPG. Four cost critics are trained
          alongside the reward critic on the same mini-batches, each regressing
          its own one-step target, and the actor together with all five target
          networks is updated at a lower frequency through Polyak averaging.
        </p>

        <EquationGroup
          items={[
            {
              math: "y^{Q} = r + \\gamma\\,(1 - \\text{done})\\; Q_{\\phi'}\\big(s', \\mu_{\\theta'}(s')\\big)",
              label: 'Reward critic target.'
            },
            {
              math: "y^{C}_i = c_i + \\gamma\\,(1 - \\text{done})\\; C_{\\psi_i'}\\big(s', \\mu_{\\theta'}(s')\\big)",
              label: 'Cost critic target, one per constraint.'
            }
          ]}
        />
      </Section>

      <Section
        eyebrow="Demonstrations"
        title="Expert demonstrations from a MILP benchmark"
      >
        <p>
          Unguided exploration of this action space is impractical. The majority
          of randomly sampled dispatches violate the heating balance, so the
          early reward signal is dominated by constraint violations and the
          agent converges to a local optimum in which the storage unit is never
          used. This is addressed by providing a baseline solution.
        </p>

        <p>
          A mixed integer linear program is solved in Pyomo for each of the 292
          training days, with binary variables for the on and off states and for
          the mutually exclusive operating modes, yielding the cost-optimal
          dispatch under perfect foresight. These trajectories are then used in
          three ways: they pre-train the actor through behavioural cloning, they
          occupy a protected block at the head of the replay buffer that the
          write pointer cannot overwrite, and they enter every mini-batch
          through the regression term in the actor objective.
        </p>

        <Figure
          src="/projects/energy-hub-agent.svg"
          alt="PD-DDPGfD architecture: four cost networks, an actor network and a critic network exchanging batches with a replay buffer seeded by a MILP solver"
          caption="Architecture of the proposed agent. The MILP supplies both the pre-training stage and the protected block of the replay memory."
          contain
          zoomable
        />
      </Section>

      <Section
        eyebrow="Storage model"
        title="Off-design modelling of the storage unit"
      >
        <p>
          Representing the storage unit by a fixed round-trip efficiency
          overstates its contribution, since compressor and expander
          efficiencies degrade considerably away from the design point. The unit
          is therefore modelled through its part-load characteristics.
          Isentropic efficiencies and expander pressure ratios are expressed as
          polynomial fits in load percentage, and the complete thermodynamic
          chain of two compression stages with intercooling and two reheated
          expansion stages is derived from them.
        </p>

        <p>
          The air tank is treated as a constant-temperature volume, so the
          pressure follows directly from the mass balance:
        </p>

        <Equation
          math="p_{t+1} = \frac{R\,T_{\mathrm{tank}}}{V_{\mathrm{tank}}}\left( \frac{p_t V_{\mathrm{tank}}}{R\,T_{\mathrm{tank}}} + \big( \dot{m}^{\mathrm{ch}}_t - \dot{m}^{\mathrm{dch}}_t \big)\, \Delta t \right)"
          caption="Tank pressure update over a one-hour step."
        />

        <p>
          The off-design model returns these mass flow rates as nonlinear
          functions of power, which the MILP formulation cannot accommodate.
          They are linearised over the full operating range before entering the
          solver, which retains the benchmark within the mixed integer linear
          class while preserving the relevant part-load behaviour. The training
          environment employs the same linear fits, so the controller and the
          benchmark are evaluated under identical physical assumptions.
        </p>
      </Section>

      <Section
        eyebrow="Results"
        title="Comparison against the benchmark and baselines"
      >
        <p>
          The proposed method is compared against standard DDPG, DDPG from
          demonstrations, the primal-dual agent without demonstrations, and the
          MILP solution under perfect foresight. The relevant criterion is not
          which method attains the lowest cost, since the MILP does so by
          construction, but which method approaches the MILP while maintaining
          low constraint violation.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <Figure
            src="/projects/energy-hub-cost.svg"
            alt="Average daily operational cost over training for DDPG, PD-DDPG, DDPGfD and PD-DDPGfD against the MILP, behavioural cloning and SVR baselines"
            caption="Average daily operational cost through training."
            contain
            zoomable
          />

          <Figure
            src="/projects/energy-hub-violation.svg"
            alt="Average daily constraint violation over training, broken down into state of charge, grid, heating and cooling"
            caption="Average daily constraint violation, split by constraint."
            contain
            zoomable
          />
        </div>

        <p>
          The agents initialised without demonstrations exhibit a pronounced
          early transient and subsequently plateau well above the benchmark. The
          two agents that use demonstrations begin close to the benchmark and
          remain there, converging to within 2.7% of the MILP optimum, and they
          outperform both the behavioural cloning policy from which they were
          initialised and the regression baseline.
        </p>

        <p>
          The ability to report violations per constraint follows directly from
          the formulation. A single aggregate penalty term would have reduced
          these four curves to one quantity, obscuring the observation that the
          heating balance is the binding constraint while the grid rating is
          never approached.
        </p>
      </Section>

      <Section eyebrow="Conclusions" title="Conclusions and subsequent work">
        <p>
          The principal contribution of this work is not specific to the energy
          hub considered. Separating the constraints from the objective, and
          allowing a dual variable to determine the price of each, removes an
          entire layer of manual tuning and renders the resulting behaviour
          interpretable, since the constraints that actively restrict the policy
          can be identified directly from the learned prices. This formulation
          informed subsequent work on building control and on sparse predictive
          control policies.
        </p>

        <p>
          The implementation, comprising the MILP, the off-design storage model,
          the training environment and the agent, is available on{' '}
          <a
            href="https://github.com/Alirezad126/PD-DDPGfD"
            target="_blank"
            rel="noreferrer"
            className="focus-ring font-medium text-accent hover:underline"
          >
            GitHub
          </a>
          .
        </p>
      </Section>

      <Section eyebrow="Publication" title="Journal of Energy Storage">
        <p>
          Alireza Daneshvar Garmroodi, Fuzhan Nasiri and Fariborz Haghighat.{' '}
          <em>
            Optimal dispatch of an energy hub with compressed air energy
            storage: A safe reinforcement learning approach.
          </em>{' '}
          Journal of Energy Storage, volume 57, page 106147, 2023.
        </p>
      </Section>
    </ProjectLayout>
  )
}
