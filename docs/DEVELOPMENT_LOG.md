# Development log

## 2026-10-06 — Playable foundation

Read Design Constitution; initial repository contained only that document. Chose native ES modules, dependency-free Node static server and Node tests: browser/engine separation supports identical offline and live simulation without infrastructure.

Implemented coherent species/origin/class generation; recruitment; inspectable stats and abilities; party assignment; damage, armor, shields, healing, bleed and burn; repeat/farm/push orders; three rotating Strata and five-depth Gatekeepers; XP; Gold; training, infirmary and quarters; local persistence, export/import and a return summary. No permanent expedition deaths. Room timeout prevents indefinite encounters.

Validation: first 17 engine tests passed, including 1,000 generated characters, 50 seeded opening Gatekeepers and offline/live equivalence. Experiment 001 ran 600 progression scenarios. Browser exercised Recruit → Assign → Battle → Reward → Upgrade; reload preserved a live expedition, Gold, levels and frontier. Browser console reported no warnings or errors.

Inspection found potential recovery failure if the last adventurer was dismissed with no gold. Added a free relief volunteer only when the roster is empty and recruitment is otherwise unaffordable. It cannot generate gold itself. Also attributed bleed damage and shield absorption in reports, retained reports across reload, avoided unchanged card replacement, and fixed farm input values being overwritten by the live renderer. All 21 regression tests passed. Browser verified the corrected farm order enters depth 5, and Gold, XP, upgrades and expedition reports survive reload.

## 2026-10-06 — Gatekeepers and role expression

Experiment 002 compared 2,400 fixed-party encounters; ranger opening bursts routinely ended fights before support mattered. Abilities now honor opening cooldowns, room health increased, and each region's Gatekeeper has a visible mechanic using existing shields, area damage or wounds. Infirmary rank 1 adds status cleansing to heals; upgrades apply at the next room. Version 1 combat/report additions receive safe load defaults. Reports show cleanses; units show active statuses; failure guidance recommends farming, investment and party changes.

All 28 tests pass. Repeated 600-run opening study and 2,400 encounter comparisons. Twenty seeded recovery scenarios overcame their first wall after farming and mixed investments. See experiment 002 for outcomes and limitations; burst remains strong and further balanced-budget studies are warranted.

## 2026-10-06 — Save conflicts, preparation and frontier value

Added cross-tab protection: receiving a save from another tab pauses updates, autosaving and controls in the older tab. Browser verified a second-tab infirmary purchase paused the first, then closing the second and reloading the first preserved the new treasury and upgrade. Invalid/prototype upgrade keys now fail without altering Gold. Simulation loops have explicit safety bounds.

Recruit comparisons now normalize candidate/peer to equal level without changing either character. Party preparation names the first target and missing healing; reordering changes target priority within roles. Browser verified roster order and level-normalized comparisons. Depth 5 now unlocks quarters; every ten depths improves future applicant levels, coupling frontier to Guild capabilities. Existing applicants and previously purchased facilities remain intact. All 36 tests pass.

### Review after five meaningful iterations

Playability: complete local loop verified through the interface. Progression: Guild investments and farming change outcomes; frontier now changes recruitment and party capacity. Agency: farming/pushing, recruitment comparisons, role selection, frontline order and investments are available. Variety: coherent origins/classes and three boss mechanics; individual abilities remain limited. Stability: 36 tests plus browser persistence/farming/cross-tab checks. Complexity: no dependencies or disconnected currencies; expand existing primitives first. Direction: study mixed investments and deeper recovery; improve visible battle explanations and long-term scaling before adding breadth. Numerical results do not establish enjoyment; human playtesting remains valuable.

## 2026-10-06 — Explain combat and investigate recovery

Experiment 003 ran 150 one-hour recovery journeys with actual recruit/upgrade costs and validated complete late-session saves. Mixed investment outperformed training-only slightly while avoiding repeated defeats; a fourth ranger had a much larger effect. This evidence counters a simple conclusion that health investment is useless.

Added a bounded live combat timeline and expandable final-room timeline; important ability and Gatekeeper actions are visible. Encounter RNG is now independent of recruitment RNG, with additive v1 defaults for older saves. Experiment 004 repeated opening/recovery studies and found no material balance change. All 40 tests pass, including unrelated recruitment leaving combat unchanged. DOM writes compare cached source strings so unchanged cards and open combat details remain stable.

