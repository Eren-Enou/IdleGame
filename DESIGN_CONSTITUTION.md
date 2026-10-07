# Idle Fodder — Design Constitution

**Status:** Foundational design authority  
**Working title:** Idle Fodder

This document defines the identity, design priorities, constraints, and autonomous-development rules for **Idle Fodder**.

It is not a complete game design document.

It intentionally leaves large portions of the game undefined so that systems can evolve through implementation, playtesting, simulation, experimentation, and future design decisions.

When determining what to implement, modify, remove, rebalance, or investigate, this document should be treated as the project's primary design authority.

If a proposed feature conflicts with this constitution, preserve the constitution unless the contradiction has been explicitly approved and documented as a deliberate design change.

---

# 1. Core Concept

Idle Fodder is an **idle/incremental fantasy guild-management game combined with an autobattler and procedural team-building game**.

The player is the Guildmaster of an adventuring organization established around an enormous and apparently endless dungeon known as **the Delve**.

The Guild recruits adventurers from across an increasingly strange fantasy world.

The player builds parties from those adventurers and sends them into the Delve.

Expeditions primarily resolve automatically.

Through expeditions, adventurers:

- fight enemies;
- gain experience;
- acquire equipment;
- collect resources;
- discover new areas;
- encounter unusual events;
- suffer injuries and consequences;
- develop into increasingly unusual builds;
- push the Guild's deepest known frontier.

Resources and discoveries from the Delve are invested into the Guild.

Guild development improves recruitment, adventurer development, equipment, expedition capabilities, resource production, and access to additional systems.

The foundational loop is:

**Recruit → Build Parties → Delve → Gain Resources and Discoveries → Improve the Guild → Recruit and Build Better Parties → Delve Deeper**

The game should remain understandable at this level even after substantial expansion.

---

# 2. The Three Pillars

Idle Fodder is built around three mutually supporting pillars.

## The Guild

The Guild is the player's primary source of permanent incremental progression.

It represents infrastructure, accumulated knowledge, economic power, recruitment reach, and institutional development.

The Guild should grow from something modest and inefficient into something extraordinary.

Guild development should create meaningful improvements rather than simply producing larger numbers.

---

## The Adventurers

Adventurers are the player's primary source of buildcrafting, experimentation, personality, and randomness.

They should not be interchangeable stat blocks.

Their species, origin, archetype, class, traits, abilities, equipment, affinities, history, and unusual properties can interact to create distinct mechanical identities.

The player should regularly encounter adventurers that make them reconsider how they construct a party.

---

## The Delve

The Delve is the game's primary challenge, progression frontier, resource source, and mystery.

It should simultaneously support:

- farming;
- progression pushing;
- exploration;
- build testing;
- loot acquisition;
- discovery;
- strange events;
- long-term escalation.

Today's dangerous frontier should be capable of becoming tomorrow's routine farming territory.

The Delve must be capable of continuing beyond the amount of content individually handcrafted by developers.

---

# 3. Player Fantasy

The player is **not primarily the hero**.

The player builds the organization that produces heroes.

The player should feel like they are constructing and continually improving a complex adventuring machine.

Their major decisions include:

- whom to recruit;
- whom to dismiss or retain;
- how to construct parties;
- how to equip adventurers;
- which synergies to pursue;
- where expeditions should go;
- what risks expeditions may take;
- which resources to pursue;
- what Guild systems to develop;
- which discoveries deserve investigation;
- when to farm and when to push deeper.

The player should influence outcomes primarily through preparation, organization, investment, and strategic policy rather than continuous manual combat input.

---

# 4. Idle Does Not Mean Passive

The game may progress without constant player attention, but the player must remain strategically relevant.

Automation should execute the player's decisions rather than eliminate the need for them.

A good idle system allows the player to say:

> "This is what I want this part of my Guild to accomplish."

The system then attempts to execute that intention over time.

Examples include:

- farming policies;
- exploration priorities;
- retreat thresholds;
- resource preferences;
- party composition;
- equipment priorities;
- recruitment priorities;
- risk tolerance.

The player should be able to leave the game and later return to meaningful results generated by decisions they previously made.

---

# 5. Progression Philosophy

Progression should frequently feel noticeable.

Especially during early and middle progression, improvements should regularly cause visible changes in capability.

Avoid relying excessively on tiny percentage increases such as:

