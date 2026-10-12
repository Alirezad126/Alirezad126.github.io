import DataTable from '../../components/DataTable'
import { Equation, EquationGroup, InlineMath } from '../../components/Math'
import ProjectLayout, {
  Figure,
  InfoGrid,
  Section
} from '../../components/ProjectLayout'

const tags = [
  'Classification',
  'scikit-learn',
  'Feature Importance',
  'pandas',
  'Python'
]

const faults = [
  {
    key: 'od-stuck',
    component: 'Outdoor air damper',
    mode: 'Stuck',
    cases: 'Fully open (100%), partially open (50%)',
    ids: 'F1 – F2'
  },
  {
    key: 'od-leak',
    component: 'Outdoor air damper',
    mode: 'Leaking',
    cases: '20% and 50% of max damper flow',
    ids: 'F3 – F4'
  },
  {
    key: 'hc-stuck',
    component: 'Heating coil valve',
    mode: 'Stuck',
    cases: 'Fully closed, fully open, partially open (50%)',
    ids: 'F5 – F7'
  },
  {
    key: 'hc-leak',
    component: 'Heating coil valve',
    mode: 'Leaking',
    cases: '5% and 40% of max coil valve',
    ids: 'F8 – F9'
  },
  {
    key: 'cc-stuck',
    component: 'Cooling coil valve',
    mode: 'Stuck',
    cases: 'Fully closed, fully open, partially open (50%)',
    ids: 'F10 – F12'
  },
  {
    key: 'cc-leak',
    component: 'Cooling coil valve',
    mode: 'Leaking',
    cases: '5% and 50% of max coil valve',
    ids: 'F13 – F14'
  },
  {
    key: 'uf',
    component: '—',
    mode: 'Unfaulted',
    cases: 'Normal operation',
    ids: 'UF'
  }
]

const hyperparameters = [
  {
    key: 'dt',
    method: 'Decision Tree (DT)',
    params: 'max_depth = 18, min_samples_leaf = 2, criterion = entropy'
  },
  {
    key: 'rf',
    method: 'Random Forest (RF)',
    params: 'max_depth = 20, n_estimators = 300, criterion = entropy'
  },
  {
    key: 'svc',
    method: 'Support Vector Classifier (SVC)',
    params: 'C = 1000, gamma = 10, kernel = rbf'
  },
  {
    key: 'knn',
    method: 'k-Nearest Neighbors (KNN)',
    params: 'n_neighbors = 3, weights = distance'
  },
  { key: 'gnb', method: 'Gaussian Naïve Bayes (GNB)', params: '—' }
]

const columns = [
  { key: 'method', label: 'Method' },
  { key: 'sv', label: 'Accuracy (SV)', align: 'right', mono: true },
  { key: 'cv', label: 'Accuracy (10-fold CV)', align: 'right', mono: true },
  { key: 'precision', label: 'Precision', align: 'right', mono: true },
  { key: 'recall', label: 'Recall', align: 'right', mono: true },
  { key: 'f1', label: 'F1', align: 'right', mono: true }
]

const fullResults = [
  { key: 'gnb', method: 'GNB', sv: '0.29', cv: '0.27', precision: '0.33', recall: '0.30', f1: '0.24' },
  { key: 'dt', method: 'DT', sv: '0.97', cv: '0.61', precision: '0.97', recall: '0.97', f1: '0.97' },
  { key: 'knn', method: 'KNN', sv: '0.99', cv: '0.72', precision: '0.98', recall: '0.98', f1: '0.98' },
  { key: 'rf', method: 'RF', sv: '0.99', cv: '0.70', precision: '0.99', recall: '0.99', f1: '0.99' },
  { key: 'svc', method: 'SVC', sv: '0.99', cv: '0.77', precision: '0.99', recall: '0.99', f1: '0.99', highlight: true }
]

