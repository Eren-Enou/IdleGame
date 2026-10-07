import { stats, combatPowers, abilityFor } from './engine.js';
import { CLASSES } from './content.js';
export function combatDescription(s,a) {
  const t=stats(s,a), ability=abilityFor(a), powers=combatPowers({...a,...t});
  const basic=`Basic attacks: ${Math.round(powers.basic)} damage every ${t.speed}s before armor; 10% chance of a 50% stronger hit.`;
  const amount=Math.round(powers.ability*ability.scale);
  let effect;
  if(ability.effect==='shield') effect=`Adds ${amount} shield to self, up to ${Math.round(t.hp*.6)} stored shield.`;
  if(ability.effect==='heal') effect=`Restores up to ${amount} HP to the living ally with the lowest health percentage.${s.upgrades.infirmary>0?' Cleanses one harmful status.':''}`;
  if(ability.effect==='bleed') effect=`Deals ${Math.round(powers.ability*ability.directScale)} damage before armor, then ${amount} bleed damage each second for 4 seconds; bleed ignores armor.`;
  return `${basic} ${ability.name}: every ${powers.cooldown}s. ${effect} Shields absorb incoming damage.`;
}
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
export function reportAdvice(report) {
  if(report.win) return 'Party recovered fully. Everyone who participated earned XP.';
  const standing=report.units.filter(u=>u.survived).length;
  if(report.seconds>=180 && standing) return `Time ran out with ${standing} adventurer${standing===1?'':'s'} still standing. More sustained damage or fewer support slots may help.`;
  if(report.enemy?.boss && report.enemy.region===1) return 'The Librarian lashes the whole party. Guardians cannot intercept this attack; party health, healing or faster kills can help.';
  if(report.enemy?.healing>0) return `The enemy recovered ${report.enemy.healing} health through siphoning. Sustained damage must outpace that recovery.`;
  const front=report.units.find(u=>u.id===report.frontId);
  if(front && !front.survived) return `${front.name} went down on the front line. More health, shielding or healing can keep direct attacks away from the back line.`;
  return 'Farm a conquered depth for XP and Gold, then adjust the party, equipment or Guild before trying again. Everyone returned safely.';
}