> +0.2% damage

Incremental bonuses may exist, but major milestones should often provide:

- new mechanics;
- new choices;
- new synergies;
- new automation;
- new recruitment opportunities;
- new Delve access;
- new forms of progression;
- substantial increases in capability.

The desired feeling is:

> "My Guild can do something now that it could not do before."

Not merely:

> "The number increased."

---

# 6. Layered Progression

Progression may involve multiple resources and systems, but complexity should unfold gradually.

Early progression should be understandable.

A possible early structure is:

**Gold → Guild Improvements → Stronger Expeditions → More Gold**

Later systems may introduce additional resources such as materials, knowledge, reputation, magical resources, artifacts, or Delve-specific currencies.

New resources should exist because they enable meaningful decisions or systems.

Do not add currencies merely to increase apparent complexity.

Older resources should not automatically become meaningless simply because new resources exist.

---

# 7. Adventurer Generation

Adventurers should be procedurally varied but mechanically coherent.

A character may eventually be composed from elements such as:

- species;
- culture;
- origin;
- archetype;
- class;
- specialization;
- traits;
- affinities;
- abilities;
- equipment;
- history;
- unusual properties.

These layers should influence mechanics wherever practical.

Flavor and mechanics should reinforce one another.

An adventurer from a culture famous for storm magic should be more likely to interact mechanically with storm-related systems.

A strange trait should ideally do something rather than exist only as descriptive text.

---

# 8. Structured Randomness

Randomness must operate inside rules.

The game should almost never generate arbitrary mechanics from unrestricted randomness.

Procedural generation should select, combine, modify, and contextualize known mechanical primitives.

Random generation should produce:

**unexpected combinations of understandable rules**

rather than:

**unpredictable rules with no shared structure**

This distinction is fundamental.

---

# 9. Shared Mechanical Language

Gameplay systems should communicate through a common mechanical vocabulary.

Wherever practical, mechanics should use shared concepts such as:

- damage;
- healing;
- shields;
- health;
- resources;
- critical hits;
- attack speed;
- movement;
- positioning;
- summons;
- statuses;
- elemental or conceptual affinities;
- death;
- resurrection;
- cooldowns;
- triggers;
- stacks;
- buffs;
- debuffs;
- tags.

Abilities, characters, items, enemies, traits, Delve modifiers, and other systems should reuse these concepts rather than inventing isolated special cases.

For example, an ability may be represented conceptually through structures such as:

**Trigger → Condition → Target → Effect → Scaling → Modifier**

Examples:

**On Critical Hit → Target Enemy → Apply Bleed**

**Every 5 Seconds → Lowest-Health Ally → Heal based on Wisdom**

**Ally Dies → Self → Gain Attack Speed for 10 Seconds**

This shared vocabulary is intended to produce large combinatorial possibility spaces from a manageable number of underlying rules.

---

# 10. Tags Are Mechanical Contracts

Tags should not merely describe content.

Tags should allow systems to interact.

An ability tagged:

**Fire / Projectile / Burn**

should automatically interact with systems that modify Fire, Projectile, or Burn mechanics.

An item introduced years later should be able to improve Burn without having to explicitly know every Burn ability that exists.

New content should preferentially compose existing tags.

Adding a new foundational tag should be treated as a meaningful system expansion and should be justified.

---

# 11. Coherence Before Variety

Procedural generation should produce internally coherent results.

When an adventurer is generated, early decisions should constrain later decisions.

Example:

**Archetype:** Defender  
**Theme:** Blood  
**Origin:** Vampire Kingdom

The resulting ability vocabulary should strongly favor concepts such as:

- defense;
- health;
- retaliation;
- sacrifice;
- healing;
- blood;
- damage received.

The generator should not casually introduce unrelated concepts simply to increase randomness.

Characters should feel generated from identities, not assembled from a shuffled dictionary.

---

# 12. Normality Makes Weirdness Valuable

Not everything should be bizarre.

Common and recognizable fantasy concepts provide the baseline that makes unusual content exciting.

The majority of early characters should be relatively understandable.

Examples:

- Human Warrior;
- Elf Ranger;
- Dwarf Cleric;
- Goblin Alchemist.

Increasing rarity may permit increasingly unusual combinations.

At the extreme end, the game may produce characters whose mechanics challenge normal assumptions.

These characters do not need to be objectively stronger.

