/**
 * The SD-DPC closed loop, in the browser.
 *
 * A trained SD-DPC policy is u = Pi_U(Theta(z) Xi): a short sum of known
 * functions of the state and reference, projected onto the input box. Because
 * that is all it is, the exported coefficients (src/data/sddpc-policies.json)
 * plus the plant equations below are the entire controller -- there is nothing
 * to download and no endpoint to call, which is also the paper's point.
 *
 * The plants here are the *true* ones the paper evaluates on, not the SINDy
 * models the policies were trained against, so what you see on screen includes
 * the model mismatch.
 */

/** Factors appearing in the dictionary libraries, in their exported spelling. */
const FACTOR = [
  // sin(k·x0), cos(2·r1), ...
  {
    re: /^(sin|cos)\((\d+)·([xr])(\d+)\)$/,
    build: ([, fn, freq, kind, index]) => {
      const trig = fn === 'sin' ? Math.sin : Math.cos
      const k = Number(freq)
      const i = Number(index)
      return (x, r) => trig(k * (kind === 'x' ? x[i] : r[i]))
    }
  },
  {
    re: /^sqrt\(([xr])(\d+)\)$/,
    // The two-tank levels are non-negative, but a transient can dip a hair
    // below zero; clamp exactly as the torch plant does.
    build: ([, kind, index]) => {
      const i = Number(index)
      return (x, r) => Math.sqrt(Math.max(kind === 'x' ? x[i] : r[i], 0))
    }
  },
  {
    re: /^([xr])(\d+)(?:\^(\d+))?$/,
    build: ([, kind, index, power]) => {
      const i = Number(index)
      const p = power ? Number(power) : 1
      if (p === 1) return (x, r) => (kind === 'x' ? x[i] : r[i])
      return (x, r) => (kind === 'x' ? x[i] : r[i]) ** p
    }
  },
  { re: /^1$/, build: () => () => 1 }
]

function compileFactor(text) {
  for (const { re, build } of FACTOR) {
    const match = re.exec(text)
    if (match) return build(match)
  }
  throw new Error(`Unrecognized dictionary factor: "${text}"`)
}

/** Compile one library term, e.g. "x0^2*x1" or "cos(2·r0)", into f(x, r). */
export function compileTerm(term) {
  const factors = term.split('*').map((part) => compileFactor(part.trim()))
  if (factors.length === 1) return factors[0]
  return (x, r) => factors.reduce((acc, f) => acc * f(x, r), 1)
}

const clamp = (value, lo, hi) => (value < lo ? lo : value > hi ? hi : value)

/**
 * Build the policy for a case. Returns u (projected), the raw pre-projection
 * value, and each term's signed contribution per channel -- the contributions
 * are what the panel animates under the equation.
 */
export function makePolicy(spec) {
  const basis = spec.terms.map(compileTerm)

  return function policy(x, r) {
    const contributions = []
    const raw = new Array(spec.nu).fill(0)

    for (let t = 0; t < basis.length; t += 1) {
      const value = basis[t](x, r)
      const row = spec.coefficients[t]
      const perChannel = new Array(spec.nu)
      for (let i = 0; i < spec.nu; i += 1) {
        perChannel[i] = row[i] * value
        raw[i] += perChannel[i]
      }
      contributions.push(perChannel)
    }

    const u = raw.map((value) => clamp(value, spec.umin, spec.umax))
    return { u, raw, contributions }
  }
}

/** Continuous-time vector fields / discrete maps of the true plants. */
const PLANTS = {
  twotank: ({ c1, c2 }) => (x, u) => {
    const sx1 = Math.sqrt(Math.max(x[0], 1e-12))
    const sx2 = Math.sqrt(Math.max(x[1], 1e-12))
    return [c1 * (1 - u[1]) * u[0] - c2 * sx1, c1 * u[1] * u[0] + c2 * sx1 - c2 * sx2]
  },
  vanderpol: ({ mu }) => (x, u) => [x[1], mu * (1 - x[0] ** 2) * x[1] - x[0] + u[0]],
  double_integrator: ({ A, B }) => (x, u) => [
    A[0][0] * x[0] + A[0][1] * x[1] + B[0][0] * u[0] + B[0][1] * u[1],
    A[1][0] * x[0] + A[1][1] * x[1] + B[1][0] * u[0] + B[1][1] * u[1]
  ]
}

