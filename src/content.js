export const CLASSES = {
  guardian: { name: 'Guardian', icon: '◆', role: 'Frontline', hp: 112, attack: 9, armor: 4, speed: 3, color: '#79c8c5', ability: { name: 'Bulwark', cooldown: 6, effect: 'shield', target: 'self', scale: 1.8, tags: ['ward'] }, description: 'Draws enemy attacks while standing. Bulwark builds a personal shield.' },
  ranger: { name: 'Ranger', icon: '➶', role: 'Damage', hp: 70, attack: 15, armor: 1, speed: 2, color: '#c2d58e', ability: { name: 'Barbed arrow', cooldown: 5, effect: 'bleed', target: 'enemy', scale: .55, tags: ['physical', 'bleed'] }, description: 'Fast attacks. Barbed arrow deals damage and adds a 4-second bleed.' },
  cleric: { name: 'Cleric', icon: '✧', role: 'Support', hp: 76, attack: 10, armor: 2, speed: 3, color: '#e5bc7a', ability: { name: 'Mending light', cooldown: 5, effect: 'heal', target: 'lowest', scale: 2.5, tags: ['holy', 'heal'] }, description: 'Mending light heals the living ally with the lowest health percentage.' },
  warden: { name: 'Warden', icon: '◇', role: 'Protection', unlockDepth:40, hp:90, attack:7, armor:3, speed:3, color:'#b4a2df', ability:{name:'Sheltering ward',cooldown:4,effect:'shield',target:'party',scale:2,tags:['ward']}, description:'Sheltering ward shields every living party member. Wardens do not draw enemy attacks, heal or cleanse.' },
};
export const ORIGINS = {
  bastion: { name: 'Stone Bastion', species: 'Dwarf', classes: ['guardian', 'cleric', 'warden'], hp: 1.15, attack: .96, armor: 1, trait: 'Stoneborn', detail: '+15% health, +1 armor; −4% attack.' },
  wildwood: { name: 'Wildwood', species: 'Elf', classes: ['ranger', 'cleric'], hp: .95, attack: 1.12, armor: 0, trait: 'Keen-eyed', detail: '+12% attack; −5% health.' },
  crossroads: { name: 'Crossroads', species: 'Human', classes: ['guardian', 'ranger', 'cleric', 'warden'], hp: 1.05, attack: 1.05, armor: 0, trait: 'Resourceful', detail: '+5% health and attack.' },
};
export const UPGRADES = {
  training: { name: 'Training yard', cost: 65, factor: 1.7, max: 20, description: 'Each rank adds 12% attack and healing to every adventurer.' },
  infirmary: { name: 'Guild infirmary', cost: 55, factor: 1.7, max: 20, description: 'Each rank adds 15% maximum health. Rank 1 also lets Mending light cleanse one harmful status. Parties recover fully between rooms.' },
  quarters: { name: 'Expanded quarters', cost: 100, factor: 2, max: 6, unlockDepth: 5, description: 'Clear depth 5 to unlock. Each rank makes room for two more adventurers. First rank unlocks a fourth party slot.' },
  mentorship: { name:'Mentorship hall', cost:450, factor:1, max:1, unlockDepth:20, description:'Veterans can mentor lower-level Guild members between fights. Spend Gold on roster cards to close the experience gap, up to the highest level in your roster.' },
};
export const STRATA = [
  { name: 'The Rootways', subtitle: 'Old roots. Older debts.', enemies: ['Root rat', 'Moss crawler', 'Tunnel brigand'], hazard: 'Ordinary encounters. A guardian can protect the back line.' },
  { name: 'Ember Archive', subtitle: 'The books are still burning.', enemies: ['Ash scribe', 'Cinder moth', 'Ember sentinel'], hazard: 'Enemy attacks burn for 2 damage over each of the next 3 seconds.' },
  { name: 'Hollow Sanctum', subtitle: 'Something listens beneath the stone.', enemies: ['Hollow acolyte', 'Bone warden', 'Pale watcher'], hazard: 'Enemies siphon health on attacks. Sustained damage matters here.' },
  { name: 'The Mirror Halls', subtitle: 'Every triumph has a sharp reflection.', enemies: ['Glass duelist', 'Silver echo', 'Mirror custodian'], reflection: .15, hazard: 'Direct hits return 15% of health damage to their attacker, ignoring armor. Shields absorb it; bleed does not reflect. Clerics can protect the back line.' },
];
export const GATEKEEPERS = [
  { name: 'Rootbound Gatekeeper', effect: 'shield', scale: .08, description: 'Every third attack, regrows a shield worth 8% of maximum health. Sustained damage breaks through.' },
  { name: 'Cinder Librarian', effect: 'cleave', scale: .55, description: 'Every third attack, lashes the entire party for 55% attack damage. A guardian cannot intercept it; healers and health help.' },
  { name: 'The Hollow Prior', effect: 'bleed', scale: .12, description: 'Every third attack, wounds the front line for 4 seconds. Infirmary rank 1 lets Mending light cleanse one harmful status.' },
  { name: 'The Silver Adjudicator', effect: 'strongest', scale: .7, description: 'Every third attack, strikes the living adventurer with the highest attack power for 70% enemy attack. Guardians cannot intercept this extra strike.' },
];
export const EQUIPMENT = {
  steel: { name: "Soldier's seal", cost: 120, cooldown: 2, description: 'Basic physical attacks gain 35% damage. Abilities take 2 extra seconds to recharge.', modifiers: [{ trigger: 'attack', tags: ['physical'], factor: 1.35 }] },
  ritual: { name: 'Ritual focus', cost: 120, cooldown: 0, description: 'Ward, healing and bleed abilities gain 35% strength. Basic attacks deal 20% less damage.', modifiers: [{ trigger: 'ability', tags: ['ward','heal','bleed'], factor: 1.35 }, { trigger: 'attack', tags: ['physical'], factor: .8 }] },
};
export const TECHNIQUES = {
  watchful: { classId:'guardian', name:'Watchful bulwark', cooldown:4, scale:1.15 },
  steadfast: { classId:'guardian', name:'Steadfast bulwark', cooldown:8, scale:2.8 },
  quickshot: { classId:'ranger', name:'Quick barbed shot', cooldown:3, directScale:.85, scale:.25 },
  deepbarbs: { classId:'ranger', name:'Deep barbs', cooldown:6, directScale:.65, scale:.78 },
  quiet: { classId:'cleric', name:'Quiet mending', cooldown:3, scale:1.4 },
  greater: { classId:'cleric', name:'Greater mending', cooldown:7, scale:3.8 },
};