They need to be interesting.

The player should occasionally encounter something that produces:

> "What the hell is this?"

That reaction should remain uncommon enough to matter.

---

# 13. Weirdness Must Still Obey the Engine

Rare content may violate expectations.

It should not violate fundamental game invariants.

Examples of acceptable weirdness:

- healing that intentionally damages a particular undead character;
- a character whose cooldown behavior is inverted;
- an adventurer that benefits when allies die;
- a sentient weapon functioning as an adventurer;
- a character interacting unusually with death.

These concepts should still use stable game-system interfaces and understandable mechanical rules.

Avoid arbitrary one-off implementations that cannot interact with the rest of the game.

---

# 14. Builds Should Be Discovered

The game should encourage players to discover powerful combinations.

Synergy is desirable.

Occasionally broken-feeling builds are desirable.

Unexpected mechanical interactions are desirable.

The game should not immediately eliminate every unusually powerful combination.

The balance principle is:

**Broken builds are fun. Dominant builds are dangerous.**

A build becoming extremely powerful through several interacting systems can be an exciting reward.

A build that is consistently optimal regardless of circumstance reduces meaningful choice and should be investigated.

---

# 15. Power Budgets and Constraints

Procedurally generated abilities, items, traits, and similar content should eventually use systematic balancing tools.

Power should have cost.

Powerful effects may be balanced through:

- cooldowns;
- resource costs;
- conditions;
- positional restrictions;
- limited uses;
- self-damage;
- vulnerability;
- delayed activation;
- narrow targeting;
- risk;
- opportunity cost.

Restrictions can make powerful effects more interesting.

A bizarre item with tremendous upside and severe disadvantages may be more compelling than a clean numerical upgrade.

Balance systems should permit risky, specialized, and situationally absurd combinations.

---

# 16. Recruitment as Gameplay

Recruitment should become a major recurring source of anticipation.

The Guild should periodically attract applicants.

Guild development may influence:

- recruitment frequency;
- applicant count;
- applicant quality;
- origins represented;
- rarity weighting;
- available classes;
- available species;
- strange-character probability;
- level ranges.

Checking available recruits should feel similar to opening randomized rewards while remaining part of normal gameplay rather than monetization.

The player should regularly face interesting decisions about limited roster space, investment, and potential.

---

# 17. The Fantasy World Exists Through Its People

The game does not need to simulate an entire open world.

The larger fantasy setting may primarily be experienced through:

- adventurer origins;
- cultures;
- equipment;
- events;
- factions;
- stories;
- recruitment pools;
- discoveries;
- Delve connections.

A newly introduced region should ideally affect gameplay.

Examples:

A storm kingdom may introduce lightning-related adventurers.

An undead empire may produce characters with unusual death interactions.

A realm outside conventional time may introduce cooldown or sequence mechanics.

The world should feel large because its inhabitants and systems imply a larger reality.

---

# 18. The Delve

The Delve should be effectively unbounded in depth or progression potential.

It should not feel like a single repeating corridor.

The Delve may be organized into **Strata**, regions, biomes, anomalies, branches, or other thematic structures.

Each major region should ideally influence:

- enemy composition;
- environmental mechanics;
- resource availability;
- events;
- loot;
- hazards;
- bosses;
- discoveries.

Depth progression should regularly expose players to new problems rather than simply larger enemy statistics.

---

# 19. Expedition Structure

An expedition should function as a partially procedural run.

Possible encounter types may include:

- normal combat;
- elite combat;
- bosses;
- treasure;
- events;
- camps;
- hazards;
- merchants;
- shrines;
- anomalies;
- NPC encounters;
- unknown rooms.

Routes may branch.

The player may directly make some decisions or delegate them through expedition policies.

Expeditions should generate outcomes worth reviewing afterward.

---

# 20. Expedition Policies

Automation should support configurable behavior.

Possible expedition policies include:

- risk tolerance;
- retreat threshold;
- preferred resources;
- preferred encounter types;
- willingness to fight elites;
- willingness to challenge unknown bosses;
- desired maximum depth;
- preference for exploration versus farming.

Different parties should be able to perform different strategic roles.

The game should provide meaningful reasons to maintain multiple teams rather than converging permanently on one universal party.

---

# 21. Farming, Pushing, and Exploring

The Delve should support at least three broad expedition goals.

## Farming

