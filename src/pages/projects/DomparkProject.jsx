import DataTable from '../../components/DataTable'
import { Equation, EquationGroup, InlineMath } from '../../components/Math'
import ProjectLayout, {
  Figure,
  InfoGrid,
  Section
} from '../../components/ProjectLayout'

const tags = [
  'Mathematical Programming',
  'MILP',
  'Pyomo',
  'Energy Systems',
  'Python'
]

const building = [
  { key: 'area', attribute: 'Floor area', value: '≈ 500,000 sq ft' },
  { key: 'type', attribute: 'Building type', value: 'Mixed use' },
  { key: 'year', attribute: 'Construction year', value: '1908' },
  { key: 'heating', attribute: 'Existing heating system', value: 'Steam boiler' },
  { key: 'canal', attribute: 'Distance to the canal', value: '90 – 95 m' },
  { key: 'orient', attribute: 'Orientation', value: 'North-east' },
  { key: 'context', attribute: 'Surrounding neighbourhood', value: 'Residential' }
]

const scenarios = [
  {
    key: 's1',
    scenario: 'Scenario 1',
    assets: 'Gas boiler + grid',
    role: 'Baseline — the system as built, heat from gas, electricity from Hydro-Québec.'
  },
  {
    key: 's2',
    scenario: 'Scenario 2',
    assets: 'Grid + heat pump',
    role: 'Electrifies heating and removes on-site combustion.'
  },
  {
    key: 's3',
    scenario: 'Scenario 3',
    assets: 'Grid + heat pump + TES',
    role: 'Adds thermal storage, so heat production can move away from expensive hours.'
  },
  {
    key: 's4',
    scenario: 'Scenario 4',
    assets: 'Grid + heat pump + PV + TES',
    role: 'Adds on-site generation that the schedule has to absorb or export.'
  },
  {
    key: 's5',
    scenario: 'Scenario 5',
    assets: 'Grid + heat pump + PV + TES + battery',
    role: 'Adds electrical storage, giving the schedule a second degree of freedom.'
  }
]