Browser confirmed live and final-room timeline rendering, including the Root Gatekeeper shield action. Expanded details remained open during idle updates. Follow-up timeline refinement includes status ticks and the final result, removes zero-healing noise, and explains shield absorption. Reformatted the stylesheet for maintenance without changing rules.

## 2026-10-06 — Remove artificial early level ceiling

Experiment 005 simulated four-hour and day-long progression. Four-member parties reached level 1,000 within the day and accumulated XP with no benefit. Raised the numerical ceiling to 1,000,000, preserved existing XP, bounded XP and verified finite extreme stats. All 42 tests passed; 15 repeated day-long journeys saved/reloaded correctly. This corrects the ceiling but does not establish adequate long-term agency: finished Guild investments leave Gold without meaningful use. Next iteration should test alternate equipment builds through existing ability tags/cooldowns, not invent a disconnected progression currency.

## 2026-10-06 — Workshop equipment tradeoffs

Implemented two workshop patterns unlocked at depth 10, using existing Gold and shared attack/ability triggers and tags. Steel improves basic attacks but slows abilities; ritual improves ward/heal/bleed abilities but weakens basics. One equipped item per adventurer, freely changeable between fights. Legacy saves default to unequipped without resetting progress.

Experiment 006 ran 2,400 equal-power encounters and validated every terminal save. Steel speeds easy farming; ritual can solve a near-wall Root Gatekeeper (100% vs 22% baseline wins at level 12/depth 35). Neither solves underpowered Ember encounters. Preserve this specialization rather than flattening everything into equal performance. Browser verified commissioning costs, per-character selection, modified cooldown descriptions and combat locks. All 49 tests pass.

## 2026-10-06 — Expedition evidence and equipment matrix

Experiment 007 ran 7,200 fights across four compositions and all three Gatekeepers. Ritual's near-wall strength has exceptions: support-heavy parties can survive yet time out against regenerating shields. Steel speeds comfortable farming but slower abilities can cost survival. Preserve specialization; no balance changes.

Added entering level/equipment/name snapshots, enemy final health, actual siphoned healing, shield absorption and effective damage taken. An eight-room archive supports comparisons after party changes; older saves preserve known outcomes and mark missing metadata unrecorded. Failure guidance distinguishes timeout, party-wide cleave, siphoning and a fallen front line. All 57 tests passed, plus 30 one-hour journeys with complete save round-trips. Browser verified expanded reports and reload persistence without console errors. Next focus: exact combat numbers in preparation and character identity.

## 2026-10-06 — Inspect equipment-adjusted combat numbers

Roster and applicant cards now expose a Combat numbers disclosure with actual basic power, crit chance, ability magnitude, cooldown, shield cap, heal targeting/cleanse and bleed duration/armor behavior. Base attack is labeled Power to distinguish it from resulting damage. Engine and presentation share equipment power calculations, preserving fractional values until hit rounding. Removed the guardian description's fixed cooldown, which was incorrect with steel equipment. Open inspections follow character IDs through card refreshes and stay open when comparing equipment.

All 60 tests pass. Repeated the 2,400-fight equipment study with identical results to experiment 006, including validated terminal saves. Browser verified steel/ritual ranger damage and cooldown changes with the panel staying open; no console errors. This improves preparation without changing balance. Character identity, procedural ability variety and exhausted late-game Gold sinks remain the next design questions.

## 2026-10-06 — Recruit techniques with timing costs

Added six class-constrained recruit techniques after depth 10, using existing ward/heal/bleed primitives and tags. Half of future applicants retain standard abilities; existing characters retain their abilities. Technique snapshots persist in combat and reports. Recruit comparisons identify differing techniques; exact combat numbers reflect timing, scaling and equipment.

Experiment 008 ran two 6,300-fight passes, each validating every terminal save. Initial ranger variants improved almost every sampled matchup; reduced bleed throughput while retaining faster shots or stronger individual bleeds. Final outcomes vary by region and equipment. Sixty-nine tests cover deterministic generation, class constraints, nominal budgets, actual timing and backward-compatible saves. Thirty one-hour journey regressions remained comparable and round-tripped complete saves.

### Review after six further iterations

Playable loop and local persistence remain verified. Guild investments and fourth-slot recruitment change outcomes. Equipment and technique timing now interact rather than adding disconnected systems. Recruitment gains distinct ability identities, though names and longer character histories remain sparse. Stability has deterministic tests plus encounter/journey studies; enjoyment still requires human playtesting. Late-game Gold loses agency after finite facility ranks; character replacement, automated party policies and longer progression need further investigation. Next: examine coherent technique combinations and replacement economics before adding more classes or currencies.

