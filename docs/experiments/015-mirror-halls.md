# Experiment 015 — Mirror Halls

Added a fourth stratum after the existing three-region opening. Direct hits reflect 15% of effective enemy health damage to the attacker, ignoring armor but respecting shields. Fully shielded hits and bleed do not reflect. Retaliation resolves even on the killing hit; killing the enemy still wins, including a mutual downing. A Ranger downed by its ability cannot make a subsequent basic attack that tick. Its already-applied bleed continues. Reflected health damage enters damage-taken/career totals, shield absorption enters existing blocked totals, and enemy reports separately count actual reflected health damage.

The Silver Adjudicator adds a 70%-attack strike against the living member with highest base attack every third enemy attack. Ties use party order. This bypasses Guardian interception without bypassing the target's armor or shield. Shared region indexing keeps enemy generation and previews aligned; old encounters retain their saved indices and receive zero reflection defaults. A discovery message appears upon first conquering depth 30.

## Encounter experiment

`node tools/mirror-study.js` resolves and validates 37,440 fights: four reflection fractions (0/10/15/20%), two levels (12/20), four Mirror depths (31/35/40/75), five compositions, three equipment arrangements and three Ranger techniques where applicable, across 30 seeds. Training/Infirmary rank 2 is fixed. Fourth-party scenarios use a second Ranger or Cleric. Ranger technique is controlled; Guardian/Cleric techniques are standard. Zero-reflection scenarios retain the new boss strike and isolate the hazard, not the entire new region. Full results: `015-mirror-results.csv`.

At level 12/depth 35, balanced standard parties win 3/30 with no equipment, 0/30 with steel and 24/30 with ritual. Ritual Quickshot wins 28/30, Deep barbs 30/30. Without reflection, balanced standard wins are 16/30, 1/30 and 30/30 respectively. Raising reflection from 15% to 20% drops ritual standard to 11/30. Keep 15%: preparation and fourth-member investment can solve this sampled wall without making every standard party lose.

Entry depth 31 is safe for all sampled level-12 builds. Steel usually finishes it faster while reflecting more damage; ritual reduces reflection and offers stronger support. At depth 40, level-12 four-support parties win 30/30 with none or ritual but only 7/30 with steel. Four-damage parties win all three while steel downs more members. Sustain parties trade much longer fights for survival. These are useful costs, not evidence for making the new region numerically neutral. Earlier strata retain their hazards; shortening the frequency of those encounters changes aggregate pacing.

## Journey regression

`node tools/journey-study.js 3600 20` and `node tools/journey-study.js 14400 20` validate another 120 complete terminal saves. These policies buy upgrades continuously and manually recover at conquered frontier after losses; they do not represent a typical unattended player or change the four-hour offline cap.

| Policy | 1h mean depth | 1h defeats | 4h mean depth | 4h defeats |
| --- | ---: | ---: | ---: | ---: |
| Training only | 229.0 | 6.0 | 546.4 | 31.0 |
| Mixed investment | 253.8 | 0.0 | 642.8 | 0.1 |
| Fourth Ranger + mixed | 344.0 | 0.0 | 887.1 | 0.0 |

Progression continues, while health/support investment remains meaningful. Broad discovery and later capability progression are still limited. This new region does not solve the full long-session problem. Next: inspect human-facing reports/preview clarity and evaluate further region/recruitment progression from evidence rather than adding another immediately repeating cosmetic theme.
