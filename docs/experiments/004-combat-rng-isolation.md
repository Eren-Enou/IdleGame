# Experiment 004 — Independent combat randomness

Date: 2026-10-06. Commands: `npm test`, `npm run simulate`, `node tools/journey-study.js`.

Objective: make a fight's seed useful for investigation without unrelated applicant generation changing critical hits. Each encounter now has its own RNG, initialized by an explicit seed drawn from the Guild RNG. Recruitment remains on the Guild RNG. A regression creates 100 extra recruits during one of two otherwise identical fights and verifies identical reports.

Existing version 1 fights initialize the new RNG from their saved Guild RNG, preserving the next draw as closely as possible. Existing reports receive empty timelines and unknown seeds, without inventing historic event details. Future fights and reports store bounded event timelines. This is reproducibility infrastructure, not a player replay feature; full party/encounter conditions are still needed to reproduce a battle.

Result: all 40 tests pass. Repeated 600-run opening study: no-investment mean depth 28.9, training 157.8, health 59.8, effectively unchanged from experiment 002. Repeated 150 one-hour journeys: training mean 243.4 with 3.0 defeats, mixed 250.3 with no defeats, fourth 341.8 with no defeats. All late-session saves round-trip.

Interpretation: independence removes hidden recruitment/combat coupling with no material opening balance change. Live/last-room timelines should help players recognize shields, heals, bleed, critical hits and boss mechanics. Visual verification remains necessary; test counts alone cannot establish that the timeline reads well.