## 2026-10-06 — Make recruit variety usable through mentorship

Experiment 009 tested all 27 technique combinations across three equipment arrangements and three Gatekeepers: 12,150 fights with validated saves. Combinations have meaningful differences without a universal replacement for standard abilities. Thirty mixed-investment journeys revealed a larger recruitment problem: fresh applicants have only about 31% of veteran attack power after an hour and 28% after four hours.

Added a depth-20 Mentorship hall for 450 Gold. Between fights, roster members can buy one level or an explicitly quoted affordable catch-up, capped by the highest roster level. Price uses remaining XP and a minimum Gold cost per level. Existing identity/equipment remain; mentoring grants no expedition rewards or fabricated history. Standard saves migrate to an unopened hall. This couples veteran experience, recruitment, Gold and roster decisions rather than adding a currency or unlimited self-leveling.

All 76 tests pass. Repeated recruitment economics with actual hall/hire/training spending raised one-hour recruit power to about 87% of veterans using savings; four-hour results reach 74%. This is a bridge, not proof every new recruit is frontier-ready. Browser progressed through depth 20, commissioned the hall, verified a 47-Gold catch-up from level 9 to 11 and increased stats, then reloaded with progress preserved. Mentoring controls are locked during combat. Next: test replacement fights after training and compare long-session Gold/investment decisions; character history remains a useful separate opportunity.

## 2026-10-06 — Individual Guild records and replacement combat

Experiment 010 resolves 3,888 paired frontier/Gatekeeper fights from 90 mixed-investment progression snapshots. One-hour mentoring restores frontier wins to 30/30 and next-Gatekeeper wins to 29–30/30, versus fresh replacement rates of 20/30 and 0–1/30. Four-hour replacements remain weaker than veteran parties even after training. Technique variants change durations without changing these cohort win counts; earlier equal-level studies remain evidence for build choices. Shared mixed-journey helper reproduces experiment 009 outputs exactly.

Added per-adventurer Guild records for completed-room victories/failures, downings, Gatekeepers, deepest victory and effective damage/healing/shield/cleanse totals. Reserves, mentorship and recalls do not invent battle history. Joining starts a complete record; legacy saves label the earlier past unrecorded and track future results. Open disclosures persist across card updates. All 84 tests pass, including live/offline parity, exact contribution attribution, migration and invalid histories.

Browser verified a legacy record with honest unavailable history, a new depth-5 Gatekeeper victory, precise individual contributions and reload persistence without console errors. Next: compare mentorship with cheaper equipment purchases, then study long-session Guild and expedition agency. Human playtesting remains necessary to assess enjoyment and price expectations.

## 2026-10-06 — Optional recovery expedition orders

Experiment 011 compared 720 next-Gatekeeper replacement fights with actual Gold spending. A 120-Gold Ritual focus pattern for the party often offers a cheap first bridge for a new Guardian/Cleric; mentorship remains more reliable and combining both helps later fights. Kept both choices and current costs.

Added recovery orders after depth 5. With automatic repeats enabled, a frontier defeat can queue 5/10/20 victories at 80% of deepest depth, avoiding Gatekeepers, before resuming push. A failed recovery farm stops automation. Recall, order changes, disabling repeats or disabling recovery cancels the queue. Defaults preserve stop-on-defeat. Queue status, fixed farm target, configuration locks and return summaries explain the current plan. No purchases are automated.

All 92 tests pass, including scheduling, victory counts, failure stops, cancellation, save validation and offline/live parity. Experiment 012 runs 240 unattended scenarios with complete save round-trips; longer recovery farms produce more XP and fewer losses in these uninvested samples. Browser used a temporary solo party to trigger frontier failure, confirmed the depth-18 queue and target lock, reloaded with the plan intact, then verified farm failure stopped orders. Restored the full party and normal farm controls; no console errors.

Next: study recovery with different investments and farm-depth choices, plus long-session Guild/expedition progression. The new order strengthens idle planning while retaining preparation choices; avoid adding unrelated automation or currencies.

## 2026-10-06 — Choose recovery farming depth

Experiment 013 ran 180 four-hour scenarios across three recovery depths and three investment policies. Shallower farms complete more rooms; deeper farms reduce failed pushes while frontier progress remains similar. Mixed investment avoids defeat in these samples. Added 60%/80%/95% recovery preferences and exact depth previews, using the existing policy API. Queued plans freeze configuration and preserve their chosen depth; old saves default to 80%.

