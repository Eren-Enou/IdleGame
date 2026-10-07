# Development state

Goal remains active: build and repeatedly improve Idle Fodder according to DESIGN_CONSTITUTION.md. The first playable version is a milestone, not completion.

## Running

Node >=20.11; `npm start`; open http://127.0.0.1:5173. `npm test` runs engine tests; `npm run simulate` compares 200-seed investment policies. No npm install or build needed.

## Playable

Recruit initial guardian/ranger/cleric, assign them, enter Delve, earn XP/Gold, buy Guild upgrades, repeat. Farming targets conquered rooms; pushing extends frontier. Fourth slot unlocks through quarters. Applicants refill empty spaces every 120 seconds. Recoverable defeats stop automatic orders. Room recovery is full. Offline uses the live simulation capped at four hours. Version 1 saves are validated; corrupted existing saves are left untouched. Export/import supports backups.

Engine/content/UI in `src/engine.js`, `src/content.js`, `src/app.js`. All combat resolves in deterministic seconds. Origin constrains class; traits have visible stat effects. Rendered text is escaped. Upgrade combat snapshots apply at next room. Last report and short event ledger explain outcomes.

## Recent validation

All 49 tests pass. Experiments preserve opening progression, 2,400-encounter party comparisons, 150 one-hour recovery journeys before/after RNG isolation, 60 four-hour and 15 day-long baseline journeys, and 15 day-long journeys after raising the level ceiling. Equipment study adds 2,400 encounters with validated terminal saves. Every late-session save round-trips. Twenty farming/investment recovery scenarios overcome the first wall. Browser confirmed the full loop, persistence, correct farming input, equal-level comparisons, reordering, level 2 recruits at depth 11 and cross-tab protection. Opening the second tab, buying infirmary, closing it and reloading the first preserved the newer save.

## Known limitations / priorities

- Revised opening has longer fights; training remains stronger than health investment (experiments 001–002).
- Three archetypes, three origins, three repeating regions. Root Gatekeepers regrow shields, Ember Gatekeepers cleave, Hollow Gatekeepers wound; infirmary rank 1 enables cleric cleanse. Depth 5 unlocks quarters, each ten frontier depths raises future applicant level; old applicants remain.
- Full recovery between rooms limits expedition risk management. Two equipment patterns; no exploration policy or multi-party expeditions yet.
- Reports count effective health damage, healing and absorbed shields; opening enemy shields consume attacks without being counted as health damage.
- Browser integration checks currently manual through automation, engine tests repeatable via npm.
- Single local browser save; cross-tab writes pause other tabs; no remote sync. Additive v1 defaults preserve old combat counters. Former level 1,000 ceiling was reached within simulated day-long play; raised to 1,000,000 while preserving accrued XP. Guild rank caps still run out of investment choices in long sessions.

Workshop at depth 10 commissions two permanent patterns for 120 Gold each. One freely changeable equipped item per adventurer between fights; Soldier's seal favors basics with slower abilities, Ritual focus boosts tagged abilities with weaker basics. Legacy saves retain progress and default to no equipment. Browser verified cost, selection and locks.

Latest changes: combat owns an independent seeded RNG; live and final-room event timelines explain actions. Existing v1 fights/reports get safe defaults. Initial comparisons suggesting health was weak were qualified by experiment 003: mixed investment advances steadily and a fourth adventurer has major value.

Browser checked the live timeline, expanded final report and preserved expanded state during idle updates. Experiment 005 investigated four-hour/day-long play and removed the artificial early level ceiling. Next recommended task: broaden equipment comparisons across Ember/Hollow bosses and party compositions; inspect recruitment variety and individual character histories. Equipment currently supports asymmetric specialization (experiment 006); preserve strong builds unless they eliminate alternatives. Late-game Gold sinks/agency remain unresolved after maximum Guild ranks. More extensive progression layers need evidence; do not manufacture currencies or content.
