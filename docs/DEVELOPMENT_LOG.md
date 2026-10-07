# Development log

## 2026-10-06 — Playable foundation

Read Design Constitution; initial repository contained only that document. Chose native ES modules, dependency-free Node static server and Node tests: browser/engine separation supports identical offline and live simulation without infrastructure.

Implemented coherent species/origin/class generation; recruitment; inspectable stats and abilities; party assignment; damage, armor, shields, healing, bleed and burn; repeat/farm/push orders; three rotating Strata and five-depth Gatekeepers; XP; Gold; training, infirmary and quarters; local persistence, export/import and a return summary. No permanent expedition deaths. Room timeout prevents indefinite encounters.

Validation: first 17 engine tests passed, including 1,000 generated characters, 50 seeded opening Gatekeepers and offline/live equivalence. Experiment 001 ran 600 progression scenarios. Browser exercised Recruit → Assign → Battle → Reward → Upgrade; reload preserved a live expedition, Gold, levels and frontier. Browser console reported no warnings or errors.

Inspection found potential recovery failure if the last adventurer was dismissed with no gold. Added a free relief volunteer only when the roster is empty and recruitment is otherwise unaffordable. It cannot generate gold itself. Also attributed bleed damage and shield absorption in reports, retained reports across reload, avoided unchanged card replacement, and fixed farm input values being overwritten by the live renderer. All 21 regression tests passed. Browser verified the corrected farm order enters depth 5, and Gold, XP, upgrades and expedition reports survive reload.

## 2026-10-06 — Gatekeepers and role expression

Experiment 002 compared 2,400 fixed-party encounters; ranger opening bursts routinely ended fights before support mattered. Abilities now honor opening cooldowns, room health increased, and each region's Gatekeeper has a visible mechanic using existing shields, area damage or wounds. Infirmary rank 1 adds status cleansing to heals; upgrades apply at the next room. Version 1 combat/report additions receive safe load defaults. Reports show cleanses; units show active statuses; failure guidance recommends farming, investment and party changes.

All 28 tests pass. Repeated 600-run opening study and 2,400 encounter comparisons. Twenty seeded recovery scenarios overcame their first wall after farming and mixed investments. See experiment 002 for outcomes and limitations; burst remains strong and further balanced-budget studies are warranted.

## 2026-10-06 — Save conflicts, preparation and frontier value

Added cross-tab protection: receiving a save from another tab pauses updates, autosaving and controls in the older tab. Browser verified a second-tab infirmary purchase paused the first, then closing the second and reloading the first preserved the new treasury and upgrade. Invalid/prototype upgrade keys now fail without altering Gold. Simulation loops have explicit safety bounds.

Recruit comparisons now normalize candidate/peer to equal level without changing either character. Party preparation names the first target and missing healing; reordering changes target priority within roles. Browser verified roster order and level-normalized comparisons. Depth 5 now unlocks quarters; every ten depths improves future applicant levels, coupling frontier to Guild capabilities. Existing applicants and previously purchased facilities remain intact. All 36 tests pass.

### Review after five meaningful iterations

Playability: complete local loop verified through the interface. Progression: Guild investments and farming change outcomes; frontier now changes recruitment and party capacity. Agency: farming/pushing, recruitment comparisons, role selection, frontline order and investments are available. Variety: coherent origins/classes and three boss mechanics; individual abilities remain limited. Stability: 36 tests plus browser persistence/farming/cross-tab checks. Complexity: no dependencies or disconnected currencies; expand existing primitives first. Direction: study mixed investments and deeper recovery; improve visible battle explanations and long-term scaling before adding breadth. Numerical results do not establish enjoyment; human playtesting remains valuable.
