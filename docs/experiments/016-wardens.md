# Experiment 016 — A recruitment milestone for party protection

Depth 40 expands Human/Dwarf recruitment to Wardens. They use the existing shield effect with a party target, rather than a separate defensive resource. Prototype stats: 90 HP, 7 attack, 3 armor, three-second basics. Final Sheltering ward grants twice ability power to each living party member every four seconds. Recipient shield storage stays capped at 60% maximum HP. Wardens do not intercept, heal, cleanse or revive. Damage, ward equipment, mentorship, saved plans and combat snapshots use the existing interfaces.

Caster reports now count effective shield granted after storage caps. Damage absorbed remains attributed to its recipient, including shields from another member. These are different measurements: granted shield can remain unused. Legacy reports and in-flight rooms keep grant totals unrecorded, rather than inventing earlier contribution values. Individual career shield-absorption history retains its existing meaning; grant totals are encounter reports only.

## Evidence and tuning

The initial 0.8-power/six-second ward was inferior to a second Cleric in every sampled paired comparison. Stronger six-second wards still arrived too late or put most protection on members who did not need it. The final study varies both strength and timing rather than adding more tiny attack bonuses.

`node tools/warden-study.js` validates 51,840 fights: four scales (0.8/1.2/1.6/2), two cooldowns (4/6), three levels (12/20/28), four Gatekeepers (45/55/65/75), six four-member compositions, three equipment arrangements and 30 seeds. Techniques are standard, Training/Infirmary rank 2, and all members are equal level. Warden origin choices remain constrained. Full aggregates: `016-warden-results.csv`. Scale/cooldown are controlled content overrides within the study, not player settings.

Chosen scale 2/four seconds has useful tradeoffs:

- Level 28/depth 75/no equipment: Guardian/Ranger/Cleric/Warden wins 30/30, versus 25/30 with a second Cleric. Mean downings fall from 1.8 to 0.3; mean duration is 29.5s versus 31.4s.
- Level 20/depth 65/ritual: Warden/Ranger/Ranger/Cleric wins 30/30 versus 13/30 with a Guardian. At level 28/depth 75/steel, the Warden version wins only 2/30 versus Guardian 6/30. The new class does not simply replace the frontline class everywhere.
- Three Wardens plus a Cleric can survive some difficult rooms, but lose time: level 20/depth 45/ritual times out at 180 seconds in all 30 encounters with everyone still standing. At depth 75 they win, taking a mean 124.9 seconds. Preserve this unusual sustain build and its damage cost.
- Older classes retain faster easy-room clears, stronger direct attacks, concentrated shielding, interception or restorative healing. Wardens introduce preventive party protection with meaningful timing/equipment interactions.

Twenty one-hour journeys for each existing investment policy validate another 60 terminal saves. Mean depths remain identical to the recorded Mirror regression: training 229.0, mixed 253.8, fourth Ranger 344.0. Those policies do not select Wardens; they check that expanding the applicant pool does not disrupt their established progression, not that Warden recruitment economics are solved.

## Verification and next work

124 tests pass. New checks cover gated and deterministic generation, coherent origins, recipient-specific caps, living-only targets, effective caster attribution, equipment timing, Guardian interception, exact live/offline parity, saved plans, honest legacy counters and malformed/premature recruits. Clearing depth 40 announces availability without replacing old applicants.

Browser verification recruits a naturally generated Warden after the depth-40 milestone, uses the existing Mentorship hall and Ritual focus, assigns it in place of a second Cleric and saves that preparation. Exact Combat numbers explain shielding all living members and its recipient caps. Completed combat, report attribution and reload persistence are checked before delivery.

Next: evaluate real replacement economics and recovery policies with Wardens, especially unequal recruit/veteran levels. Equal-level encounter wins do not establish whether an untrained level-5 recruit is useful to a level-20 party. Character names and broader discovery remain sparse; keep new content tied to preparation and progression evidence.