Previously conquered territory provides relatively reliable resources.

## Pushing

Powerful parties attempt to extend the Guild's deepest known frontier.

## Exploring

Parties seek anomalies, unusual events, undiscovered routes, rare resources, secrets, or other unpredictable outcomes.

These purposes should favor different party characteristics and policies.

---

# 22. Conquered Content Should Change Role

Areas should not remain equally tedious forever.

A region may progress conceptually through states such as:

**Unknown → Explored → Conquered → Mastered**

When content has become trivial relative to the Guild's power, it should become easier to automate or abstract.

Do not require the simulation of meaningless low-level combat indefinitely if aggregate resolution would produce the same meaningful result.

The game should respect the player's progress.

---

# 23. Frontier Progression Must Matter

Reaching a new major depth or defeating a Gatekeeper should produce more than larger rewards.

Frontier progress may unlock:

- new resources;
- new Strata;
- new Guild systems;
- new origins;
- new recruitment pools;
- new mechanics;
- new research;
- new equipment possibilities;
- new threats;
- new mysteries.

The Guild and the Delve should continually feed one another.

---

# 24. Gatekeepers and Mechanical Challenges

Important milestone bosses may serve as mechanical tests.

A Gatekeeper should occasionally require adaptation rather than merely greater numbers.

Examples include:

- punishing high-attack characters;
- rewarding summons;
- countering healing;
- creating positional threats;
- requiring status management;
- altering normal combat rules.

The player should sometimes solve progression walls through team construction rather than waiting for numerical growth.

---

# 25. Anomalies

The Delve may occasionally contain regions or encounters that temporarily alter normal assumptions.

Anomalies should be rare enough to remain memorable.

Possible examples:

- healing becomes harmful;
- enemies may join the expedition;
- time behaves unusually;
- combat is replaced by another form of challenge;
- death rules temporarily change;
- resources behave differently.

Anomalies provide controlled opportunities for experimentation and strangeness.

They should remain understandable once discovered.

---

# 26. Consequences and Failure

Failure should matter without routinely destroying the player's most interesting possessions through unattended RNG.

Early game should strongly favor recoverable consequences such as:

- injuries;
- recovery time;
- lost expedition progress;
- damaged equipment;
- resource loss;
- temporary debuffs;
- character development caused by failure.

Permanent character death should not be a default unattended outcome unless explicitly designed and clearly communicated.

Higher-risk systems may eventually allow the player to voluntarily expose adventurers to permanent consequences in exchange for meaningful rewards.

Risk should be chosen whenever practical.

---

# 27. Persistent History

Interesting procedural events should be capable of becoming part of the Guild's history.

The game should eventually preserve meaningful records such as:

- deepest expedition;
- richest expedition;
- unusual discoveries;
- major boss kills;
- extraordinary adventurer accomplishments;
- catastrophic failures;
- strange anomalies;
- record-setting battles.

Procedural events become more meaningful when the game remembers them.

Where practical, procedural runs should be reproducible through deterministic seeds.

---

# 28. Character Attachment

Procedural adventurers should gradually become individually meaningful.

Attachment can emerge through:

- longevity;
- unusual traits;
- rare combinations;
- accomplishments;
- injuries;
- class changes;
- memorable expedition events;
- titles;
- relationships;
- personal records;
- transformation.

The game should not require extensive handcrafted narrative for every character.

History can emerge from systems.

---

# 29. Incremental Complexity

Do not implement every envisioned system immediately.

New mechanics should be introduced when existing systems have demonstrated a need for them.

Prefer:

**small coherent system → test → expand**

over:

**large speculative system → hope it works**

The first playable version should demonstrate the foundational loop before attempting extensive worldbuilding or feature breadth.

---

# 30. Minimum Viable Game

The earliest meaningful playable version should focus on:

- a Guild;
- several recruitable adventurers;
- basic procedural character variation;
- party construction;
- automatic combat;
- a basic Delve;
- Gold or equivalent early resources;
- XP and character improvement;
- simple Guild upgrades;
- increasing Delve difficulty;
- basic persistence.

This version does not need to represent the game's eventual complexity.

Its purpose is to determine whether the central loop is satisfying.

---

# 31. Expansion Philosophy

New systems should preferably deepen existing relationships.

Good expansion:

> A new equipment mechanic creates additional reasons to care about adventurer tags and Delve resources.

