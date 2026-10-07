import { stats } from './engine.js';
import { CLASSES } from './content.js';
export function compareRecruit(s, candidate) {
  const peer = s.roster.find(a => a.classId === candidate.classId && s.party.includes(a.id)) || s.roster.find(a => a.classId === candidate.classId);
  if (!peer) return { peer: null, role: CLASSES[candidate.classId].role };
  const level = Math.max(peer.level,candidate.level);
  const current = stats(s,{ ...peer,level }), potential = stats(s,{ ...candidate,level });
  return { peer, level, delta: { hp: potential.hp-current.hp, attack: potential.attack-current.attack, armor: potential.armor-current.armor } };
}
export function partyAdvice(s) {
  const classes = s.party.map(id => s.roster.find(a => a.id === id).classId);
  if (!classes.length) return 'Recruit adventurers below, assign them to a party, then enter the Delve.';
  const front = s.roster.find(a => a.id === s.party.find(id => s.roster.find(a=>a.id===id).classId === 'guardian')) || s.roster.find(a => a.id === s.party[0]);
  const healing = classes.includes('cleric') ? 'A cleric can heal living allies.' : 'No healer assigned; this party depends on ending fights quickly.';
  return `${front.name} will take direct enemy attacks first. ${healing} Everyone recovers after each completed room.`;
}