export default function DomparkProject() {
  return (
    <ProjectLayout
      eyebrow="Urban Energy Systems"
      title="Operational Cost Optimization of the Dompark Complex Energy System"
      summary="A mathematical program for the energy supply of a 500,000 sq ft mixed-use complex in Montreal, extended with EV charging demand and solved over a full year of hourly load data to compare five candidate system configurations."
      tags={tags}
      figure={{
        src: '/projects/dompark-building.jpg',
        alt: 'The Dompark complex beside the Lachine Canal in Montreal',
        caption:
          'The Dompark complex (former Mount Royal Spinning Mill) on the Lachine Canal, Montreal.'
      }}
    >
      <InfoGrid
        items={[
          {
            title: 'Problem',
            text: 'A century-old mixed-use complex on steam heat has to add EV charging. Which supply configuration costs least to run over a year?'
          },
          {
            title: 'Method',
            text: 'Model the hourly electricity and heating demand, then pose the dispatch of each candidate configuration as a MILP scheduling problem in Pyomo.'
          },
          {
            title: 'Outcome',
            text: 'Five configurations optimized over 8,760 hours, giving a quantitative basis for choosing how to supply the complex.'
          }
        ]}
      />

      <Section eyebrow="Case study" title="The Dompark complex, Montreal">
        <p>
          Dompark is a 1908 mixed-use complex on the Lachine Canal in Montreal —
          the former Mount Royal Spinning Mill — heated today by a steam boiler
          system. Its size and age make it a useful test case: the loads are
          large, the heating system is a candidate for electrification, and the
          site is adding electric-vehicle charging, which changes the shape of
          the electrical load rather than just its magnitude.
        </p>

        <DataTable
          caption="Case study characteristics of the Dompark complex."
          columns={[
            { key: 'attribute', label: 'Attribute' },
            { key: 'value', label: 'Value' }
          ]}
          rows={building}
        />
      </Section>

      <Section eyebrow="Approach" title="From demand to a comparable set of scenarios">
        <p>
          The study runs in four stages: establish the available energy sources,
          build an hourly demand profile for the complex, evaluate each candidate
          configuration as a scheduling problem, and compare the results on
          operating cost, investment cost, and emissions.
        </p>

        <Figure
          src="/projects/dompark-framework.png"
          alt="Four-stage framework: energy sources, energy demand, scenario evaluation, results"
          caption="The study framework, from supply options through to the compared results."
          contain
        />
      </Section>

      <Section eyebrow="Demand model" title="Modelling the EV charging stations">
        <p>
          The charging load was built from the bottom up rather than taken as a
          fixed profile. A base daily charging pattern was generated per station,
          noise was added across stations and again across days so that no two
          days repeat exactly, and the stations were then summed to a single
          site-level profile for each day of the year.
        </p>

        <Figure
          src="/projects/dompark-ev-demand.jpg"
          alt="Hourly electricity demand of the charging stations over a full year"
          caption="Hourly electricity demand of the EV charging stations across 8,760 hours."
          contain
        />

        <p>
          Appliance and lighting demand for the offices was modelled separately.
          Its weekday-shaped profile and the summer drop in occupancy give the
          combined electrical load a very different character from the charging
          load, which matters once storage is introduced and the optimizer can
          choose <em>when</em> to meet demand.
        </p>

        <Figure
          src="/projects/dompark-electricity-demand.jpg"
          alt="Hourly electricity consumption of appliances and lighting over a year"
          caption="Appliance and lighting electricity consumption across the year."
          contain
        />
      </Section>

      <Section eyebrow="Formulation" title="The scheduling problem">
        <p>
          Each configuration becomes a mixed-integer linear program over the
          hours <InlineMath math="t \in \{1,\dots,8760\}" />. The decision
          variables are the output of every unit in each hour: grid import{' '}
          <InlineMath math="P^{\mathrm{grid}}_t" />, gas-boiler heat{' '}
          <InlineMath math="Q^{\mathrm{GB}}_t" />, heat-pump heat{' '}
          <InlineMath math="Q^{\mathrm{HP}}_t" />, PV generation{' '}
          <InlineMath math="P^{\mathrm{PV}}_t" />, and the charge and discharge of
          the thermal and electrical stores.
        </p>

        <p>
          The objective minimizes the cost of energy bought over the year — grid
          electricity at the Hydro-Québec tariff{' '}
          <InlineMath math="c^{\mathrm{el}}_t" /> and natural gas at{' '}
          <InlineMath math="c^{\mathrm{gas}}_t" />:
        </p>

        <Equation
          math="\min \; \sum_{t=1}^{8760} \Big( c^{\mathrm{el}}_t\, P^{\mathrm{grid}}_t + c^{\mathrm{gas}}_t\, F^{\mathrm{gas}}_t \Big)"
          caption="Annual operating cost of the complex."
        />

        <p>
          Three families of constraints make the schedule physical. The
          electrical and thermal balances must hold in every hour, each unit is
          bounded by its installed capacity, and the state of charge of each
          store carries energy between hours subject to its own efficiency and
          capacity limits:
        </p>

        <EquationGroup
          items={[
            {
              math: 'P^{\\mathrm{grid}}_t + P^{\\mathrm{PV}}_t + P^{\\mathrm{bat,dis}}_t = P^{\\mathrm{load}}_t + P^{\\mathrm{EV}}_t + P^{\\mathrm{HP}}_t + P^{\\mathrm{bat,ch}}_t',
              label: 'Electrical balance in every hour t'
            },
            {
              math: 'Q^{\\mathrm{GB}}_t + Q^{\\mathrm{HP}}_t + Q^{\\mathrm{TES,dis}}_t = Q^{\\mathrm{load}}_t + Q^{\\mathrm{TES,ch}}_t',
              label: 'Heat balance in every hour t'
            },
            {
              math: '0 \\le X_t \\le \\overline{X}, \\qquad X \\in \\{P^{\\mathrm{grid}}, Q^{\\mathrm{GB}}, Q^{\\mathrm{HP}}, P^{\\mathrm{PV}}\\}',
              label: 'Equipment capacity limits'
            },
            {
              math: 'E_{t+1} = E_t + \\eta^{\\mathrm{ch}} X^{\\mathrm{ch}}_t - \\frac{X^{\\mathrm{dis}}_t}{\\eta^{\\mathrm{dis}}}, \\qquad \\underline{E} \\le E_t \\le \\overline{E}',
              label: 'State of charge of the thermal and electrical stores'
            }
          ]}
        />

        <p>
          The heat pump couples the two balances: it consumes electricity{' '}
          <InlineMath math="P^{\mathrm{HP}}_t" /> to deliver heat{' '}
          <InlineMath math="Q^{\mathrm{HP}}_t = \mathrm{COP}_t \, P^{\mathrm{HP}}_t" />
          , with a coefficient of performance that follows Montreal&apos;s hourly
          outdoor temperature — so the configuration is cheapest to run exactly
          when the building needs the least heat.
        </p>
      </Section>

      <Section eyebrow="Scenarios" title="Five configurations, one model">
        <p>
          Every scenario reuses the same demand profiles and the same objective;
          only the set of available units changes. That keeps the comparison
          honest — a difference in annual cost comes from the configuration, not
          from a different model.
        </p>

        <DataTable
          caption="The five candidate energy-system configurations evaluated over a full year."
          columns={[
            { key: 'scenario', label: 'Scenario' },
            { key: 'assets', label: 'Equipment' },
            { key: 'role', label: 'What it adds' }
          ]}
          rows={scenarios}
        />
      </Section>

      <Section eyebrow="Status" title="What was delivered, and what comes next">
        <p>
          The completed work covers the modelling chain end to end: EV charging
          consumption for every day of the year, the electricity and heating
          demand of the complex, a year of Montreal weather data, and the MILP
          formulation of the scheduling problem for each configuration.
        </p>

        <p>
          The remaining steps are economic rather than structural — collecting
          investment costs for the equipment in each scenario, and scoring the
          configurations on operating cost, investment cost, and CO₂ emissions
          together rather than on operating cost alone.
        </p>

        <p className="text-sm text-muted">
          Summer Course 2022 on Urban Energy Systems, Concordia University, under
          Prof. Ursula Eicker. Joint work with Alireza Adli, Honeyeh Fakhri, and
          Mehdi Shamshirband.
        </p>
      </Section>
    </ProjectLayout>
  )
}