Weak expansion:

> A completely isolated minigame exists because more features seemed desirable.

When evaluating a new system, ask:

**What existing decisions become more interesting because this exists?**

If the answer is "none," reconsider the feature.

---

# 32. Prefer Combinatorial Expansion

Whenever practical, add mechanics that multiply possibilities rather than only adding individual pieces of content.

For example:

Adding a reusable **Reflection** mechanic plus an **Illusion** archetype may enable hundreds of combinations.

Adding 40 individually scripted characters only adds 40 characters.

Prefer systems with multiplicative interaction potential.

Handcrafted content may still be valuable, especially for landmarks, bosses, events, and flavor, but should not be the sole mechanism by which the game grows.

---

# 33. Avoid Content Inflation

Do not confuse quantity with depth.

Avoid autonomous behavior such as:

- adding dozens of nearly identical classes;
- producing hundreds of trivial items;
- creating currencies without purpose;
- generating lore that has no gameplay relevance;
- adding mechanics whose only purpose is to make the game larger;
- creating additional UI screens for systems that do not justify them.

A smaller interacting system is preferable to a larger disconnected one.

---

# 34. Autonomous Development Authority

Codex may autonomously:

- implement established systems;
- improve architecture;
- write tests;
- fix bugs;
- refactor code;
- improve performance;
- add instrumentation;
- improve procedural generators;
- rebalance obviously problematic values;
- improve UX;
- expand existing mechanical vocabularies;
- prototype features strongly supported by this constitution;
- run simulations;
- analyze progression;
- identify dominant strategies;
- identify dead mechanics;
- improve generated-content coherence;
- add content that exercises existing systems.

Codex should be encouraged to make meaningful progress without requiring approval for every small decision.

---

# 35. Autonomous Development Boundaries

Codex should be cautious about autonomously making changes that redefine the project's identity.

Examples requiring exceptional justification include:

- replacing autobattling with primarily manual combat;
- abandoning the Guildmaster fantasy;
- transforming the project into a traditional narrative RPG;
- replacing procedural characters with a primarily fixed cast;
- removing idle progression;
- eliminating buildcrafting;
- monetization systems;
- real-money randomized rewards;
- mechanics intentionally designed around artificial inconvenience;
- major systems that contradict the three core pillars.

If uncertain, preserve the existing design direction and work deeper rather than broader.

---

# 36. Codex Must Not Add Features Merely to Stay Busy

Autonomous development does not mean endless feature accumulation.

Codex must not invent unnecessary systems because no obvious task remains.

When the game reaches a stable point, productive work may include:

- testing;
- simulation;
- profiling;
- balancing;
- bug hunting;
- code cleanup;
- generator analysis;
- progression analysis;
- usability improvements;
- documenting unresolved design questions.

Stopping expansion is preferable to damaging coherence.

---

# 37. Iteration Loop

Autonomous development should generally follow this cycle:

1. Inspect the current game and project state.
2. Identify the most meaningful current weakness, opportunity, or unfinished foundational system.
3. Form a specific hypothesis about how to improve it.
4. Implement the smallest coherent change capable of testing that hypothesis.
5. Add or update automated tests.
6. Run relevant tests and simulations.
7. Evaluate actual results.
8. Fix regressions or revert unsuccessful changes.
9. Document significant findings.
10. Commit or otherwise checkpoint stable progress when appropriate.
11. Reassess the game before choosing the next task.

Do not assume the next feature before evaluating the previous one.

---

# 38. Simulation as a Design Tool

Because Idle Fodder contains procedural generation and automated combat, simulation should be a first-class development tool.

Where useful, Codex should simulate:

- many expedition runs;
- many generated characters;
- party compositions;
- progression rates;
- resource production;
- boss success rates;
- build distributions;
- recruitment distributions;
- ability combinations.

Simulation should help identify:

- impossible progression walls;
- runaway resource growth;
- useless stats;
- dominant classes;
- irrelevant choices;
- unexpectedly powerful interactions;
- procedural generation failures;
- extreme outliers.

Simulation informs design.

Simulation does not automatically dictate design.

A statistically unusual build may be desirable if it creates interesting gameplay.

---

# 39. Test the Generators

Procedural systems require dedicated validation.

Generated content should be checked for issues such as:

