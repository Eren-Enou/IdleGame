# Development state

Goal remains active. Continue meaningful development under DESIGN_CONSTITUTION.md and the autonomous directive; the playable foundation is not completion.

## Running and verification

Node >=20.11. `npm start` serves http://127.0.0.1:5173. No install/build step. `npm test` runs 69 tests. `npm run simulate`, `node tools/party-study.js`, `node tools/journey-study.js [seconds] [seeds]`, `node tools/equipment-study.js`, `node tools/gear-matrix.js`, and `node tools/technique-study.js` preserve deterministic bounded experiments. Experiment records 001–008 live in docs/experiments.

## Current playable game

- Recruit coherent origin/class/talent combinations, compare potential at equal level, assign and reorder a party.
- Automated one-second combat uses Guardian shields/target priority, Ranger direct attacks and bleed, Cleric lowest-health healing and infirmary-enabled cleanse. Three repeating strata and distinct Gatekeepers express regeneration, party cleave and siphoning/wounds.
- Push the frontier or farm conquered rooms. Victory gives Gold/XP; everyone recovers after each room. Defeat stops repeat orders. Rooms terminate within 180 seconds.
- Training, infirmary and quarters use Gold; depth 5 unlocks quarters/fourth party slot. Every ten frontier depths raises future applicant level. Empty applicant spaces refill without replacing existing choices. Relief recruitment prevents an empty bankrupt Guild from getting stuck.
- Depth 10 unlocks two workshop patterns. Steel favors basic attacks but slows abilities; ritual strengthens ward/heal/bleed but weakens basics. One freely changeable item per adventurer between fights.
- Depth 10 also allows six class-constrained recruit techniques with timing/strength tradeoffs. Half of new applicants retain standard abilities; existing adventurers/applicants retain theirs. Technique is immutable and chosen through recruitment. Exact Combat numbers and comparisons explain differences.
- Live/final event timelines and eight recent expedition snapshots show entering level, equipment, technique, enemy recovery/shield absorption and individual effective damage/healing/shield/taken/cleanse contributions. Failure advice distinguishes timeouts, cleave, siphoning and a fallen front line.
- Version 1 saves validate and migrate additive fields. Offline runs the live engine for up to four hours. Export/import backups. Bad existing saves are preserved; cross-tab changes pause old tabs to avoid overwriting progress. Encounter RNG is independent of recruitment. Snapshot purchases apply next room.

## Latest evidence

69 tests passed. Experiment 007 compared 7,200 equipment/composition fights and preserved asymmetric builds. Experiment 008 ran two 6,300-fight technique passes, validating every terminal save. Initially ranger variants improved nearly all sampled matchups; final lower bleed throughput retains advantages with costs. Frequent smaller heals interact poorly with steel's flat cooldown penalty; standard abilities remain valuable. Thirty one-hour journeys with the latest generation saved/reloaded at mean depths 238.5 training, 248.1 mixed, 339.3 fourth member. These samples do not prove enjoyment or universal balance.

Browser verified recruiting Quiet mending, assigning a fourth party member, ritual equipment, completed combat, named technique report, and reload persistence. Earlier checks cover the full recruit/battle/reward/invest/repeat loop, farming input, applicant levels, archive layout and cross-tab purchase preservation.

## Priorities and limitations

1. Study technique combinations and recruit replacement economics; current study changes one class at a time. Existing veterans may make new applicant choices unattractive despite distinct abilities.
2. Improve individual identity/history if it supports attachment and roster decisions; name pool and career feedback are sparse.
3. Late-game Gold has no meaningful use after finite facility ranks. Investigate an interacting Guild progression or expedition policy, without inventing disconnected currencies.
4. Full recovery limits expedition risk management. Three archetypes/regions, no multi-party expeditions or exploration policy yet; these are opportunities, not a mandatory checklist.
5. Browser integration checks remain manual automation; engine checks are repeatable. Local browser save only; no remote sync.

Do not flatten useful specializations or add breadth without evidence. Latest internal review is in DEVELOPMENT_LOG.md after the technique milestone. Next recommended task: combinations and replacement economics, then choose the next coherent improvement.
