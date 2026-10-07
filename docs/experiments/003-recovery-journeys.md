# Experiment 003 — One-hour recovery journeys

Date: 2026-10-06. Command: `node tools/journey-study.js`.

Objective: compare broader investment strategies, including fourth-party recruitment, and verify late-session save integrity. Fifty seeds per policy, 3,600 seconds, balanced starting party. After each defeat, farm the highest conquered room for ten wins, then resume pushing. Training policy purchases only training; mixed buys training/health with lower-rank priority; fourth also prioritizes quarters after depth 5 and recruiting a ranger through actual applicant/refresh actions. No free simulated Gold or characters. Each terminal save round-trips through the real loader and is compared with the original.

| Policy | Depth min / mean / max | Mean defeats | Training / health ranks | Fourth recruited |
| --- | --- | ---: | --- | ---: |
| Training | 224 / 243.1 / 254 | 3.1 | 13 / 0 | 0/50 |
| Mixed | 240 / 250.3 / 260 | 0 | 12 / 12 | 0/50 |
| Fourth | 330 / 340.8 / 349 | 0 | 13 / 13 | 50/50 |

Interpretation: the earlier single-investment study exaggerated training dominance. Mixed investment offers steadier advancement; the fourth member substantially changes capability. No impossible first-hour wall or save invalidation was found in these policies. The automatic buying script is more attentive than most players, and successful simulations do not establish enjoyable pacing.

Follow-up: explain abilities and Gatekeeper actions directly in combat; investigate multi-hour progression and the practical rank/level caps. Preserve this record before changes to combat randomness.
