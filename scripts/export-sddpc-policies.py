#!/usr/bin/env python3
"""Export the trained SD-DPC policies to JSON for the in-browser demo.

The whole point of SD-DPC is that a policy is a short sum of known functions, so
the "model" the browser needs is a handful of coefficients -- no PyTorch, no
inference endpoint. This reads the retained coefficients straight out of the
evaluation artefacts and writes them next to a description of each plant, which
src/lib/sddpc.js then integrates in the page.

Usage:
    python3 scripts/export-sddpc-policies.py [RESULTS_ACC_DIR]

RESULTS_ACC_DIR defaults to the sibling SD-DPC checkout's results_ACC directory.
The generated file is committed, so this only needs re-running when the policies
are retrained.
"""
from __future__ import annotations

import csv
import json
import sys
from pathlib import Path

DEFAULT_RESULTS = (
    Path(__file__).resolve().parents[2] / "gpt_SparseDPC" / "results_ACC"
)
OUT = Path(__file__).resolve().parents[1] / "src" / "data" / "sddpc-policies.json"

# Everything that is not a learned coefficient: the true plants the policies are
# evaluated on, their constraints, and sensible slider ranges for the demo.
# Mirrors sdpc.systems.{twotank,vanderpol,double_integrator}.
CASES = {
    "twotank": {
        "dir": "TwoTank",
        "label": "Two-tank",
        "blurb": "Constrained reference tracking. Two cascaded tanks; the policy "
        "drives both levels to a commanded setpoint without overfilling.",
        "plant": "twotank",
        "params": {"c1": 0.08, "c2": 0.04},
        "nx": 2,
        "nu": 2,
        "ts": 1.0,
        "discrete": False,
        "umin": 0.0,
        "umax": 1.0,
        "xmin": 0.0,
        "xmax": 1.0,
        "stateNames": ["x₁ (tank 1 level)", "x₂ (tank 2 level)"],
        "inputNames": ["u₁ (pump)", "u₂ (valve)"],
        "refNames": ["r (setpoint)"],
        "nref": 1,
        # Fig. 7(a): 1000 steps with the setpoint stepping every 250.
        "steps": 1000,
        "segment": 250,
        "initial": {"x": [0.4, 0.2], "r": [0.1, 0.8, 0.25, 0.5]},
        # Training sampled x0 and the setpoint uniformly from the unit box, so
        # those boxes are also what the demo is allowed to offer.
        "view": [0.0, 1.05],
        "x0Box": [[0.0, 1.0], [0.0, 1.0]],
        "refBox": [[0.05, 0.95]],
        "layout": "timeseries",
        "plotAxes": [0, 1],
    },
    "vanderpol": {
        "dir": "VanDerPol",
        "label": "Van der Pol",
        "blurb": "Stabilization at the unstable origin of a forced Van der Pol "
        "oscillator. Three terms, and the Lyapunov argument is in the paper.",
        "plant": "vanderpol",
        "params": {"mu": 1.0},
        "nx": 2,
        "nu": 1,
        "ts": 0.1,
        "discrete": False,
        "umin": -5.0,
        "umax": 5.0,
        "xmin": -5.0,
        "xmax": 5.0,
        "stateNames": ["x₁ (position)", "x₂ (velocity)"],
        "inputNames": ["u (force)"],
        "refNames": [],
        "nref": 0,
        "steps": 300,
        "segment": 0,
        "initial": {"x": [2.0, 2.0], "r": []},
        # cfg xmin_data / xmax_data: the box the policy was trained over.
        "view": [-4.0, 4.0],
        "x0Box": [[-4.0, 4.0], [-4.0, 4.0]],
        "refBox": [],
        "layout": "timeseries",
        "plotAxes": [0, 1],
    },
    "double_integrator": {
        "dir": "DoubleIntegrator",
        "label": "2-D integrator",
        "blurb": "Reach a target while avoiding a circular keep-out region. The "
        "distilled policy with the same terms violates it in 60.8% of scenarios.",
        "plant": "double_integrator",
        "params": {
            "A": [[1.0, 0.0], [0.0, 1.0]],
            "B": [[1.0, 0.0], [0.0, 1.0]],
        },
        "nx": 2,
        "nu": 2,
        "ts": 1.0,
        "discrete": True,
        "umin": -1.0,
        "umax": 1.0,
        "xmin": -5.0,
        "xmax": 5.0,
        "stateNames": ["x₁", "x₂"],
        "inputNames": ["u₁", "u₂"],
        "refNames": ["r₁", "r₂"],
        "nref": 2,
        "steps": 100,
        "segment": 0,
        # init_center (3, -3) / ref_center (-3, 3), both with side 2.0, from the
        # run config. The policy was only ever trained on these two squares, so
        # the demo offers exactly them -- outside, it is being asked for
        # something it never learned and the obstacle is not guaranteed.
        "initial": {"x": [2.5, -2.2], "r": [-2.5, 2.5]},
        "view": [-4.5, 4.5],
        "x0Box": [[2.0, 4.0], [-4.0, -2.0]],
        "refBox": [[-4.0, -2.0], [2.0, 4.0]],
        "layout": "statespace",
        "plotAxes": [0, 1],
        # h(x) = b*x1^2 + x2^2 - (p/2)^2, safe = outside. See
        # sdpc.safety.specs.rotated_ellipse_constraint and the run config.
        "obstacle": {"b": 1.0, "p": 3.0, "c": 0.0, "d": 0.0, "theta": 0.0},
    },
}


def read_coefficients(case_dir: Path) -> tuple[list[str], list[list[float]]]:
    """Return (term names, coefficients[term][input]) for one case study."""
    path = case_dir / "selected_policy" / "coefficients.csv"
    with path.open(newline="") as handle:
        rows = list(csv.DictReader(handle))

    inputs = [key for key in rows[0] if key.startswith("u") and key != "u"]
    inputs.sort(key=lambda key: int(key[1:]))

    # The whole library is kept, pruned rows included: the coefficient table in
    # the demo is the paper's, where the zeros are the point being made.
    terms = [row["term"] for row in rows]
    coefficients = [[float(row[key]) for key in inputs] for row in rows]
    return terms, coefficients


def main() -> int:
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_RESULTS
    if not root.is_dir():
        print(f"results_ACC directory not found: {root}", file=sys.stderr)
        return 1

    cases = []
    for key, spec in CASES.items():
        case_dir = root / spec["dir"]
        terms, coefficients = read_coefficients(case_dir)
        pretty = (case_dir / "selected_policy" / "sparse_policy.txt").read_text().strip()

        case = {k: v for k, v in spec.items() if k != "dir"}
        case["key"] = key
        case["terms"] = terms
        case["coefficients"] = coefficients
        case["policyText"] = pretty.splitlines()
        cases.append(case)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"cases": cases}, indent=2) + "\n")
    print(f"wrote {OUT.relative_to(OUT.parents[2])}")
    for case in cases:
        retained = sum(1 for row in case["coefficients"] if any(row))
        print(f"  {case['key']}: {retained} retained of {len(case['terms'])} library terms")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