const sampledResults = [
  { key: 'gnb', method: 'GNB', sv: '0.16', cv: '0.15', precision: '0.24', recall: '0.29', f1: '0.19' },
  { key: 'dt', method: 'DT', sv: '0.90', cv: '0.73', precision: '0.83', recall: '0.83', f1: '0.82' },
  { key: 'knn', method: 'KNN', sv: '0.92', cv: '0.80', precision: '0.85', recall: '0.85', f1: '0.84' },
  { key: 'rf', method: 'RF', sv: '0.94', cv: '0.81', precision: '0.90', recall: '0.90', f1: '0.90' },
  { key: 'svc', method: 'SVC', sv: '0.95', cv: '0.88', precision: '0.92', recall: '0.90', f1: '0.90', highlight: true }
]

const featureScores = [
  { key: 'to', feature: 'Outdoor air temperature', score: '0.231' },
  { key: 'tm', feature: 'Mixed air temperature', score: '0.174' },
  { key: 'ts', feature: 'Supply air temperature', score: '0.174' },
  { key: 'tr', feature: 'Return air temperature', score: '0.169' },
  { key: 'ch', feature: 'Heating coil valve control signal', score: '0.070' },
  { key: 'hs', feature: 'Supply air temperature heating setpoint', score: '0.065' },
  { key: 'do', feature: 'Outdoor air damper control signal', score: '0.040' },
  { key: 'cs', feature: 'Supply air temperature cooling setpoint', score: '0.028' },
  { key: 'cc', feature: 'Cooling coil valve control signal', score: '0.015' },
  { key: 'oc', feature: 'Occupancy mode indicator', score: '0.014' },
  { key: 'dr', feature: 'Return air damper control signal', score: '0.007' },
  { key: 'de', feature: 'Exhaust air damper control signal', score: '0.006' },
  { key: 'fs', feature: 'Supply air fan status', score: '0.001' },
  { key: 'vs', feature: 'Supply air fan speed control signal', score: '0.000' }
]

