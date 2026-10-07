# Development state

Goal remains active. Continue meaningful development under DESIGN_CONSTITUTION.md and the autonomous directive; the playable foundation is not completion.

## Running and verification

Node >=20.11. `npm start` serves http://127.0.0.1:5173. No install/build step. `npm test` runs 84 tests. `npm run simulate`, `node tools/party-study.js`, `node tools/journey-study.js [seconds] [seeds]`, `node tools/equipment-study.js`, `node tools/gear-matrix.js`, and `node tools/technique-study.js`, and `node tools/recruit-study.js` preserve deterministic bounded experiments. Experiment records 001–010 live in docs/experiments.

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

84 tests passed. Experiment 007 compared 7,200 equipment/composition fights and preserved asymmetric builds. Experiment 008 ran two 6,300-fight technique passes, validating every terminal save. Initially ranger variants improved nearly all sampled matchups; final lower bleed throughput retains advantages with costs. Frequent smaller heals interact poorly with steel's flat cooldown penalty; standard abilities remain valuable. Thirty one-hour journeys with the latest generation saved/reloaded at mean depths 238.5 training, 248.1 mixed, 339.3 fourth member. These samples do not prove enjoyment or universal balance.

Browser verified the depth-20 mentorship unlock, 450-Gold hall and 47-Gold catch-up from level 9 to 11, stats and reload persistence. Earlier checks verified recruiting Quiet mending, assigning a fourth party member, ritual equipment, completed combat, named technique report, and reload persistence. Earlier checks cover the full recruit/battle/reward/invest/repeat loop, farming input, applicant levels, archive layout and cross-tab purchase preservation.

## Priorities and limitations

1. Compare mentoring against cheaper equipment spending and study longer-session investment choices. Experiment 010 shows the catch-up service helps one-hour frontier/Gatekeeper fights, but four-hour replacements remain less reliable.
2. Individual Guild records now preserve completed-room accomplishments/contributions, with honest legacy defaults. Name pool and broader character identity remain sparse.
3. Late-game Gold has no meaningful use after finite facility ranks. Investigate an interacting Guild progression or expedition policy, without inventing disconnected currencies.
4. Full recovery limits expedition risk management. Three archetypes/regions, no multi-party expeditions or exploration policy yet; these are opportunities, not a mandatory checklist.
5. Browser integration checks remain manual automation; engine checks are repeatable. Local browser save only; no remote sync.

Do not flatten useful specializations or add breadth without evidence. Latest internal review is in DEVELOPMENT_LOG.md after the technique milestone. Next recommended task: replacement combat outcomes after mentorship and long-session investment agency, then choose the next coherent improvement.

Experiment 009 compares 12,150 technique combinations and 30 recruitment journeys. Fresh recruit power falls to about 31% of veterans after an hour. Added a depth-20 Mentorship hall (450 Gold), with exact one-level/affordable catch-up quotes on roster cards. Training consumes Gold, respects remaining XP and caps at the highest roster level; it locks during combat and retains identity/equipment. Available one-hour savings bring recruits to about 87% veteran power, with facility/hire costs paid. Next: evaluate actual replacement fights and longer Gold agency, alongside character history/identity.

Experiment 010 resolves 3,888 paired replacement encounters from 90 progression snapshots. One-hour Gatekeeper wins improve from 0–1/30 fresh to 29–30/30 mentored; four-hour results remain weaker than veteran parties. Added persistent individual Guild records for wins/failures, downings, Gatekeepers, best victory depth and effective contributions. Reserves, mentoring and recalls do not fabricate history. Legacy careers explicitly label unrecorded past. Shared mixed-journey helper retains experiment 009 outputs. Next: compare cheaper equipment against mentorship, then inspect longer-term Guild/expedition agency.
