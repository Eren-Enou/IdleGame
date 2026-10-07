# Experiment 014 — Veteran progression and repeated content

Run: `node tools/veteran-study.js 20`. Full aggregates are in `014-veteran-results.json`.

Repeated all sixty journeys: identical aggregate output and another 240 validated save checkpoints.

Sixty seeded continuous 24-hour journeys use the real purchase, recruitment, equipment, order and save APIs. All start with Guardian/Ranger/Cleric, buy Training/Infirmary in balanced rank order, and enable ten-victory recovery at 80% frontier after depth 5. Four-member policies buy quarters and seek a second Ranger between fights. Ritual-four additionally commissions Ritual focus and equips the entire roster between fights. No mentorship, technique selection or later replacements are performed. Each journey round-trips the complete save at 1, 4, 8 and 24 hours: 240 validated checkpoints.

The study simulates a continuously present investment policy. The game does not automatically buy upgrades or recruits. Twenty-four hours is not a single supported offline absence; offline resolution remains capped at four hours. These are capability/pacing observations, not predictions of typical player behavior or enjoyment.

| Policy | Depth at 1h | Depth at 4h | Depth at 8h | Depth at 24h | 24h defeats | Mean time both combat facilities cap | Gold at 24h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Three members | 250.7 | 631.2 | 833.8 | 1,262.1 | 131.5 | None of 20 capped | 658,699 |
| Four members | 342.9 | 878.5 | 1,328.3 | 1,958.7 | 90.0 | 17.05h; 20/20 capped | 3,454,919 |
| Four with Ritual focus | 339.4 | 887.6 | 1,353.0 | 2,026.2 | 83.9 | 16.48h; 20/20 capped | 3,837,319 |

All orders remain active at checkpoints; all four-member scenarios recruit their fourth member; all ritual scenarios commission their pattern. The three-member cohort still has Training 19 and Infirmary 20 at 24 hours. Four-member cohorts go roughly seven hours without another combat-facility investment after their caps. This measures those two facilities, not every Guild purchase or use of Gold.

The stronger early limitation is repeated Delve content. Four-member cohorts complete a mean eleven full 30-depth region cycles in the first hour, before either combat facility caps. They revisit the same three hazards and Gatekeepers roughly 65–67 cycles by 24 hours. Existing class techniques, equipment and replacement recruitment provide build choices, but depth itself introduces no new region or mechanical challenge beyond depth 21. Raising numeric caps would not solve that earlier discovery gap.

## Decision

Keep current facility caps and prices for now. Prioritize a new Delve challenge that creates a distinct preparation problem and interacts with existing damage, ward, healing or status primitives. It should be communicated through the region description and reports, introduced after the existing three-region opening, and evaluated across multiple compositions/equipment choices. Revisit long-term investment after that content experiment. Do not assume Ritual focus is universally best from these three policies; earlier encounter matrices show matchup-dependent tradeoffs.

Candidate for the next experiment: a mirror-themed fourth stratum where direct hits return a fraction of effective damage to their attacker, while bleed avoids retaliation. This creates back-line pressure despite Guardian interception, gives personal wards and heal timing a purpose, and makes damage sources matter beyond throughput. Prototype through the existing hit/shield/contribution machinery; compare steel, ritual, standard/variant Rangers, and additional Clerics before choosing a retaliation fraction. Define lethal-hit timing explicitly and ensure a reflected downing cannot produce another basic attack in the same tick. This is an unimplemented hypothesis, not a balance decision.

Implementation review found region-count assumptions in enemy generation, preview Gatekeeper selection and report/save validation. A new stratum must update those together while retaining existing region indices and in-flight encounter snapshots. Historical reports must retain their recorded enemy, region and contributions. The current one-hour and day-long studies are the baseline for the experiment, not evergreen expectations after new hazards ship.

Human pacing and enjoyment remain unverified. This sample has only one fourth-member class, a fixed investment strategy and no technique selection. Preserve earlier experiments as observations of their recorded content version; a future region change will require fresh frontier and Gatekeeper regressions.
