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
node tools/veteran-study.js 20
node tools/mirror-study.js
node tools/warden-study.js
node tools/warden-recruit-study.js
node tools/warden-recovery-study.js 20
node tools/name-study.js
```

The engine has no browser dependencies. Seeded generation, one-second combat, and offline resolution use the same code. Content lives in `src/content.js`; development findings and continuation priorities live in `docs/`.

Expedition reports show enemy healing, shield absorption and individual contributions. Compare eight recent completed rooms in the archive; entering levels and equipment stay recorded after party changes.

After conquering depth 10, new applicants may bring a class technique: more frequent smaller effects, larger slower effects, or ranger shots that favor direct damage versus bleed. Existing adventurers keep their technique. Inspect Combat numbers and recruit comparisons before choosing a party.

At depth 20, build the Mentorship hall to train lower-level adventurers with Gold between fights. Roster cards quote a single level or an affordable catch-up target, capped by the most experienced member of your roster. Training preserves technique and equipment.

Each roster card keeps a Guild record of completed-room victories, Gatekeepers, deepest victory, downings and contributions. Training does not award combat accomplishments. Older saves mark unavailable earlier history and begin recording future rooms.

After depth 5, optional recovery orders farm a safer depth for 5, 10 or 20 victories after an automatic frontier defeat, then retry. A failed recovery farm stops orders. Recall, changing Orders or disabling automatic repeats cancels the queued recovery. The policy also works offline.

Recovery depth can be 60%, 80% or 95% of the frontier, skipping Gatekeepers. The plan previews its current target. Shallower farms finish more rooms; deeper farms offer more XP per room. Queued recovery freezes its depth and victory count until it completes or is canceled.

After depth 5, save up to three named party plans from the roster. Each records its members, order and equipment. Switch between fights using current levels and stats. A dismissed member makes the plan unavailable until you overwrite it with an updated party.

The fourth stratum, Mirror Halls, begins at depth 31. Direct attacks reflect 15% of effective health damage to the attacker, ignoring armor; personal shields absorb it and bleed does not reflect. The Silver Adjudicator also strikes the living member with the highest attack power every third attack. The four strata then repeat every 40 depths. Reports record actual reflected health damage; old encounters keep their recorded region.

Chart depth 40 to attract Human and Dwarf Wardens. Sheltering ward shields each living party member every four seconds, with lower attack power than the starting classes. It prevents incoming damage without restoring health or cleansing. Ritual focus strengthens wards; Soldier's seal delays them. Reports distinguish shield granted by the caster from damage absorbed by each recipient. Existing applicants stay available when recruitment expands.

Applicant cards preview training after hiring once the Mentorship hall is available. Quotes reserve the hire price and, if needed, the hall's price before calculating the affordable training target. They show the total Gold cost; recruiting, building the hall and training remain separate choices.

Set a Destination depth and press Set destination to stop further frontier pushes once it is conquered. Use 0 for unlimited pushing. Current combat finishes, farming remains available, and recovery can still farm/retry before arrival. Queued recovery locks destination changes until canceled. The destination works offline too.

New applicants use full names from their origin's naming pool and avoid names already held by active Guild members or applicants. Existing names, saved lineups and historical reports stay preserved.

Depth 50 unlocks the Cartography desk (750 Gold). Survey the highest conquered ordinary Rootways room for the Dawn seal blueprint: 20% victory discovery chance, plus 10% per Ranger, up to 50%. Surveys earn normal Gold/XP and stop repeating on discovery or defeat. Commission the blueprint for 1,200 Gold. Dawn casts the first ability at 1s, then uses normal cooldowns, with +10% basic damage; steel offers stronger sustained attacks and ritual stronger abilities. Survey works offline. Run `node tools/survey-study.js` for paired equipment and journey evidence.

`node tools/discovery-economy-study.js` compares actually funded Dawn, facility investment, existing ritual gear and fourth-member preparation from first depth-50 checkpoints. `node tools/dawn-technique-study.js` compares Ranger techniques and equipment in fixed-strength encounters. Results and limits live in experiment 021. Cartography shows the 1,950-Gold combined desk/pattern cost up front; discovery and commissioning remain separate steps.

At depth 60, future Clerics may bring Aegis mending. It heals 10% less than standard Mending light, but each unused point grants shield to every living party member, up to their usual storage caps. Infirmary cleanse and equipment still apply. No unused healing means no ward. Inspect the recruit's numbers before preparing a replacement; existing Clerics keep their techniques. `node tools/aegis-study.js` compares party-ward prototypes; `--single-target` reproduces the weaker first design. Experiment 022 records both.

Applicant training quotes now include expandable combat numbers at the affordable target level, using current Guild upgrades without equipment. Preview future ability strength before hiring; mentoring still happens separately. `node tools/aegis-recruit-study.js` compares funded replacements and fourth-slot Clerics through both the next room and the next Gatekeeper. Experiment 023 records costs, eligibility and limits.
