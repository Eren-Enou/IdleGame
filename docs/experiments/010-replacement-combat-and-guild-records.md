# Experiment 010 — Replacements in frontier combat

## Method

`node tools/replacement-study.js` reuses the mixed-investment recovery policy through `tools/journey-scenarios.js`. Thirty seeded journeys each run for 10 minutes, one hour or four hours. For each snapshot, generate a same-class candidate, test all three techniques for that class, and compare the original party, fresh replacement and paid mentored replacement. Veteran stays in the roster to provide mentorship. No equipment is equipped; training and infirmary purchases follow the earlier policy. This isolates experience costs, not optimal shopping.

Each comparison uses the same encounter RNG state. Test both the next frontier room and the next Gatekeeper. Gatekeeper tests hold current character levels/upgrades fixed and skip intervening rooms without granting their XP/rewards. Twelve of 30 early snapshots afford the hall and hire; all 30 later snapshots do. Outcomes compare only these eligible paired samples. Selecting a desired technique is assumed and search costs are omitted, making this optimistic access. The final pass resolves 3,888 bounded encounters and validates every terminal save.

## Results

| Snapshot / room / replacement | Original wins | Fresh wins | Mentored wins |
| --- | --- | --- | --- |
| 10 minutes / frontier / any class | 12/12 | 12/12 | 12/12 |
| 1 hour / frontier / any class | 30/30 | 20/30 | 30/30 |
| 1 hour / next Gatekeeper / guardian | 30/30 | 0/30 | 29/30 |
| 1 hour / next Gatekeeper / ranger or cleric | 30/30 | 1/30 | 30/30 |
| 4 hours / frontier / guardian | 30/30 | 18/30 | 25/30 |
| 4 hours / frontier / ranger | 30/30 | 21/30 | 23/30 |
| 4 hours / frontier / cleric | 30/30 | 18/30 | 24/30 |
| 4 hours / next Gatekeeper / guardian | 29/30 | 0/30 | 16/30 |
| 4 hours / next Gatekeeper / ranger | 29/30 | 5/30 | 12/30 |
| 4 hours / next Gatekeeper / cleric | 29/30 | 0/30 | 13/30 |

Technique changes affect duration but not win counts within these particular progression snapshots. Equal-level near-wall tests in experiments 008–009 remain the stronger evidence for build differences. Mentored entering levels average 14.7/90.5/194.1; total hall/hire/training spending averages 832.5/12,382.9/54,825 Gold among eligible cases. One-hour ranger Gatekeeper attempts average 110.6s fresh versus 49.0s mentored with the standard technique. Four-hour Guardian attempts last longer after training (72.4s versus 116.9s), partly because more survive long enough to win; mean duration includes losses.

## Interpretation and follow-up

Mentorship restores usable roster choices in these one-hour scenarios but is not guaranteed frontier power. Four-hour recruit gaps still require farming, saving or alternate equipment. Preserve veteran experience value and the service price until comparison against cheaper workshop spending provides better evidence. This study does not prove player enjoyment.

Added individual Guild records so level no longer stands in for earned accomplishments. Completed rooms record victories, failures, downings, Gatekeepers, deepest victory and effective contributions. Reserves, Gold training and recalls do not fabricate combat accomplishments. Legacy careers begin tracking known results with earlier history explicitly unavailable.

84 tests pass, including exact report-to-career attribution, farming/boss counts, failures, reserves/mentoring/recall exclusion, offline parity, joins, migration and invalid histories. Repeated experiment 009 after extracting the shared journey policy; original results remain identical.
