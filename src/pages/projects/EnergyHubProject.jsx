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
    constraint: 'Storage stays inside its pressure band',
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
      summary="A real-time dispatch controller for a trigenerative energy hub, trained as a constrained Markov decision process. Operational limits are priced by learned dual variables instead of hand-tuned reward penalties, and a MILP solved under perfect foresight supplies the expert demonstrations the policy starts from."
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
        caption: 'The hub: four supply networks, seven units, three demands to satisfy every hour.',
        contain: true
      }}
    >
      <InfoGrid
        items={[
          {
            title: 'Problem',
            text: 'Day-ahead schedules go stale as soon as renewable output or demand deviates. Reinforcement learning adapts in real time, but a learned controller has no notion of a hard limit.'
          },
          {
            title: 'Method',
            text: 'Keep constraints out of the reward. Give each one its own cost critic and a dual variable that learns its price, and start from a policy cloned off a MILP solution.'
          },
            {
            title: 'Result',
            text: 'Daily operational cost within 2.7% of the MILP optimum under perfect foresight, with violations driven to near zero and the storage still actively cycled.'
          }
        ]}
      />

      <Section eyebrow="Motivation" title="Why penalty terms were not good enough">
        <p>
          The hub couples four networks. Natural gas feeds a micro turbine and a
          gas boiler, the grid and the renewables feed the electrical bus, and
          the heating and cooling demands are served by whatever combination of
          recovered turbine heat, boiler output, heat pump, absorption chiller
          and storage by-product the controller picks. Electricity, heat and
          cold all have to balance at every hour, the storage has to stay inside
          its pressure band and come back to its starting level by midnight, and
          the grid connection has a rating.
        </p>

        <p>
          Solving this exactly needs perfect foresight of load and weather. A
          mixed integer program gives the cost-optimal schedule for a day whose
          data you already know, which is the right benchmark but not a
          controller. Reinforcement learning gives a controller, but the usual
          way to teach it about limits is to fold violations into the reward as
          weighted penalties. That buries a cost-versus-safety trade-off inside
          scalar weights you then have to tune by hand, and gives no guarantee
          in either direction. Push the weights up and the agent hoards
          feasibility by leaving the storage idle. Push them down and it saves
          money by breaking the heat balance.
        </p>
      </Section>

      <Section eyebrow="Formulation" title="Dispatch as a constrained MDP">
        <p>
          Rather than one scalar reward, the problem keeps the objective and the
          limits apart. The agent minimises the expected discounted operational
          cost subject to four expected constraint costs staying under their
          tolerances:
        </p>

        <Equation
          math="\min_{\pi}\; \mathbb{E}_{\pi}\!\left[\sum_{t=0}^{T} \gamma^{t} c(s_t, a_t)\right] \quad \text{subject to} \quad \mathbb{E}_{\pi}\!\left[\sum_{t=0}^{T} \gamma^{t} c_i(s_t, a_t)\right] \le d_i, \quad i = 1, \dots, 4"
          caption="The constrained Markov decision process. Each tolerance d_i is a physical quantity, not a tuning weight."
        />

        <p>
          The stage cost <InlineMath math="c(s_t, a_t)" /> is the hourly bill:
          imported electricity at the time-of-use tariff, exported electricity
          credited at half that price, and gas for the turbine and the boiler at
          their respective efficiencies.
        </p>

        <Equation
          math="c(s_t, a_t) = \pi^{\mathrm{el}}_t P^{\mathrm{grid}}_t + \pi^{\mathrm{gas}} \left( \frac{P^{\mathrm{MT}}_t}{\eta_{\mathrm{MT}}} + \frac{H^{\mathrm{GB}}_t}{\eta_{\mathrm{GB}}} \right)"
          caption="Hourly operational cost. The reward is its negative."
        />

        <p>
          The state carries nine normalised signals, and the action sets six
          setpoints. Storage power and heat pump power are signed, since the
          same unit either charges or discharges and either heats or cools, so
          the actor uses a tanh head for those two and a sigmoid head for the
          other four.
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

      <Section eyebrow="Method" title="Learning the price of each constraint">
        <p>
          The Lagrangian of the constrained program adds every constraint cost
          to the objective, weighted by its own dual variable. The actor
          maximises that combination, and the duals are themselves learned
          rather than set:
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
          The second line is where the safety behaviour comes from. A constraint
          that the current policy satisfies has a negative gradient, so its
          price decays towards zero and stops distorting the objective. A
          constraint that is being violated has a positive gradient, so its
          price climbs every update until respecting it is cheaper than paying
          for it. Nothing is tuned by hand except the dual step size, and each
          limit finds its own weight.
        </p>

        <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <Figure
            src="/projects/energy-hub-lambdas.svg"
            alt="Dual variables over training, showing the heating and cooling prices rising while the grid price stays at zero"
            contain
          />

          <p className="text-muted">
            The duals in training. Heating and cooling grow expensive because
            they bind at every hour, the storage price settles low once the
            policy learns to respect the pressure band, and the grid price never
            leaves zero because the connection rating is never approached. None
            of that ordering was specified in advance. It is what the four
            constraints turned out to be worth.
          </p>
        </div>

        <p>
          The rest follows DDPG. Four cost critics are trained alongside the
          reward critic on the same batches, each regressing its own one-step
          target, and the actor and all five target networks are updated at a
          slower cadence by Polyak averaging.
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

      <Section eyebrow="Demonstrations" title="Starting from a solver instead of from noise">
        <p>
          Exploring this action space from scratch is hopeless. Most random
          dispatches break the heat balance, so the early reward signal is
          dominated by violations and the agent settles into a local optimum
          where it simply never uses the storage. The fix is to hand it a
          baseline.
        </p>

        <p>
          A MILP is solved in Pyomo for each of the 292 training days, with
          binaries for the on and off states and the mutually exclusive modes,
          giving the cost-optimal dispatch under perfect foresight. Those
          trajectories are then used three times over. They pre-train the actor
          by behavioural cloning, they are written into the first block of the
          replay buffer where the write pointer can never overwrite them, and
          they appear in every batch through the regression term in the actor
          objective.
        </p>

        <Figure
          src="/projects/energy-hub-agent.svg"
          alt="PD-DDPGfD architecture: four cost networks, an actor network and a critic network exchanging batches with a replay buffer seeded by a MILP solver"
          caption="The full agent. The MILP feeds both the pre-training stage and the protected block of the replay memory."
          contain
          zoomable
        />
      </Section>

      <Section eyebrow="Storage model" title="Part load matters more than it looks">
        <p>
          Treating the storage as a fixed round-trip efficiency over-states what
          it can contribute, because compressor and expander efficiency fall off
          sharply away from the design point. The unit here is modelled through
          its part-load curves instead. Isentropic efficiencies and expander
          pressure ratios are polynomial fits in load percentage, and the full
          thermodynamic chain of two compression stages with intercooling and
          two reheated expansion stages is built on top of them.
        </p>

        <p>
          The tank is a constant-temperature volume, so pressure follows from
          the air mass balance alone:
        </p>

        <Equation
          math="p_{t+1} = \frac{R\,T_{\mathrm{tank}}}{V_{\mathrm{tank}}}\left( \frac{p_t V_{\mathrm{tank}}}{R\,T_{\mathrm{tank}}} + \big( \dot{m}^{\mathrm{ch}}_t - \dot{m}^{\mathrm{dch}}_t \big)\, \Delta t \right)"
          caption="Tank pressure update over a one-hour step."
        />

        <p>
          Those mass flow rates come out of the off-design model as nonlinear
          functions of power, which the MILP cannot take. They are linearised
          over the whole operating range before the solver sees them, which
          keeps the benchmark inside the mixed integer linear class while
          preserving the part-load behaviour that matters. The environment the
          agent trains against uses the same linear fits, so the controller and
          the benchmark are judged on the same physics.
        </p>
      </Section>

      <Section eyebrow="Results" title="Near the benchmark, without trading away safety">
        <p>
          The comparison runs against plain DDPG, against DDPG from
          demonstrations, against the primal-dual agent without demonstrations,
          and against the MILP under perfect foresight. The interesting question
          is not which one gets the lowest cost, since the MILP wins that by
          construction. It is which one gets close to the MILP while keeping its
          violations down.
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
          The agents that start cold spike early and then plateau well above the
          benchmark. The two that use demonstrations start close to it and stay
          there, landing within 2.7% of the MILP optimum, and they beat both the
          behavioural cloning policy they were initialised from and the
          regression baseline.
        </p>

        <p>
          Reporting violations per constraint is a direct consequence of the
          formulation. A single penalty term would have collapsed these four
          curves into one number, hiding the fact that the heating balance is
          the one doing the work and the grid rating is never close to binding.
        </p>
      </Section>

      <Section eyebrow="Takeaway" title="What transferred">
        <p>
          The useful part of this work was not the specific hub. It was that
          separating constraints from the objective, and letting a dual variable
          discover what each one is worth, removes an entire layer of
          hand-tuning and makes the resulting behaviour inspectable. You can
          read off which limits the policy is actually fighting against. That
          idea carried directly into my later work on building control and on
          sparse predictive control policies.
        </p>

        <p>
          The code, including the MILP, the off-design storage model, the
          environment and the agent, is on{' '}
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