- impossible abilities;
- invalid targets;
- contradictory traits;
- unusable characters;
- infinite loops;
- impossible encounters;
- broken numerical values;
- incoherent tag combinations;
- missing references;
- meaningless duplicates.

Generators should fail safely.

A malformed generated object should never silently corrupt persistent game state.

---

# 40. Determinism and Reproducibility

Random systems should use explicit seeds where practical.

A bug associated with a particular generated adventurer, expedition, item, or encounter should ideally be reproducible.

Tests should be able to specify seeds.

Development tools should make unusual procedural outcomes inspectable.

Randomness should never make debugging impossible.

---

# 41. Observability

Important systems should expose enough information to understand why something happened.

Combat results should eventually permit inspection.

Generated characters should expose relevant traits and sources of modifiers.

Simulation tools should produce summaries.

When a build unexpectedly becomes extremely powerful, developers should be able to investigate the interaction.

Do not build opaque procedural systems that cannot explain themselves.

---

# 42. Data-Driven Design

Where practical, content definitions should be separated from core engine logic.

Classes, traits, items, origins, enemies, encounter tables, and similar content should favor structured data over unnecessary hardcoded special cases.

This should allow the game to grow without making engine code increasingly fragile.

Do not force data-driven architecture where behavior genuinely requires code, but prefer composition over sprawling conditionals.

---

# 43. Architecture Must Serve the Game

Do not overengineer infrastructure before gameplay requires it.

Avoid building large abstraction frameworks for hypothetical future features.

Use architecture that supports:

- fast iteration;
- testing;
- simulation;
- persistence;
- procedural generation;
- extensibility;
- debugging.

A simple implementation that supports current gameplay is preferable to an elegant architecture for systems that do not yet exist.

Refactor when real complexity demonstrates the need.

---

# 44. UI Philosophy

The player should be able to understand:

- what their Guild is producing;
- what their parties are doing;
- why an adventurer is interesting;
- why a build works;
- what an upgrade changes;
- what happened while they were away;
- why progression is blocked.

Information density is acceptable.

Confusion is not.

The UI should prioritize clarity of systems and comparisons over decorative complexity.

---

# 45. Offline Progression

Idle progression should eventually support time away from the game.

Offline resolution should preserve important decisions and approximate gameplay faithfully enough that leaving the game does not create a fundamentally different economy.

Do not initially simulate excessive numbers of individual low-value events if aggregate simulation provides equivalent meaningful results.

However, rare or significant events may be surfaced separately in return summaries.

---

# 46. Return Experience

Returning after time away should be satisfying.

The game should summarize outcomes such as:

- resources gained;
- levels earned;
- equipment found;
- injuries suffered;
- new records;
- unusual events;
- frontier progress;
- new applicants;
- important discoveries.

Routine information should be summarized.

Interesting information should be highlighted.

The player should frequently have something worth inspecting.

---

# 47. Humor and Tone

Idle Fodder may be funny.

Humor should emerge naturally from the absurdity of fantasy bureaucracy, adventurer generation, procedural events, and unexpected mechanical interactions.

The world should be capable of containing both:

> legendary heroes of ancient prophecy

and

> Steve, Accountant of the Damned.

Do not make every piece of content a joke.

Sincerity gives absurdity contrast.

---

# 48. Naming and Generated Text

Procedural naming should reflect context.

Origins, cultures, species, classes, abilities, and items may use different naming styles.

Generated text should avoid obvious repetitive template artifacts when possible.

Names should remain readable.

Mechanically important information should never be hidden behind overly poetic generated descriptions.

---

# 49. Avoid Artificial Engagement

Do not design around manipulative retention systems.

Avoid mechanics whose primary purpose is:

- forcing unnecessary login frequency;
- punishing absence;
- creating anxiety about missed rewards;
- artificial scarcity unrelated to gameplay;
- monetization pressure.

The player should return because they are curious about their Guild and want to make decisions.

---

# 50. No Monetization-Driven Design Assumptions

Unless explicitly requested in the future, design Idle Fodder as a complete game rather than a monetization platform.

Do not introduce:

- premium currencies;
- paid recruitment;
- energy systems designed around purchases;
- loot-box purchases;
- advertisements;
- pay-to-skip mechanics;
- monetized power.

Randomized recruitment is a gameplay system, not a monetization system.

---

# 51. Preserve Player Discoveries

If players discover an unusual combination that is powerful but not destructive to the larger game, preserve it when possible.

