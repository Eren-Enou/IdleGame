# Experiment 021 — Discovery opportunity cost and Ranger techniques

Keep the Cartography/Dawn prices and combat values from experiment 020. The new studies compare actual funded progression and alternative existing equipment, rather than granting a blueprint or arbitrary extra Gold and calling the price affordable.

`node tools/discovery-economy-study.js` produces `021-discovery-economy-results.json`. Sixty seeded opening Guilds use three starting adventurers, commission both original patterns, equip Ranger steel/support ritual, invest in Training/Infirmary and enable ten-win 80% recovery. Stop each at its first depth-50 victory. These actively managed policies reach the checkpoint in 480–534 seconds, with level 22, facility ranks 6/6 and 993 Gold. No resources or characters are injected. This is a capable three-person cohort, not every possible player's depth-50 state.

Clone each checkpoint into seven purchase/equipment policies, for ten minutes and one hour (840 final saves). Facilities keeps buying ranks. Ritual Ranger makes a free existing-equipment switch. Dawn Ranger/Guardian buy the desk, survey, commission and equip the named role. Dawn unused pays/searches/commissions without equipping, isolating the general survey/reward investment from using the item. Fourth Warden/Cleric buys quarters/hall, uses actual applicants and paid refreshes at 120-second intervals, reserves quoted hire/mentorship costs, mentors between fights and equips existing ritual. Selected capability policies defer facility spending until their purchase sequence completes; then all resume balanced investment and pushing/recovery. Survey failure is not silently retried into a fabricated discovery. Every final save round-trips.

| Policy | Mean depth after 10m | Mean depth after 1h | Mean capability spending at 1h | Mean completion time |
| --- | ---: | ---: | ---: | ---: |
| Facilities | 97.87 | 270.62 | 0 | 0s |
| Existing ritual Ranger | 97.68 | 275.02 | 0 | 0s |
| Dawn Ranger | 103.27 | 292.40 | 1,950 | 54.92s |
| Dawn Guardian | 97.75 | 276.93 | 1,950 | 54.92s |
| Dawn unused | 96.07 | 270.05 | 1,950 | 54.92s |
| Fourth Warden | 99.93 | 284.50 | 1,606.72 | 145.97s |
| Fourth Cleric | 102.35 | 289.97 | 1,047.27 | 13.38s |

All Dawn policies complete purchases from earned resources; Dawn Ranger is deeper than facilities in all sixty pairs at both durations. Fourth Cleric is a strong cheaper alternative; Warden recruitment sometimes takes longer (58/60 complete within ten minutes, all within an hour). No continuation defeats occur in this strong cohort. Sources share levels/ranks/Gold because their first fifty rooms yield identical rewards; talent/origin/timing differ. Recruitment and differing fight lengths change later RNG consumption and progression, so these are deterministic policy comparisons, not fixed-seed individual combat attribution. Facility spending is excluded from the capability-spending column but remains reflected in terminal ranks/Gold. Mean completion times only include completed sequences. No mechanical changes are justified solely by these policies, and they do not establish unattended player behavior or enjoyment.

`node tools/dawn-technique-study.js` produces `021-dawn-technique-results.json`: 21,600 paired encounters (three compositions, depths 55/65/75, levels 12/16/20/24/28, standard/Quick barbed shot/Deep barbs, four gear choices, forty seeds). Only the first Ranger's technique/equipment varies; other Rangers use steel and support uses ritual, with facility ranks 2/2. Every final save validates. This intentionally fixed-strength stress cohort differs from the well-invested journey cohort.

Across 135 composition/depth/level/technique groups, Dawn has more wins than the best existing choice in ten, fewer in six, and equal wins in 119. Equal wins do not imply equal time, damage or cost. At level 20 depth 55 in Guardian/Ranger/Cleric: standard Dawn wins 11/40 versus zero for all older gear; Quick-shot Dawn wins 3/40 versus ritual 12/40, and Deep-barbs Dawn wins 5/40 versus ritual 13/40. At level 20 depth 65 in Guardian/Ranger/Cleric/Warden, standard Dawn wins 40/40 versus ritual 39/40. Dawn helps some opening/sustain sequences but is not universally best even for Rangers. Most cohorts are far from a narrow success threshold and tie; these are sample outcomes, not significance claims.

The economic/UI consequence is clearer commitment information, not a speculative discount: Cartography now displays the separate 1,200-Gold commission and 1,950-Gold total before purchase. The workshop displays the commission cost while its blueprint remains locked. Values come from current content definitions. Current Guild saves/equipment remain unchanged. Browser verifies the full cost text and no console warnings/errors. All 157 existing tests pass; the UI copy change does not need a redundant implementation-shaped test.

Next: deepen the Delve/adventurer interaction beyond repeated four-region cycles and a single discovery, with a distinct preparation or recruit-identity decision. Do not add a second near-identical seal, reduce prices merely to align all outcomes, or keep running arbitrary matrices when the present cost/timing questions are answered. Human playtesting remains missing.
