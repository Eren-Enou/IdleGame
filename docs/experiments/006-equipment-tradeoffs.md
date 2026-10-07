# Experiment 006 — Equipment gives existing roles alternate builds

Date: 2026-10-06. Command: `node tools/equipment-study.js`.

Hypothesis: basic-attack versus tagged-ability tradeoffs create preparation choices without expanding class/currency count. Guild workshop opens at depth 10. Commissioning each pattern costs 120 Gold once and allows any adventurer to equip it; changing equipment is free between fights. One item per adventurer; no changes during combat.

Soldier's seal multiplies physical basic attacks by 1.35, but adds two seconds to ability cooldowns. Ritual focus multiplies Ward/Heal/Bleed abilities by 1.35, but multiplies basic damage by 0.8. Definitions use shared trigger/tag modifiers, not character-specific overrides. Stats/XP/origins remain intact.

Conditions: 100 seeds per cell, guardian/ranger/cleric, training/infirmary rank 2, levels 8 or 12, depths 25/35/45. Compare no equipment, all steel, all ritual, and ritual guardian/steel ranger/ritual cleric. This isolates build behavior at equal character/Guild power; it does not equalize cumulative Gold spent on pattern unlocks. Specialist setup requires both patterns. All 2,400 terminal saves validate.

Key results:

| Level / depth | None | All steel | All ritual | Specialists |
| --- | --- | --- | --- | --- |
| 8 / 25 | 100%, 22.5s | 100%, 20.5s | 100%, 22.2s | 100%, 23.6s |
| 12 / 25 | 100%, 17.5s | 100%, 15.7s | 100%, 17.7s | 100%, 18.2s |
| 12 / 35 | 22%, 41.2s | 2%, 33.4s | 100%, 34.4s | 99%, 37.2s |

At level 8/depth 35 and both power levels/depth 45, all setups failed. Gear is not a universal substitute for progression. Ritual greatly improves survival against the Root Gatekeeper at a near-wall power level; steel speeds up easier farming but reduced shield/heal frequency is dangerous in longer encounters. Specialist is not automatically best, which is a useful opportunity for discovery.

Interpretation: retain the system. It improves existing party preparation through understandable, asymmetric choices. Powerful ritual specialization is not itself evidence of harmful dominance; steel has farming value. More Strata/power-level testing is appropriate before tuning or expanding item count.

Validation: commissioning, affordability/unlock restrictions, primitive-tag matching, actual shield/physical damage effects, equip lock and save compatibility. Existing saves receive no equipment; progress is preserved. Browser commissioned both patterns (correct 240 Gold deduction), selected individual equipment, and verified selectors/cooldown descriptions lock in combat. Final regression count recorded in development state.