Balance interventions should ask:

**Is this interaction creating interesting specialization, or eliminating meaningful alternatives?**

Do not flatten the game merely to make every option statistically equal.

Asymmetry is desirable.

---

# 52. Respect Existing Saves

As development progresses, saved games should be treated as valuable.

Changes to persistent formats should include migrations or explicit development reset policies.

Procedural systems should version their schemas where necessary.

Do not casually introduce changes that silently invalidate player progress.

---

# 53. Document Important Decisions

Major design or architecture changes should record:

- what changed;
- why;
- what alternatives were considered;
- what evidence motivated the change;
- what consequences are expected.

Do not create enormous reports after every trivial modification.

Documentation should preserve reasoning that would otherwise be lost.

---

# 54. Maintain an Experiment History

When substantial balancing, procedural-generation, or progression experiments are performed, preserve the meaningful results.

Do not continually overwrite the only copy of previous findings.

Experiments should be identifiable by date, sequence, topic, or another consistent scheme.

Failed experiments are useful information.

---

# 55. Definition of a Successful Iteration

An autonomous development iteration is successful when it meaningfully improves at least one of:

- fun;
- player agency;
- clarity;
- progression;
- build diversity;
- procedural coherence;
- game stability;
- performance;
- maintainability;
- test coverage;
- debugging capability;
- content interaction depth.

Adding code is not itself progress.

Adding features is not itself progress.

Increasing the number of generated possibilities is not useful unless those possibilities remain understandable and meaningful.

---

# 56. Questions to Ask Before Adding a Feature

Before implementing a substantial new feature, evaluate:

1. Which core pillar does this strengthen?
2. What new player decision does it create?
3. What existing systems does it interact with?
4. Why is this needed now?
5. Could the same benefit be achieved by deepening an existing system?
6. Can it be explained clearly to the player?
7. Can it be tested or simulated?
8. Does it create future combinatorial possibilities?
9. Does it introduce unnecessary maintenance complexity?
10. Would the game still feel like Idle Fodder after adding it?

If answers are weak, reconsider the feature.

---

# 57. Questions to Ask When the Game Feels Boring

If the current experience lacks interest, investigate before expanding blindly.

Determine whether the problem comes from:

- insufficient player decisions;
- meaningless upgrades;
- weak character variation;
- poor feedback;
- predictable expeditions;
- lack of meaningful risk;
- excessive waiting;
- lack of build interactions;
- unclear goals;
- progression pacing;
- repetitive Delve content;
- ineffective reward structures.

Fix the underlying weakness rather than covering it with additional systems.

---

# 58. Initial Priority

The immediate development priority is:

> **Prove that recruiting adventurers, constructing a party, watching that party automatically fight through the Delve, receiving rewards, improving the Guild, and trying again is enjoyable.**

Everything else is secondary until that loop exists.

Do not begin by attempting to create the complete fantasy world.

Do not begin with hundreds of classes.

Do not begin with elaborate prestige systems.

Do not begin with extremely advanced procedural generation.

Build a small version of the game.

Make it playable.

Observe it.

Improve it.

Then allow complexity to emerge from a stable foundation.

---

# 59. Long-Term Vision

Idle Fodder should eventually feel like a game where an understandable set of mechanical rules produces a fantasy world far larger than the amount of individually authored content.

The player should be able to return after many hours and discover:

- strange new adventurers;
- unexpected build possibilities;
- unusual expedition outcomes;
- deeper Delve regions;
- new systems;
- powerful combinations;
- memorable Guild history.

The game should create stories without requiring every story to have been written beforehand.

Its central long-term design aspiration is:

> **A finite mechanical language capable of producing an effectively infinite fantasy adventure.**

---

# 60. Final Authority

When uncertain, preserve these priorities in roughly this order:

1. Keep the core Guild → Adventurer → Delve loop intact.
2. Preserve meaningful player decisions.
3. Maintain procedural coherence.
4. Favor interacting systems over isolated content.
5. Make progression noticeable.
6. Allow unusual and powerful builds.
7. Protect long-term extensibility.
8. Keep the game understandable.
9. Test assumptions through actual implementation and simulation.
10. Prefer a smaller enjoyable game over a larger incoherent one.

Idle Fodder should become more complex because its systems naturally demand greater depth.

It should never become more complex merely because development can continue.