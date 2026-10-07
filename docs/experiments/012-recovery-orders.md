# Experiment 012 — Automatic recovery orders

## Hypothesis and implementation

Repeat orders stop on defeat, requiring manual farming and frontier resumption. Add an optional policy after the first Gatekeeper: when automatic frontier orders fail, farm at 80% of deepest depth, skipping Gatekeeper depths, for 5/10/20 victories, then retry. Each fight still uses the same engine and rewards. Failure in the recovery farm stops automation. Manual recall, changing orders, disabling repeats or disabling recovery cancels the queued plan. Default behavior remains stop-on-defeat for legacy and new saves. Recovery choices remain visible; no facilities are purchased automatically.

## Method and results

`node tools/recovery-study.js` runs 30 seeds per duration/order: 240 scenarios. Each balanced opening clears depth 5 through normal combat, then runs one or four hours unattended with no facility purchases, equipment or recruit changes. Complete saves round-trip. Duration begins after opening preparation.

| Duration / recovery victories | Mean depth | Mean victories | Mean defeats | Mean Gold | Active orders |
| --- | --- | --- | --- | --- | --- |
| 1 hour / disabled | 28.8 | 28.8 | 1.0 | 1,883.1 | 0/30 |
| 1 hour / 5 | 95.6 | 232.3 | 27.6 | 40,652.5 | 30/30 |
| 1 hour / 10 | 103.5 | 269.8 | 17.1 | 50,229.4 | 30/30 |
| 1 hour / 20 | 108.9 | 302.3 | 9.9 | 57,888.0 | 30/30 |
| 4 hours / disabled | 28.8 | 28.8 | 1.0 | 1,883.1 | 0/30 |
| 4 hours / 5 | 207.5 | 781.7 | 115.0 | 269,181.9 | 30/30 |
| 4 hours / 10 | 229.5 | 924.3 | 69.8 | 348,045.1 | 30/30 |
| 4 hours / 20 | 245.1 | 1,030.3 | 39.6 | 407,843.6 | 30/30 |

Longer recovery farming buys more XP before retrying and reduces time spent losing in these uninvested samples. Shorter orders retry sooner; this experiment does not establish their value with prepared parties or manual investment. Keep the configurable policy; no balance values changed. The player still chooses party, gear and investments before/after absence.

## Validation

92 tests pass, including frontier defeat scheduling, exact victory counts, returning to push, farm failure stop, cancellation paths, legacy migration, malformed queues and live/offline parity. Recovery farm inputs are fixed while a queue is active; change Orders to cancel before editing. Return summaries distinguish continuing automatic orders from a stopped party. Browser runtime verification is recorded in the development log.
