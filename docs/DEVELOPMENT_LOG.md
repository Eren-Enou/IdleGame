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

## 2026-10-06 — Explain combat and investigate recovery

Experiment 003 ran 150 one-hour recovery journeys with actual recruit/upgrade costs and validated complete late-session saves. Mixed investment outperformed training-only slightly while avoiding repeated defeats; a fourth ranger had a much larger effect. This evidence counters a simple conclusion that health investment is useless.

Added a bounded live combat timeline and expandable final-room timeline; important ability and Gatekeeper actions are visible. Encounter RNG is now independent of recruitment RNG, with additive v1 defaults for older saves. Experiment 004 repeated opening/recovery studies and found no material balance change. All 40 tests pass, including unrelated recruitment leaving combat unchanged. DOM writes compare cached source strings so unchanged cards and open combat details remain stable.

Browser confirmed live and final-room timeline rendering, including the Root Gatekeeper shield action. Expanded details remained open during idle updates. Follow-up timeline refinement includes status ticks and the final result, removes zero-healing noise, and explains shield absorption. Reformatted the stylesheet for maintenance without changing rules.

## 2026-10-06 — Remove artificial early level ceiling

Experiment 005 simulated four-hour and day-long progression. Four-member parties reached level 1,000 within the day and accumulated XP with no benefit. Raised the numerical ceiling to 1,000,000, preserved existing XP, bounded XP and verified finite extreme stats. All 42 tests passed; 15 repeated day-long journeys saved/reloaded correctly. This corrects the ceiling but does not establish adequate long-term agency: finished Guild investments leave Gold without meaningful use. Next iteration should test alternate equipment builds through existing ability tags/cooldowns, not invent a disconnected progression currency.

## 2026-10-06 — Workshop equipment tradeoffs

Implemented two workshop patterns unlocked at depth 10, using existing Gold and shared attack/ability triggers and tags. Steel improves basic attacks but slows abilities; ritual improves ward/heal/bleed abilities but weakens basics. One equipped item per adventurer, freely changeable between fights. Legacy saves default to unequipped without resetting progress.

Experiment 006 ran 2,400 equal-power encounters and validated every terminal save. Steel speeds easy farming; ritual can solve a near-wall Root Gatekeeper (100% vs 22% baseline wins at level 12/depth 35). Neither solves underpowered Ember encounters. Preserve this specialization rather than flattening everything into equal performance. Browser verified commissioning costs, per-character selection, modified cooldown descriptions and combat locks. All 49 tests pass.