All 96 tests pass. Repeated the study through the actual configuration API with identical results to the exploratory overrides, validating every complete save. Browser verified previews and preference persistence. No combat or price changes. Next: assess party-specific safety and longer-session capabilities, with current studies treated as evidence rather than proof of enjoyment.

## 2026-10-06 — Save complete party plans

Equipment and technique studies established useful alternative builds; repeatedly rebuilding their lineup and equipment creates avoidable preparation work. Added three named party plans after depth 5. Each snapshots member IDs, ordering and equipment. Applying between fights uses current levels and preserves Gold, XP, history and orders. Missing members produce a named warning and block the whole application; no silent substitution. Old saves receive empty slots, while malformed snapshots are rejected.

All 104 tests pass, covering independent snapshots, atomic failure, combat locks, progression preservation, offline persistence and migration. Browser saved four-member steel/ritual and three-member ritual plans, switched both ways, verified combat locks, completed a room and reloaded with plans intact. No console errors. Visual review caught and corrected cramped name-input styling at the normal narrow viewport.

### Review after five further iterations

The recruit/build/delve/invest loop remains playable and saved. Mentorship makes replacement recruits usable; individual records give their careers continuity; recovery orders support unattended farm-and-retry decisions; party plans make alternate preparations easy to revisit. These additions use existing Gold, roster, equipment and combat primitives without dependencies or disconnected currencies. Tests and bounded studies support mechanical stability and interacting decisions, but human enjoyment is unverified. Veteran capability progression after facility caps remains limited, names are repetitive, and the repeating three strata provide little discovery. Next: examine those constraints using longer-session evidence before expanding progression or content. Keep each improvement tied to Guild, adventurer and Delve interactions.

## 2026-10-06 — Measure veteran progression before extending caps

Experiment 014 runs sixty continuous 24-hour journeys with three members, four members, or four with Ritual focus. Each uses actual purchase/recruit/equipment/recovery APIs and validates its full save at four checkpoints (240 round-trips). Four-member parties cap Training/Infirmary after about 16–17 hours; three-member parties have not capped both after a day. Stronger parties accumulate millions of Gold after their caps. These policies assume active investment and do not represent a single offline absence.

The earlier gap is repeated content: four-member parties cycle the same three strata eleven times by the first hour, well before facility caps. Preserved runnable study, raw aggregates and limitations. The evidence changes the next priority from increasing upgrade ranks to a new Delve challenge using shared combat primitives and existing preparation choices. No gameplay balance changes in this checkpoint. Next: design and test the next region after the three-region opening, checking compositions and equipment before shipping its balance.

## 2026-10-06 — Mirror Halls create a new preparation problem

Added the fourth ten-depth stratum after the opening Rootways/Ember/Hollow sequence. Direct effective health damage reflects 15% to its attacker through the shared hit/shield machinery; bleed avoids reflection. The Silver Adjudicator also strikes the highest-base-attack living member every third attack. Reports and career counters include actual returned health damage and existing shield absorption. Old encounters retain recorded regions and default to zero reflection; preview indexing and save validation support all four strata.

Experiment 015 resolves 37,440 encounters across reflection strengths, levels, depths, compositions, equipment and Ranger techniques, validating every final save. Entry rooms remain accessible in the sampled builds, while Gatekeepers reward support, ritual equipment and bleed choices. Kept 15% reflection rather than the harsher 20%. Another 120 one-/four-hour journey saves validate continued progression. All 114 tests pass, including lethal retaliation, downed-actor timing, strongest targeting, exact live/offline parity, legacy encounters and invalid counters.

Browser advanced the established Guild through the new stratum, showed damage returning to the Ranger and Clerics despite a standing Guardian, completed the Adjudicator, and reloaded without errors. Earlier three-region experiments remain historical baselines; new study tools use the actual current region cycle. Further discovery and late-game capabilities still need work; this introduces one coherent challenge rather than solving the entire progression gap.

## 2026-10-06 — Wardens expand recruitment after charting Mirror Halls

Depth 40 now attracts Human/Dwarf Wardens using party-targeted shields. Their lower attack, lack of interception/healing/cleanse and timing-sensitive equipment preserve costs. Initial weak six-second wards lost all comparisons against a second Cleric; experiment 016 varies strength and cooldown across 51,840 validated encounters. Selected twice ability power every four seconds: useful Mirror/siphon matchups, with losses elsewhere and slow sustain builds. Sixty existing one-hour journey saves retain the prior mean depths.

