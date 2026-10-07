# Development log

## 2026-10-06 — Playable foundation

Read Design Constitution; initial repository contained only that document. Chose native ES modules, dependency-free Node static server and Node tests: browser/engine separation supports identical offline and live simulation without infrastructure.

Implemented coherent species/origin/class generation; recruitment; inspectable stats and abilities; party assignment; damage, armor, shields, healing, bleed and burn; repeat/farm/push orders; three rotating Strata and five-depth Gatekeepers; XP; Gold; training, infirmary and quarters; local persistence, export/import and a return summary. No permanent expedition deaths. Room timeout prevents indefinite encounters.

Validation: first 17 engine tests passed, including 1,000 generated characters, 50 seeded opening Gatekeepers and offline/live equivalence. Experiment 001 ran 600 progression scenarios. Browser exercised Recruit → Assign → Battle → Reward → Upgrade; reload preserved a live expedition, Gold, levels and frontier. Browser console reported no warnings or errors.

Inspection found potential recovery failure if the last adventurer was dismissed with no gold. Added a free relief volunteer only when the roster is empty and recruitment is otherwise unaffordable. It cannot generate gold itself. Also attributed bleed damage and shield absorption in reports, retained reports across reload, avoided unchanged card replacement, and fixed farm input values being overwritten by the live renderer. All 21 regression tests passed. Browser verified the corrected farm order enters depth 5, and Gold, XP, upgrades and expedition reports survive reload.
