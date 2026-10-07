# Idle Fodder

A local fantasy guild-management incremental autobattler. No accounts, dependencies, paid APIs, or build step.

Requires Node.js 20.11 or newer.

```sh
npm start
```

Open http://127.0.0.1:5173. Recruit the three initial applicants, assign them to the party, and enter the Delve. Enable automatic repeats to push onward. After a defeat, farm a conquered depth to earn gold and XP, invest in training or health, and try the frontier again. Expanded quarters unlocks a fourth party slot.

Progress saves in this browser every five seconds and after decisions. An active expedition or repeat order continues when you return, up to four hours per absence. Defeat stops repeats. Export saves for backups or transfer; importing replaces the current guild after confirmation. Everyone survives expedition failure.

Depth 5 unlocks expanded quarters. Every ten frontier depths raises the level of future applicants. Existing applicants stay available. Equal-level comparisons reveal recruit potential alongside their current stats. Reorder the party to set priority among guardians, or the front line when no guardian is assigned. When another tab updates the Guild, the older tab pauses; reload it to resume from the newest save.

```sh
npm test
npm run simulate
node tools/party-study.js
node tools/journey-study.js
# Longer active-play scenarios: seconds and seed count
node tools/journey-study.js 14400 20
```

The engine has no browser dependencies. Seeded generation, one-second combat, and offline resolution use the same code. Content lives in `src/content.js`; development findings and continuation priorities live in `docs/`.
