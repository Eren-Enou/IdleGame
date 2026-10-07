# Experiment 002 — Party roles and Gatekeeper mechanics

Date: 2026-10-06. Commands: `node tools/party-study.js`, `npm run simulate`, `npm test`.

Objective: distinguish useful specialization from universal burst dominance and make the opening readable. Conditions: 100 seeds for each of six three-person compositions, level 8, training/infirmary rank 2, depths 5/15/25/35 (2,400 encounters). Baseline opening progression also repeated for 600 runs.

Initial findings: at depth 25 all-ranger won 100% in 7s versus balanced in 15.3s. At depth 35 guardian/two-ranger won 100%, all-ranger 90%, balanced 69%, ranger/ranger/cleric 0%. Basic hits plus ranger's early ability overwhelmed most rooms before healers could contribute.

Changes: initial ability cooldown now matches the advertised repeat cooldown; room health 50→70 times depth scaling. Root Gatekeepers regrow an 8%-health shield every third attack; Ember Gatekeepers cleave the party for 55% attack; Hollow Gatekeepers inflict a four-second wound. Infirmary's first rank gives healing abilities a one-status cleanse. These deepen existing health/shield/status primitives without a new currency or class.

Results after changes:

| Depth | Balanced | All-ranger | Guardian/two-ranger | Guardian/two-cleric | Two-ranger/cleric | All-guardian |
| --- | --- | --- | --- | --- | --- | --- |
| 5 | 100%, 8.8s | 100%, 5s | 100%, 6.3s | 100%, 19.2s | 100%, 6s | 100%, 22.1s |
| 15 | 100%, 14.4s | 100%, 8s | 100%, 10s | 100%, 32.3s | 100%, 9.9s | 100%, 45.4s |
| 25 | 100%, 22.3s | 100%, 13.1s | 100%, 14.6s | 100%, 64.6s | 0%, 23.8s | 0%, 49.7s |
| 35 | 0%, 29.1s | 0%, 17.3s | 0%, 21.5s | 0%, 50s | 0%, 21.3s | 0%, 37.4s |

Opening progression: no investments mean depth 28.7 (24–34), training mean 157.6 (74–224), infirmary mean 59.7 (49–64). All 600 eventually failed within an hour; all 50 test seeds still clear depth 5. At level 8 depth 35 is now a progression wall rather than a composition test. Regression across 20 seeds shows farming 600 seconds and investing in both training and health overcomes the first natural wall.

Interpretation: combat has room to express cooldowns and hazards. Burst remains valuable for farming; sustain has situational survival utility but much lower throughput. Do not claim balance or fun established. Training still has the highest broad leverage. Future party studies should compare at multiple power levels and around Ember bosses, where party-wide damage should favor health/healing.

Validation: 28 engine tests pass, including each boss mechanic, cleanse, next-room upgrade timing and additive defaults for legacy version 1 saves. One cleanse fixture initially downed the target before the heal; corrected fixture health to test living-target cleansing. No code change was needed for that failed assertion.
