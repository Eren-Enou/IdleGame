# Experiment 017 — Unequal-level Warden recruitment

`node tools/warden-recruit-study.js` samples 90 mixed-investment journey states after 10 minutes, one hour and four hours. It resolves 3,664 eligible frontier/next-Gatekeeper encounters, validating every terminal save. Only Guilds that reached depth 40 can generate Wardens. Each case hires a standard-technique recruit, then optionally buys a Ritual focus pattern, Mentorship hall and the actual affordable catch-up. Alternatives replace the Guardian, replace the Cleric, or buy quarters and add a fourth member. Reference candidates are the replaced class or a fourth Cleric. No veteran is dismissed. Raw output: `017-warden-recruit-results.csv`.

Gold and actual entering levels constrain comparisons. Ten-minute cases have only 23/30 unlocked Guilds; hall/equipment affordability reduces some strategy cohorts to 15 or 7. Those rows are not a matched causal comparison across strategies. One- and four-hour cohorts have 30 eligible cases each.

## Next-Gatekeeper observations

| Duration | Warden use | Fresh wins | Ritual wins | Mentor wins | Mentor + ritual wins |
| --- | --- | ---: | ---: | ---: | ---: |
| 1h | Replace Guardian | 0/30 | 29/30 | 30/30 | 30/30 |
| 1h | Replace Cleric | 6/30 | 29/30 | 30/30 | 30/30 |
| 1h | Add fourth | 30/30 | 30/30 | 30/30 | 30/30 |
| 4h | Replace Guardian | 0/30 | 12/30 | 14/30 | 26/30 |
| 4h | Replace Cleric | 0/30 | 1/30 | 16/30 | 20/30 |
| 4h | Add fourth | 30/30 | 30/30 | 30/30 | 30/30 |

One-hour applicants average level 25.7, with 272-Gold hire price; catch-up brings them to about level 98 and spends roughly 14,300 Gold including hall/hire. Four-hour applicants average level 64.5 and cost about 660 Gold to hire; catch-up reaches about level 225 and consumes roughly 73,600 Gold including hall/hire. Ritual strategies spend 120 extra Gold and strengthen all equipped members, so gains cannot be attributed solely to the recruit.

A fourth fresh Warden succeeds in these cohorts, but a fourth Cleric does too. This supports keeping fourth-slot investment meaningful without declaring the new class mandatory. Later trained reference replacements remain competitive or better: four-hour mentorship+ritual wins 28/30 for a new Guardian or Cleric, versus Warden 26/30 and 20/30. Class substitution costs differ from filling an empty slot. Equal-level encounter results did not reveal that distinction.

## Improvement

Kept class stats and prices. Added pure applicant training previews using the same mentorship price/search implementation as actual roster purchases. Hire and unopened hall costs are reserved before selecting a catch-up target. Quotes expose mentor, target, costs and availability; a low budget shows the first unaffordable lesson, while a full roster flags that freeing space changes the quote. Previewing cannot advance combat, consume RNG, spend Gold or recruit. No purchase is automated or bundled.

131 tests pass. New tests compare quotes with actual separate purchase sequences for owned/unopened halls, varied budgets/classes, banked XP, mentor limits and unavailable cases. Browser previewed Mara's 65-Gold hire plus 570-Gold training to level 20, then completed those actions and confirmed the exact 635-Gold treasury reduction and reload persistence. No console errors.

Next: Warden recovery safety and longer unattended outcomes, using actual policies and unequal-level recruitment. Broad capability/discovery progression and human enjoyment remain open; avoid interpreting one-hour sampled wins as universal balance.
