# Idle Fodder

A local fantasy guild-management incremental autobattler. No accounts, dependencies, paid APIs, or build step.

Requires Node.js 20.11 or newer.

```sh
npm start
```

Open http://127.0.0.1:5173. Recruit the three initial applicants, assign them to the party, and enter the Delve. Enable automatic repeats to push onward. After a defeat, farm a conquered depth to earn gold and XP, invest in training or health, and try the frontier again. Expanded quarters unlocks a fourth party slot.

Progress saves in this browser every five seconds and after decisions. An active expedition or repeat order continues when you return, up to four hours per absence. Defeat stops repeats unless optional recovery orders are enabled. A failed recovery farm always stops them. Export saves for backups or transfer; importing replaces the current guild after confirmation. Everyone survives expedition failure.

Depth 5 unlocks expanded quarters. Every ten frontier depths raises the level of future applicants. Existing applicants stay available. Equal-level comparisons reveal recruit potential alongside their current stats. Reorder the party to set priority among guardians, or the front line when no guardian is assigned. When another tab updates the Guild, the older tab pauses; reload it to resume from the newest save.

At depth 10, commission equipment in the Guild workshop. Soldier's seal favors basic attacks but slows abilities; Ritual focus strengthens ward/heal/bleed abilities but weakens basic attacks. Equip freely on roster cards between fights. The starting treasury is enough for all three initial recruits; no adventurers are lost on defeat.

```sh
npm test
npm run simulate
node tools/party-study.js
node tools/journey-study.js
# Longer active-play scenarios: seconds and seed count
node tools/journey-study.js 14400 20
node tools/equipment-study.js
node tools/gear-matrix.js
node tools/technique-study.js
node tools/recruit-study.js
node tools/replacement-study.js
node tools/spending-study.js
node tools/recovery-study.js
node tools/recovery-depth-study.js
```

The engine has no browser dependencies. Seeded generation, one-second combat, and offline resolution use the same code. Content lives in `src/content.js`; development findings and continuation priorities live in `docs/`.

Expedition reports show enemy healing, shield absorption and individual contributions. Compare eight recent completed rooms in the archive; entering levels and equipment stay recorded after party changes.

After conquering depth 10, new applicants may bring a class technique: more frequent smaller effects, larger slower effects, or ranger shots that favor direct damage versus bleed. Existing adventurers keep their technique. Inspect Combat numbers and recruit comparisons before choosing a party.

At depth 20, build the Mentorship hall to train lower-level adventurers with Gold between fights. Roster cards quote a single level or an affordable catch-up target, capped by the most experienced member of your roster. Training preserves technique and equipment.

Each roster card keeps a Guild record of completed-room victories, Gatekeepers, deepest victory, downings and contributions. Training does not award combat accomplishments. Older saves mark unavailable earlier history and begin recording future rooms.

After depth 5, optional recovery orders farm a safer depth for 5, 10 or 20 victories after an automatic frontier defeat, then retry. A failed recovery farm stops orders. Recall, changing Orders or disabling automatic repeats cancels the queued recovery. The policy also works offline.

Recovery depth can be 60%, 80% or 95% of the frontier, skipping Gatekeepers. The plan previews its current target. Shallower farms finish more rooms; deeper farms offer more XP per room. Queued recovery freezes its depth and victory count until it completes or is canceled.

After depth 5, save up to three named party plans from the roster. Each records its members, order and equipment. Switch between fights using current levels and stats. A dismissed member makes the plan unavailable until you overwrite it with an updated party.