Reports now distinguish effective shield granted by the caster from shield absorption by recipients. Storage caps exclude wasted grants; dead members receive no shields. Legacy grants remain unrecorded. All 124 tests pass, including generation gates, origins, timing, attribution, live/offline parity, plans and validation. Browser recruits a natural Warden after depth 40, mentors it from level 5 to 20 for 570 Gold, equips Ritual focus, swaps out the second Cleric and saves Sheltering party. Exact inspection shows 81 shield per living member every four seconds.

Next: study actual unequal-level replacement and Gold choices with the new class, then evaluate longer-session recruitment/discovery. The class expands available preparations; broader progression and human enjoyment remain unproven.

Browser completed the new party's depth-35 fight in 15 seconds. Brin granted 972 shield; Ilyra absorbed 203 damage through shields, while returned health damage totaled 52. Reload preserved the report and all three saved plans, including Sheltering party, with no console errors. Refreshed DEVELOPMENT_STATE.md to describe current behavior and priorities, leaving earlier findings in the experiment/log history.

## 2026-10-06 — Make recruit preparation costs visible

Experiment 017 resolves 3,664 eligible Warden/reference replacement or fourth-slot encounters from 90 unequal-level journey states. Fresh Wardens work as a fourth member in these cohorts, but replacing a veteran often needs equipment or mentorship. A fourth Cleric also succeeds; later trained reference replacements remain competitive. Recorded eligibility differences and party-wide ritual effects rather than treating all rates as paired class advantages.

Added applicant preparation quotes once the Mentorship hall can unlock. Shared mentorship math reserves hire and unopened-hall costs before calculating an affordable training target. Quote is pure and exposes total cost, mentor limit, insufficient Gold and full-roster cases. Hire, hall and training remain separate choices. No class/price changes. All 131 tests pass, including varied-budget comparisons with actual purchase sequences.

Browser previewed 65 Gold hire + 570 Gold training to level 20 for Mara. Separate actions reduced the treasury from 2,660 to 2,025 exactly, with reload persistence and no console errors. Next: evaluate actual Warden recovery safety and longer unattended outcomes, then continue meaningful Guild/discovery development.

## 2026-10-06 — Stop expedition pushes at a chosen destination

Experiment 018 resolves 840 four-hour unattended scenarios from one-/four-hour-old Guilds, with originals and fresh/prepared Warden replacements or fourth members at three recovery depths. Actual live ticks and offline restore match complete state in every case; all orders remain active and no recovery farm fails. Preserved recovery choices/default and class balance. This does not establish safety for every possible party.

Added optional destination depth, a policy named in the constitution. Zero preserves unlimited pushing. Reaching a destination pays rewards and milestones, then stops further pushes; manual farming stays available. Current combat finishes if a destination changes, and queued recovery locks edits. Eight new tests cover exact stopping, manual/farm behavior, in-flight edits, offline parity, recovery locks and migration/validation. All 139 tests pass.

Browser caught unreliable blur-only commits; an explicit Set destination button now commits stable drafts. The established Guild reached depth 50, received 292 Gold and stopped with no next encounter. Reload preserves destination 50 and stopped orders; farming remains available. The idle scene identifies the conquered destination. No console errors. Next: broader Guild/discovery capabilities and character identity, with existing recovery policies retained until evidence supports further changes.

## 2026-10-06 — Distinguishable origin names

Live recruitment reused Borin's name while another Borin was in the Guild. Added ten given and ten family names per origin and deterministic active-name avoidance. Starting/paid batches now generate sequentially; refill already did. Existing names and historical snapshots remain intact, including legacy duplicates. Naming still consumes one RNG draw and does not affect talent, class, technique or encounter seeds.

Experiment 019 compares the actual engine/content at immutable baseline 4db6b41. Twenty thousand full-capacity applicant batches have no new duplicates, preserve all non-name recruit fields/RNG, and 200 paired fights retain mechanical outcomes with validated saves. All 144 tests pass. Browser shows Aerin Thornsong, Veya Thornsong and Ilyra Oakshade alongside the unchanged existing Guild; applicants persist after reload and fit the narrow layout without errors.

### Review after six further iterations

Mirror Halls adds a mechanical threat; Wardens add preventive party protection; recruit preparation quotes expose investment costs; recovery evidence supports the current policies; destinations let players stop at preparation milestones; names now distinguish active generated characters. All additions use the existing roster, Gold, combat and save interfaces. Agency and coherent interactions have improved, and bounded tests/studies preserve playable state. The game still cycles four regions indefinitely, Guild capabilities remain finite, and there are no discovery/event expeditions or rare identity layers. Human enjoyment remains unverified. Next: investigate a meaningful exploration/discovery or Guild capability milestone, rather than adding more percentage settings or another cosmetic stratum.

