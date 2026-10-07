# Experiment 008 — Recruit techniques

## Hypothesis and method

Origins and small talent rolls produced stat differences, but every member of a class had identical ability timing. Six class-constrained techniques reuse the existing shield/heal/bleed effects, targets and tags. New applicants can roll them once depth 10 is conquered; half retain standard abilities. Existing adventurers and applicants retain their original technique. Technique is immutable, so recruitment and party selection determine the available combinations. Workshop equipment applies its existing tagged modifiers and cooldown cost.

`node tools/technique-study.js` runs 6,300 bounded encounters per pass: 100 seeds, balanced three-person parties, levels 12/20/20 at depths 35/45/55, training/infirmary rank 2, no equipment/all steel/all ritual, standard baseline or one altered class. Every terminal save round-trips. This samples timing interactions, not full recruitment economics or all party compositions.

## Iteration and results

First pass ranger variants exceeded standard theoretical sustained throughput by 5–7% and improved nearly every sampled matchup. Lowered their bleed scales: Quick barbed shot from .30 to .25, Deep barbs from .85 to .78. Their final combined direct-plus-four-tick ability throughput is approximately 96%/98% of standard before armor, retaining earlier shots or stronger bleeds as the benefit. Guardian/healer variants remain between 93% and 117% of standard nominal throughput, with shield caps, overheal, timing and equipment changing effectiveness.

Repeated the full 6,300 encounters after this adjustment:

| Depth/equipment | Standard | Watchful | Steadfast | Quick shot | Deep barbs | Quiet mend | Greater mend |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 35/none | 22% | 19% | 37% | 26% | 20% | 33% | 15% |
| 35/steel | 2% | 2% | 2% | 1% | 2% | 0% | 14% |
| 45/steel | 74% | 52% | 61% | 80% | 82% | 1% | 62% |
| 55/ritual | 98% | 89% | 98% | 93% | 98% | 48% | 74% |

At depth 35 ritual, all variants win; Quick shot mean 34.3s versus standard 34.4s and Deep barbs 35.5s. At depth 45 ritual, Quick shot 22.4s, standard 22.9s, Deep barbs 23.5s. Frequent small healing suffers heavily under steel's flat +2-second cooldown cost; bigger slower heals can recover value in some fights. Standard techniques remain useful. Differences are worth preserving; these samples do not establish universally optimal parties or player enjoyment.

## Validation and implications

69 tests pass, including 3,000 reproducible post-unlock generations, class constraints, nominal power budgets, actual ability timing/magnitude, tagged equipment interaction, four bleed ticks, old-save defaults and archived metadata rejection. Thirty one-hour journey regressions saved/reloaded: training mean depth 238.5/3.4 defeats, mixed 248.1/none, fourth 339.3/none. Recruitment RNG consumes an additional draw for new veteran applicants, so exact late encounter seeds change; progression remained comparable.

Browser checks recruitment, technique comparison, party assignment, equipment and a completed room with Quiet mending, then save persistence. Next experiments should examine combinations and recruit replacement economics, not expand the ability vocabulary blindly.
