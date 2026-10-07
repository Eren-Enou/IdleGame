# Development state

Goal remains active: build and repeatedly improve Idle Fodder according to DESIGN_CONSTITUTION.md. The first playable version is a milestone, not completion.

## Running

Node >=20.11; `npm start`; open http://127.0.0.1:5173. `npm test` runs engine tests; `npm run simulate` compares 200-seed investment policies. No npm install or build needed.

## Playable

Recruit initial guardian/ranger/cleric, assign them, enter Delve, earn XP/Gold, buy Guild upgrades, repeat. Farming targets conquered rooms; pushing extends frontier. Fourth slot unlocks through quarters. Applicants refill empty spaces every 120 seconds. Recoverable defeats stop automatic orders. Room recovery is full. Offline uses the live simulation capped at four hours. Version 1 saves are validated; corrupted existing saves are left untouched. Export/import supports backups.

Engine/content/UI in `src/engine.js`, `src/content.js`, `src/app.js`. All combat resolves in deterministic seconds. Origin constrains class; traits have visible stat effects. Rendered text is escaped. Upgrade combat snapshots apply at next room. Last report and short event ledger explain outcomes.

## Recent validation

All 21 engine tests and 600 baseline simulation runs passed. Browser confirmed recruitment, assignment, combat, rewards, upgrade rank changes, fourth slot, and persistence. Recovery/report regressions passed; corrected farm-depth browser input entered the intended depth 5.

## Known limitations / priorities

- Fast opening; training far stronger than health investment (experiment 001).
- Only three archetypes, three origins and three repeating regions. Gatekeepers currently have stronger stats/shield, not distinct tactics.
- Full recovery between rooms limits expedition risk management. No equipment, exploration policy, or multi-party expeditions yet.
- Reports count effective health damage, healing and absorbed shields; opening enemy shields consume attacks without being counted as health damage.
- Browser integration checks currently manual through automation, engine tests repeatable via npm.
- Single local browser save; no remote sync. No save migration beyond additive version 1 defaults yet.

Next recommended task: evaluate opening pacing and party composition with seeded simulations. Changes should deepen preparation and outcome clarity before adding content.