## 2026-10-06 — Rootways surveys connect discovery to Guild equipment

Added depth-50 Cartography desk and survey orders using actual party combat in the highest conquered ordinary Rootways room. Victories can discover a Dawn seal blueprint with explicit Ranger scouting odds; automatic surveying stops on discovery/defeat. Commissioning remains a separate Gold investment. Captured entering purpose prevents mid-fight order edits from fabricating discoveries; old purposes remain unrecorded. Additive migrations preserve prior saves, equipment and reports.

Experiment 020 validates 14,400 paired equipment encounters and sixty four-hour survey continuations with exact live/offline parity. Initial -15% basics made Dawn weak; revised +10% basics with opening ability at 1s gives two sampled Ranger win advantages and eleven disadvantages versus usual steel/ritual slots. It remains situational, especially poor for some healing timings; small cohorts do not establish general dominance or enjoyment. Search averaged 3.1 attempts, max 14/196s. Study banks desk cost where needed, so affordability is not proven.

All 157 tests pass; opening simulation remains unchanged. Browser purchased desk, discovered blueprint with automatic stop, commissioned/equipped Dawn and completed a 7-second depth-49 fight. Inspection, report and reload retain correct timing/equipment; no warnings/errors. Current Guild stays at frontier/destination 50, farm 49, auto off, Ilyra wearing Dawn. Previous party plans retain old equipment. Next: economic opportunity costs and broader technique/near-frontier comparisons before expanding discovery rewards.

## 2026-10-06 — Test funded discovery choices before changing prices

Experiment 021 uses sixty naturally funded first-depth 50 checkpoints, seven investment/equipment policies and two durations, validating 840 final saves. Sources have 993 Gold, levels 22, facilities 6/6; all Dawn purchases complete from rewards in 54.92s on average. Dawn Ranger reaches mean depth 292.40 after an hour versus facilities 270.62 and free ritual Ranger 275.02. Fourth Cleric is a strong cheaper alternative (mean 289.97, capability spending 1,047.27). Unused Dawn mean 270.05 separates survey/purchase overhead from equipping it. Policies actively buy/manage every tick; no claim of universal affordability, unattended play or human enjoyment.

Another 21,600 fixed-strength paired Ranger encounters vary standard/Quick/Deep techniques. Dawn improves wins over best existing equipment in 10 groups, loses in 6 and ties 119. Some Quick/Deep encounters favor ritual, preserving specialization. Kept combat/prices. Exposed separate commission cost and desk-plus-pattern total before Cartography purchase; locked workshop label now retains price. Browser verifies current costs; no warnings/errors and 157 tests remain green. Next: distinct recruit identity or Delve preparation interaction beyond region repetition/single discovery. Avoid more pricing matrices or similar item variants without new evidence.

## 2026-10-06 — Conditional Cleric healing becomes party protection

Depth 60 now permits newly generated Clerics with Aegis mending. Heal weakest living ally first, then unused healing becomes wards for every living member; caps exclude waste and caster grants/recipient absorption stay distinct. Existing healing, cleanse, equipment, reports and save primitives are reused. Old characters/applicants stay unchanged; gated save snapshots reject premature technique data.

Experiment 022 preserves 19,440 single-ally prototype fights (no sampled win advantages) and 19,440 party-overflow fights. Selected 2.25-power/5s/one ward per unused point reduces direct healing 10% and improves six groups over standard while losing eight. Four advantages/eleven disadvantages versus the best older technique in matching gear. Conditional benefits and losses support specialization; sample sizes do not prove general superiority or enjoyment.170 tests pass, with explicit partial/full/capped/dead-target behavior, equipment tagging, attribution and four-hour offline parity. Opening simulation unchanged.

Browser reached milestone 60, generated Human Aegis Cleric Corin Ash, paid 85 hire+1,113 mentoring to level 28 and replaced Brin with Dawn-equipped Corin. Inspection 140 healing/ward per living ally at 1s then 5s. Mirror Gatekeeper 35 victory 10s records 12 healing and 1,072 shield granted; reload persists technique/equipment/report and no errors. Current orders farm 35/auto off, destination 60; Brin reserve, existing plans preserved. Next: actual unequal-level hybrid preparation/replacement economics before further technique expansion.
