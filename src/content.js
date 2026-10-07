export const CLASSES = {
  guardian: { name: 'Guardian', icon: '◆', role: 'Frontline', hp: 112, attack: 9, armor: 4, speed: 3, color: '#79c8c5', ability: { name: 'Bulwark', cooldown: 6, effect: 'shield', target: 'self', scale: 1.8, tags: ['ward'] }, description: 'Draws enemy attacks while standing. Bulwark grants a shield every 6 seconds.' },
  ranger: { name: 'Ranger', icon: '➶', role: 'Damage', hp: 70, attack: 15, armor: 1, speed: 2, color: '#c2d58e', ability: { name: 'Barbed arrow', cooldown: 5, effect: 'bleed', target: 'enemy', scale: .55, tags: ['physical', 'bleed'] }, description: 'Fast attacks. Barbed arrow deals damage and adds a 4-second bleed.' },
  cleric: { name: 'Cleric', icon: '✧', role: 'Support', hp: 76, attack: 10, armor: 2, speed: 3, color: '#e5bc7a', ability: { name: 'Mending light', cooldown: 5, effect: 'heal', target: 'lowest', scale: 2.5, tags: ['holy', 'heal'] }, description: 'Mending light heals the living ally with the lowest health percentage.' },
};
export const ORIGINS = {
  bastion: { name: 'Stone Bastion', species: 'Dwarf', classes: ['guardian', 'cleric'], hp: 1.15, attack: .96, armor: 1, trait: 'Stoneborn', detail: '+15% health, +1 armor; −4% attack.' },
  wildwood: { name: 'Wildwood', species: 'Elf', classes: ['ranger', 'cleric'], hp: .95, attack: 1.12, armor: 0, trait: 'Keen-eyed', detail: '+12% attack; −5% health.' },
  crossroads: { name: 'Crossroads', species: 'Human', classes: ['guardian', 'ranger', 'cleric'], hp: 1.05, attack: 1.05, armor: 0, trait: 'Resourceful', detail: '+5% health and attack.' },
};
export const UPGRADES = {
  training: { name: 'Training yard', cost: 65, factor: 1.7, max: 20, description: 'Each rank adds 12% attack and healing to every adventurer.' },
  infirmary: { name: 'Guild infirmary', cost: 55, factor: 1.7, max: 20, description: 'Each rank adds 15% maximum health. Rank 1 also lets Mending light cleanse one harmful status. Parties recover fully between rooms.' },
  quarters: { name: 'Expanded quarters', cost: 100, factor: 2, max: 6, description: 'Each rank makes room for two more adventurers. First rank unlocks a fourth party slot.' },
};
export const STRATA = [
  { name: 'The Rootways', subtitle: 'Old roots. Older debts.', enemies: ['Root rat', 'Moss crawler', 'Tunnel brigand'], hazard: 'Ordinary encounters. A guardian can protect the back line.' },
  { name: 'Ember Archive', subtitle: 'The books are still burning.', enemies: ['Ash scribe', 'Cinder moth', 'Ember sentinel'], hazard: 'Enemy attacks burn for 2 damage over each of the next 3 seconds.' },
  { name: 'Hollow Sanctum', subtitle: 'Something listens beneath the stone.', enemies: ['Hollow acolyte', 'Bone warden', 'Pale watcher'], hazard: 'Enemies siphon health on attacks. Sustained damage matters here.' },
];
export const GATEKEEPERS = [
  { name: 'Rootbound Gatekeeper', effect: 'shield', scale: .08, description: 'Every third attack, regrows a shield worth 8% of maximum health. Sustained damage breaks through.' },
  { name: 'Cinder Librarian', effect: 'cleave', scale: .55, description: 'Every third attack, lashes the entire party for 55% attack damage. A guardian cannot intercept it; healers and health help.' },
  { name: 'The Hollow Prior', effect: 'bleed', scale: .12, description: 'Every third attack, wounds the front line for 4 seconds. Infirmary rank 1 lets Mending light cleanse one harmful status.' },
];
