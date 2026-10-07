# Experiment 007 — Equipment across compositions and Gatekeepers

## Method

Experiment 006 suggested Ritual focus was powerful near a Root Gatekeeper wall. Test whether it eliminates alternatives before changing its strength. `node tools/gear-matrix.js` runs 7,200 bounded encounters: 50 seeds, levels 12/20/28, depths 35/45/55, training and infirmary rank 2, four three-member parties and four equipment arrangements. Parties are guardian/ranger/cleric, three rangers, guardian/two rangers, and guardian/two clerics. Arrangements are unequipped, all steel, all ritual, and rangers steel with others ritual. These controlled fights exclude purchase-cost progression.

## Results

| Party, level, depth | Unequipped | Steel | Ritual | Role arrangement |
| --- | --- | --- | --- | --- |
| Balanced, 12, 35 | 16% / 42s | 4% / 33.4s | 100% / 34.2s | 100% / 36.9s |
| Guardian/two clerics, 12, 35 | 20% / 177.5s | 0% / 48.7s | 0% / 180s | 0% / 180s |
| Balanced, 20, 45 | 98% / 23.2s | 40% / 23.2s | 100% / 22.7s | 100% / 23.5s |
| Guardian/two clerics, 20, 45 | 4% / 50.6s | 0% / 32.8s | 100% / 66.9s | 100% / 66.9s |
| Guardian/two clerics, 28, 55 | 100% / 60.3s | 78% / 45.7s | 100% / 80.3s | 100% / 80.3s |

Cells show wins / mean duration of all attempts, including losses. Across the matrix, unequipped wins 58.1%, steel 54.3%, ritual 69.2%, role arrangement 66.2%. These aggregate rates describe this sample only.

Ritual helps healing against Ember cleave and shielding against direct damage, but a low-damage sustain party can time out against Root shield regeneration. Steel shortens comfortable farming fights while slowing abilities enough to endanger survival near a wall. Preserve these asymmetric outcomes. No balance values changed.

## Follow-up

Reports now retain enemy health, actual siphoned healing, shield absorption, entering party level/equipment and effective damage taken. Eight recent rooms remain in a bounded archive for comparison. Guidance identifies timeout with survivors, Ember cleave, siphoning or a fallen front line. Legacy saves label unavailable metadata as unrecorded.

57 tests passed. Thirty one-hour purchase/recovery journeys (`node tools/journey-study.js 3600 10`) round-tripped saves: training mean depth 238.9 with 3.3 defeats, mixed 248.2 with none, fourth member 340.1 with none. This smaller seed set is a regression check, not a direct comparison to prior 50-seed studies. Browser verified new and legacy results, expanded snapshots, reload persistence and no console errors.