export default function AhuFaultDetectionProject() {
  return (
    <ProjectLayout
      eyebrow="Data-Driven Diagnostics"
      title="Fault Detection and Diagnosis of an HVAC Air Handling Unit"
      summary="Fifteen-class fault diagnosis on a single-zone air handling unit, comparing five classifiers under grid-searched hyperparameters, 10-fold cross-validation, and two feature-importance strategies."
      tags={tags}
      figure={{
        src: '/projects/ahu-schematic.png',
        alt: 'Schematic diagram of the single-zone constant air volume air handling unit',
        caption:
          'The SZCAV air handling unit in the LBNL FLEXLAB facility, with every measured attribute mapped to its component.'
      }}
    >
      <InfoGrid
        items={[
          {
            title: 'Problem',
            text: 'HVAC uses 50–60% of building energy. Stuck dampers and leaking coil valves waste much of it, and go unnoticed until they become critical.'
          },
          {
            title: 'Method',
            text: 'Treat diagnosis as 15-class classification on 21,600 minute-resolution samples, and compare DT, RF, SVC, KNN, and GNB on identical splits.'
          },
          {
            title: 'Result',
            text: 'SVC reaches 0.77 mean accuracy under 10-fold CV and 0.88 on the rebalanced dataset — the strongest of the five on both.'
          }
        ]}
      />

      <Section eyebrow="Data" title="A single-zone AHU with fourteen injected faults">
        <p>
          The dataset is an experimental winter campaign on a single-zone
          constant air volume (SZCAV) air handling unit, run by Lawrence Berkeley
          National Laboratory in the FLEXLAB facility in California between 11
          March and 1 April 2017. It holds{' '}
          <strong className="text-heading">21,600 samples</strong> at one-minute
          resolution across{' '}
          <strong className="text-heading">15 attributes</strong> — air
          temperatures at four points in the unit, heating and cooling setpoints,
          fan status and speed, four damper and valve control signals, and an
          occupancy indicator.
        </p>

        <p>
          The shipped ground-truth column is binary: faulted or not. Since each
          fault was injected on a known date, I added a{' '}
          <em>type of fault</em> column with fifteen categories — fourteen fault
          classes plus the unfaulted class — which turns detection into diagnosis
          and, as a side effect, balances a dataset that was heavily skewed
          toward faulty samples.
        </p>

        <DataTable
          caption="The fourteen injected fault classes, by component and failure mode."
          columns={[
            { key: 'component', label: 'Component' },
            { key: 'mode', label: 'Mode' },
            { key: 'cases', label: 'Cases' },
            { key: 'ids', label: 'IDs', mono: true }
          ]}
          rows={faults}
        />

        <p>
          Cleaning was limited: the mixed air temperature attribute had 90
          missing values, filled forward with the last valid reading, and the
          datetime, boolean, and categorical columns were cast to their proper
          dtypes.
        </p>
      </Section>

      <Section eyebrow="Models" title="Five classifiers, one grid search">
        <p>
          Five classifiers were trained to predict the AHU condition: Decision
          Tree, Random Forest, Support Vector Classifier, k-Nearest Neighbors,
          and Gaussian Naïve Bayes. Rather than hand-tuning each, grid search
          with cross-validation selected the hyperparameters that maximise mean
          accuracy over the training split. KNN and GNB were given a
          MinMax-scaled copy of the data.
        </p>

        <DataTable
          caption="Hyperparameters selected by grid search for each classifier."
          columns={[
            { key: 'method', label: 'Method' },
            { key: 'params', label: 'Selected hyperparameters', mono: true }
          ]}
          rows={hyperparameters}
        />

        <p>
          One judgement call: grid search returned{' '}
          <InlineMath math="k = 1" /> for KNN. A single neighbour memorises the
          training set and an even <InlineMath math="k" /> invites ties, so{' '}
          <InlineMath math="k = 3" /> was used instead.
        </p>
      </Section>

      <Section eyebrow="Evaluation" title="How the models were scored">
        <p>
          With fifteen classes, a single accuracy number hides a lot. Each model
          was scored on accuracy, precision, recall, and F1, with all four
          averaged across the fifteen classes, plus a confusion matrix and
          per-class ROC curves. Writing{' '}
          <InlineMath math="\mathrm{TP}" />, <InlineMath math="\mathrm{FP}" />,{' '}
          <InlineMath math="\mathrm{TN}" />, and{' '}
          <InlineMath math="\mathrm{FN}" /> for the usual counts:
        </p>

        <EquationGroup
          items={[
            {
              math: '\\mathrm{Accuracy} = \\frac{\\mathrm{TP} + \\mathrm{TN}}{\\mathrm{TP} + \\mathrm{TN} + \\mathrm{FP} + \\mathrm{FN}}'
            },
            {
              math: '\\mathrm{Precision} = \\frac{\\mathrm{TP}}{\\mathrm{TP} + \\mathrm{FP}}, \\qquad \\mathrm{Recall} = \\frac{\\mathrm{TP}}{\\mathrm{TP} + \\mathrm{FN}}'
            },
            {
              math: 'F_1 = 2 \\cdot \\frac{\\mathrm{Precision} \\cdot \\mathrm{Recall}}{\\mathrm{Precision} + \\mathrm{Recall}}'
            }
          ]}
        />

        <p>
          Accuracy is reported twice: once on a single train/test split (SV), and
          once as the mean over{' '}
          <strong className="text-heading">10-fold cross-validation</strong>{' '}
          (CV), which passes through the whole dataset ten times:
        </p>

        <Equation
          math="\overline{\mathrm{Acc}}_{\mathrm{CV}} = \frac{1}{10} \sum_{i=1}^{10} \mathrm{Acc}_i"
          caption="Mean accuracy over the ten cross-validation folds."
        />

        <p>
          The gap between the two is the interesting part. A model that scores
          0.97 on one split and 0.61 across folds has learned the split, not the
          faults.
        </p>
      </Section>

      <Section eyebrow="Results" title="SVC is the most reliable classifier">
        <DataTable
          caption="Prediction performance on the full dataset. SV = single split, CV = 10-fold cross-validation."
          columns={columns}
          rows={fullResults}
        />

        <p>
          On a single split, SVC, RF, and KNN are indistinguishable at 0.99. The
          folds separate them: SVC holds{' '}
          <strong className="text-heading">0.77</strong> mean accuracy against
          0.72 for KNN, 0.70 for RF, and 0.61 for DT — the decision tree loses
          more than a third of its apparent accuracy. GNB fails outright at 0.27,
          which is expected: it assumes the attributes are conditionally
          independent, and in an air handling unit the four temperatures and the
          valve signals are anything but.
        </p>

        <Figure
          src="/projects/ahu-roc.jpg"
          alt="ROC curves for the five classifiers on fault class 4"
          caption="One-vs-rest ROC curves for class F4. RF and SVC reach AUC = 1.00, KNN 0.99, DT 0.98, GNB 0.84."
          contain
        />
      </Section>

      <Section eyebrow="Realism" title="Rebalancing toward normal operation">
        <p>
          The fifteen-class dataset is balanced, but it is not realistic: a real
          air handling unit runs unfaulted almost all of the time. Training on a
          dataset that is mostly faulty teaches a model the wrong prior. Two
          fixes were considered — adding noise to the unfaulted data to
          synthesise more of it, or down-sampling the faults. The first is
          delicate, since the attributes have very different operating ranges, so
          the second was used: 100 samples from each fault class against the
          1,440 real unfaulted points.
        </p>

        <DataTable
          caption="Prediction performance on the rebalanced dataset, where F1 is the criterion of interest."
          columns={columns}
          rows={sampledResults}
        />

        <p>
          Every model drops, which is the point — these numbers are the honest
          ones. SVC degrades least, improving to{' '}
          <strong className="text-heading">0.88</strong> mean CV accuracy with an
          F1 of 0.90, and RF stays close behind at 0.81 and 0.90.
        </p>
      </Section>

      <Section eyebrow="Feature importance" title="Which sensors actually matter">
        <p>
          Two ranking strategies were compared: linear correlation between
          features, dropping one of any pair outside{' '}
          <InlineMath math="[-0.6,\, 0.6]" />, and Random Forest&apos;s built-in
          importance, which averages how much each feature decreases split
          impurity across all trees.
        </p>

        <Figure
          src="/projects/ahu-correlation.jpg"
          alt="Correlation heat map between the fourteen input features"
          caption="Correlation between features. The return and exhaust air damper signals correlate at 1.0, so one can be dropped."
          contain
        />

        <DataTable
          caption="Random Forest feature importance scores for all fourteen input attributes."
          columns={[
            { key: 'feature', label: 'Feature' },
            { key: 'score', label: 'Score', align: 'right', mono: true }
          ]}
          rows={featureScores}
        />

        <p>
          The four air temperatures carry{' '}
          <strong className="text-heading">75%</strong> of the total importance,
          while the fan status and speed signals contribute essentially nothing.
          Removing the six least important features leaves accuracy unchanged;
          dropping six features by correlation instead caps accuracy at 0.71. RF
          weighting is the more reliable selector, and SVC is the model most
          sensitive to removing features at all — even strongly correlated ones.
        </p>

        <Figure
          src="/projects/ahu-feature-importance.jpg"
          alt="Accuracy against number of removed features, by correlation and by Random Forest importance"
          caption="Accuracy as features are removed, ranked by correlation (left) and by RF importance (right)."
          contain
        />

        <p>
          That result has a direct cost consequence: if six attributes can be
          dropped without losing accuracy, the sensors measuring them do not need
          to be installed for diagnosis.
        </p>
      </Section>

      <Section eyebrow="Limitations" title="What this does not yet cover">
        <p>
          The campaign is winter-only, so the models are untested in cooling
          season. The unit is single-zone and constant volume, while most real
          installations are multi-zone with variable air volume. And because an
          AHU cycles on and off, it spends much of its time in transient
          conditions that a steady-state classifier is not built to represent — a
          transient or hybrid model is the natural next step.
        </p>

        <p className="text-sm text-muted">
          CIVI 6731, Concordia University, Winter 2022. Team project with Mahdieh
          Adib, Elaheh Bazdar, Mozhdeh Bertina, and Erfan Shafiee Roudbari. Data:
          LBNL FLEXLAB fault synthesis inventory.
        </p>
      </Section>
    </ProjectLayout>
  )
}
