# Development state

Goal remains active: build and repeatedly improve Idle Fodder according to DESIGN_CONSTITUTION.md. The first playable version is a milestone, not completion.

## Running

Node >=20.11; `npm start`; open http://127.0.0.1:5173. `npm test` runs engine tests; `npm run simulate` compares 200-seed investment policies. No npm install or build needed.

## Playable

Recruit initial guardian/ranger/cleric, assign them, enter Delve, earn XP/Gold, buy Guild upgrades, repeat. Farming targets conquered rooms; pushing extends frontier. Fourth slot unlocks through quarters. Applicants refill empty spaces every 120 seconds. Recoverable defeats stop automatic orders. Room recovery is full. Offline uses the live simulation capped at four hours. Version 1 saves are validated; corrupted existing saves are left untouched. Export/import supports backups.

Engine/content/UI in `src/engine.js`, `src/content.js`, `src/app.js`. All combat resolves in deterministic seconds. Origin constrains class; traits have visible stat effects. Rendered text is escaped. Upgrade combat snapshots apply at next room. Last report and short event ledger explain outcomes.

## Recent validation

All 28 engine tests pass. Experiments preserve 600-run baseline/revised progression and 2,400-encounter party comparisons. Twenty farming/investment recovery scenarios overcome the first wall. Browser confirmed recruitment, assignment, combat, rewards, upgrade rank changes, fourth slot, and persistence. Recovery/report regressions passed; corrected farm-depth browser input entered the intended depth 5.

## Known limitations / priorities

- Revised opening has longer fights; training remains stronger than health investment (experiments 001–002).
- Three archetypes, three origins, three repeating regions. Root Gatekeepers regrow shields, Ember Gatekeepers cleave, Hollow Gatekeepers wound; infirmary rank 1 enables cleric cleanse.
- Full recovery between rooms limits expedition risk management. No equipment, exploration policy, or multi-party expeditions yet.
- Reports count effective health damage, healing and absorbed shields; opening enemy shields consume attacks without being counted as health damage.
- Browser integration checks currently manual through automation, engine tests repeatable via npm.
- Single local browser save; no remote sync. No save migration beyond additive version 1 defaults yet.

Next recommended task: verify the new boss UI in browser, then inspect balanced-budget party performance across power levels. Clarify recruitment comparisons and party preparation before adding content.
