# Experiment 005 — Four-hour and day-long progression

Date: 2026-10-06. Commands: `node tools/journey-study.js 14400 20`, `node tools/journey-study.js 86400 5`.

Objective: investigate progression beyond the opening and distinguish numeric safety limits from actual game needs. Use the same investment/recovery policies as experiment 003; elapsed duration represents active play with automated simulated investment, not a larger offline cap. Every terminal save is validated and compared with its source.

Four-hour results (20 seeds each): training mean depth 558.3 with 27.7 defeats; mixed mean 631.3 with no defeats; fourth mean 879.2 with no defeats. Mean first-adventurer level: 298, 258.9 and 360.1 respectively. No invalid state or negative treasury occurred.

Twenty-four-hour baseline (5 seeds each): training mean depth 1352.2 / level 898.6; mixed 1234 / 785.4; fourth 1912 / 1000. Fourth policy exhausted both Guild upgrades and the level limit, retaining millions of unspendable Gold. A depth frontier only supported by capped power is not an effectively continuing idle game.

Small corrective change: raise the adventurer safety ceiling from 1,000 to 1,000,000, preserve XP already accumulated at the old ceiling, and bound/clear XP at the new exceptional ceiling. No reset or new progression currency. State validation uses the same shared ceiling. First million-level stats remain finite and within save numeric bounds.

Twenty-four-hour repeat: training and mixed unchanged; fourth reaches mean depth 1918 (1864–1984), mean level 1016.6 and 74.6 defeats. The small depth difference is expected because only the final part of this day crossed the old ceiling. All 42 tests pass, including old-ceiling continuation, extreme finite stats and late-session save round-trip.

Interpretation: this removes an artificial early ceiling; it does not solve late-game agency. Repeated retries and farming dominate after Guild investments finish. An interacting progression layer is justified by this evidence, but a prestige rewrite or isolated currency is not. A promising next experiment is a small equipment system that trades basic-attack strength against tagged ability strength/cooldowns, giving existing roles alternate builds. It should be compared against baseline parties before expanding further.