function rk4Step(ode, x, u, ts) {
  const add = (a, b, s) => a.map((value, i) => value + s * b[i])
  const k1 = ode(x, u)
  const k2 = ode(add(x, k1, 0.5 * ts), u)
  const k3 = ode(add(x, k2, 0.5 * ts), u)
  const k4 = ode(add(x, k3, ts), u)
  return x.map((value, i) => value + (ts / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]))
}

/** One closed-loop step: evaluate the policy, then advance the true plant. */
export function makeStepper(spec) {
  const policy = makePolicy(spec)
  const ode = PLANTS[spec.plant](spec.params)
  const step = spec.discrete
    ? (x, u) => ode(x, u)
    : (x, u) => rk4Step(ode, x, u, spec.ts)

  return function closedLoopStep(x, r) {
    const action = policy(x, r)
    return { ...action, next: step(x, action.u) }
  }
}

/** Signed obstacle distance: h < 0 is inside the keep-out region. */
export function obstacleH(obstacle, x) {
  if (!obstacle) return null
  const { b, p, c, d, theta } = obstacle
  const ct = Math.cos(theta)
  const st = Math.sin(theta)
  const dx = x[0] - c
  const dy = x[1] - d
  const xr = ct * dx + st * dy
  const yr = -st * dx + ct * dy
  return b * xr ** 2 + yr ** 2 - (p / 2) ** 2
}

/**
 * The reference the policy sees at step k.
 *
 * The two-tank case follows the paper's piecewise-constant command: `ref` holds
 * one setpoint per `segment`-step stretch. Everywhere else the reference is
 * constant (or, for Van der Pol, absent -- the task is regulation to zero).
 */
export function refAt(spec, ref, k) {
  if (!spec.segment) return ref
  const index = Math.min(Math.floor(k / spec.segment), ref.length - 1)
  return [ref[index]]
}

/** The target the states are measured against at step k. */
function targetAt(spec, ref, k, nx) {
  if (spec.nref === 0) return new Array(nx).fill(0)
  if (spec.nref === 1) return new Array(nx).fill(refAt(spec, ref, k)[0])
  return ref
}

/**
 * Roll the closed loop out for the whole episode. Fast enough (a thousand
 * steps of arithmetic over a couple of dozen terms) to redo on every slider
 * move.
 */
export function simulate(spec, x0, ref) {
  const step = makeStepper(spec)
  const states = [x0.slice()]
  const inputs = []
  const contributions = []
  const saturated = []
  const references = []

  let x = x0.slice()
  let trackingLoss = 0
  let boxViolations = 0
  let obstacleViolations = 0
  let worstDepth = 0
  let minMargin = Infinity

  for (let k = 0; k < spec.steps; k += 1) {
    const rk = refAt(spec, ref, k)
    references.push(targetAt(spec, ref, k, spec.nx))
    const { u, raw, contributions: terms, next } = step(x, rk)
    inputs.push(u)
    contributions.push(terms)
    saturated.push(u.map((value, i) => Math.abs(value - raw[i]) > 1e-9))

    x = next
    states.push(x.slice())

    // Tracking error against whichever reference the case defines: the current
    // setpoint for the two-tank, the origin for Van der Pol, the target point
    // for the integrator.
    const target = references[k]
    trackingLoss += x.reduce((acc, value, i) => acc + (value - target[i]) ** 2, 0)

    if (x.some((value) => value < spec.xmin - 1e-9 || value > spec.xmax + 1e-9)) {
      boxViolations += 1
    }
    const h = obstacleH(spec.obstacle, x)
    if (h !== null) minMargin = Math.min(minMargin, h)
    if (h !== null && h < 0) {
      obstacleViolations += 1
      worstDepth = Math.max(worstDepth, -h)
    }
  }

  const finalTarget = references[references.length - 1]
  const finalError = Math.sqrt(
    x.reduce((acc, value, i) => acc + (value - finalTarget[i]) ** 2, 0)
  )

  return {
    states,
    inputs,
    contributions,
    saturated,
    references,
    trackingLoss: trackingLoss / spec.steps,
    finalError,
    boxViolations,
    obstacleViolations,
    worstDepth,
    // The closest the trajectory ever came to the keep-out region: negative
    // means it went in.
    minMargin: Number.isFinite(minMargin) ? minMargin : null
  }
}

/** Bytes of coefficients actually retained -- float32, as the paper counts it. */
export function policyBytes(spec) {
  const retained = spec.coefficients.reduce(
    (acc, row) => acc + row.filter((value) => value !== 0).length,
    0
  )
  return retained * 4
}
