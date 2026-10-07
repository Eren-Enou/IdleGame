# Experiment 001 — Opening progression

Date: 2026-10-06. Engine baseline: first playable slice.

Objective: verify the opening can advance and that Guild investment changes outcomes. Conditions: 200 seeds per policy, a guardian/ranger/cleric party, auto-push, up to 3,600 simulation seconds. Training and infirmary policies buy their respective upgrade whenever affordable. No fourth slot, farming, or manual intervention.

Method: `npm run simulate`, deterministic one-second engine. All 50 opening seeds in the test suite also cleared the first Gatekeeper.

| Investment | Minimum depth | Mean depth | Maximum depth | Mean seconds | Defeats |
| --- | ---: | ---: | ---: | ---: | ---: |
| None | 44 | 56.1 | 59 | 526.1 | 200/200 |
| Training | 338 | 354.5 | 372 | 3600 | 0/200 |
| Infirmary | 119 | 149 | 204 | 2137.2 | 200/200 |

Interpretation: the loop works; investment visibly extends capability. Training has much greater leverage because it also scales shields and healing and shortens exposure to enemy attacks. This is evidence of unequal investment value, not evidence that the game is enjoyable. The early game reaches multiple Strata too quickly for a player to notice their identity, and repeated Strata currently only scale numerically.

Follow-up: inspect pacing and party diversity. Favor clearer mechanical challenges and delayed ability openings before adding classes or currencies. Preserve this baseline for comparison. Do not silently overwrite experiment results.
