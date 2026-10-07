# Experiment 013 — Recovery depth and investment

## Method

Investigate the fixed 80% recovery depth across three investment policies before exposing more planning choices. `node tools/recovery-depth-study.js` runs 180 four-hour journeys from fresh balanced Guilds: 20 seeds, recovery depths 60%/80%/95%, ten recovery victories, and no investment/training-only/mixed investment. Facilities are purchased whenever affordable in the investment scenarios; this is a simulated active spending policy, not an automatic purchase feature. Recovery enables after the first Gatekeeper; target depths avoid Gatekeepers.

The initial exploratory pass overrides queued targets to test alternatives to the old fixed rule. The final pass uses the implemented public configuration API and reproduces every aggregate result. All complete saves round-trip.

## Results

| Investment / depth percentage | Mean frontier | Mean victories | Mean defeats | Active orders |
| --- | --- | --- | --- | --- |
| None / 60% | 222.6 | 1,087.5 | 86.7 | 20/20 |
| None / 80% | 230.7 | 928.0 | 70.0 | 20/20 |
| None / 95% | 230.8 | 830.0 | 60.4 | 20/20 |
| Training / 60% | 556.1 | 995.9 | 44.1 | 20/20 |
| Training / 80% | 561.0 | 902.1 | 34.4 | 20/20 |
| Training / 95% | 558.7 | 848.0 | 29.2 | 20/20 |
| Mixed / all three | 631.2 | 631.2 | 0.0 | 20/20 |

Shallower recovery produces more completed rooms; deeper recovery reduces failed frontier attempts with similar frontier depth. Mixed investment eliminates recovery triggers in this sample, so depth preference is irrelevant for those parties. These results do not guarantee a chosen depth remains safe after roster changes or establish player enjoyment.

## Decision and validation

Expose 60%, 80% and 95% preferences alongside victory count, with a preview of the resulting depth. Keep 80% as the save/default migration behavior. Freeze both parameters while a queued recovery is active; normal cancellation controls allow changing the next plan. Preserve a queued depth exactly across reloads. No combat balance values changed.

96 tests pass, including exact scheduling at each preference, active-plan locks, older queue migration and rejection of unsupported/non-numeric preferences. Browser verified 60%/95% previews, current depths 13/21 at frontier 23, and reload persistence. Next: inspect character/party-specific safety and longer progression needs rather than adding finer sliders without evidence.
