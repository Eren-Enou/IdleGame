# Experiment 009 — Technique combinations and recruit replacement

## Questions and method

Do technique combinations produce useful outcomes? Can fresh recruits participate after veterans accumulate experience? `node tools/recruit-study.js` compares all 27 guardian/ranger/cleric technique combinations, three equipment arrangements and depths 35/45/55, with 50 seeds: 12,150 bounded fights, all terminal saves validated. Levels are 12 at depth 35 and 20 at depths 45/55; training/infirmary are rank 2. The study also runs ten mixed-investment journeys at 600/3,600/14,400 seconds each, following actual facility costs and farming ten victories after defeat.

## Findings

At depth 35 unequipped, standard abilities win 14%, while Steadfast/Quick shot/standard wins 44%; Watchful/Quick shot/Greater wins 6%. With steel, Steadfast/Deep barbs/Greater wins 20% versus standard 0%. At depth 45 steel, that same combination wins 86% versus standard 70%, but Quiet mending combinations can win 0%. At depth 55 ritual, Steadfast/standard/standard and all standard win 96%; standard/Deep barbs/Quiet wins 42%. These are win rates among 50 seeds, not universal balance claims. All ritual combinations win at depths 35/45; no equipment and steel fail at depth 55 in this sample. Preserve the combination effects instead of changing values further.

Recruit experience severely limits usable variety:

| Session | Veteran level | Fresh recruit level | Recruit/veteran power |
| --- | --- | --- | --- |
| 10 minutes | 25.5 | 6.5 | 44% |
| 1 hour | 102.5 | 25.4 | 31% |
| 4 hours | 255.5 | 62.9 | 28% |

Technique differences cannot normally offset such a gap. This supports a route to train replacements rather than additional recruit content.

## Intervention and repeated economics

Mentorship hall unlocks at depth 20 for 450 Gold. Between fights, Gold trains a lower-level roster member up to the highest roster level. One-level and affordable catch-up actions quote exact targets and costs. Price is one Gold per four remaining XP required, with a floor of ten Gold per purchased level. Training retains identity/equipment and grants no combat rewards/history. Highest-level members cannot purchase self-progression; veterans supply the ceiling. Existing saves default to an unopened hall.

After the same journeys, the study offers one freshly generated ranger and pays the hall, hire and training costs from available savings. It does not model searching for the desired technique; therefore these are optimistic access scenarios. Results include cases unable to afford the hall/hire:

| Session | Mean available Gold | Mean trained level | Trained/veteran power | Mean total spent |
| --- | --- | --- | --- | --- |
| 10 minutes | 440.8 | 9.4 | 53% | 280.5 |
| 1 hour | 11,269.4 | 85.7 | 87% | 11,147.0 |
| 4 hours | 53,479.5 | 180.2 | 74% | 46,676.6 |

This makes banked Gold relevant to party experiments while retaining investment tradeoffs. It does not prove every mentored replacement can defeat the frontier, nor establish that players enjoy the price. The hall cannot provide unlimited veteran levels, so later Guild/expedition agency remains a separate question.

## Validation

76 tests pass: frontier/cost unlock, remaining XP pricing, affordable bounded target search, training stat effects, identity preservation, combat locks, insufficient funds, malformed modes, legacy migration, banked XP and finite extreme-level saves. Existing deterministic combat and progression tests remain green. Browser checks the actual frontier unlock, purchase, level/stat changes and persistence; see development log for the final runtime result.
