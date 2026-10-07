import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
import {mixedJourney} from './journey-scenarios.js';
// Paired equipment encounters hold origin, technique, level and combat seed fixed.
console.log('kind,party,depth,level,slot,equipment,wins,seeds,seconds,taken,healing,shieldGranted');
const parties={balanced:['guardian','ranger','cleric','warden'],damage:['guardian','ranger','ranger','cleric'],healing:['guardian','ranger','cleric','cleric']};
for(const [party,classes] of Object.entries(parties))for(const depth of [51,55,65,71,75])for(const level of [12,20,28])for(let slot=0;slot<4;slot++)for(const gear of [null,'steel','ritual','dawn']){
 let wins=0,seconds=0,taken=0,healing=0,warded=0;
 for(let seed=1;seed<=20;seed++){
  const s=E.createGame(seed,0);s.depth=depth-1;s.upgrades.quarters=s.upgrades.cartography=1;s.upgrades.training=s.upgrades.infirmary=2;s.discoveries=['dawn'];s.equipmentUnlocked=['steel','ritual','dawn'];s.roster=classes.map(c=>E.generate(s,c));s.applicants=[];s.party=s.roster.map(a=>a.id);
  for(const [i,a] of s.roster.entries()){a.level=level;a.technique=null;a.equipment=classes[i]==='ranger'?'steel':'ritual';}s.roster[slot].equipment=gear;
  E.startExpedition(s);E.advance(s,181);assert.equal(s.expedition,null);assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);
  const r=s.lastReport;wins+=Number(r.win);seconds+=r.seconds;taken+=r.units.reduce((n,u)=>n+u.taken,0);healing+=r.units.reduce((n,u)=>n+u.healing,0);warded+=r.units.reduce((n,u)=>n+u.warded,0);
 }
 const mean=n=>(n/20).toFixed(1);console.log(['equipment',party,depth,level,slot,gear||'none',wins,20,mean(seconds),mean(taken),mean(healing),mean(warded)].join(','));
}
console.log('kind,seed,frontier,party,won,attempts,seconds,gold,discovered');
for(let seed=1;seed<=60;seed++){
 const s=mixedJourney(seed,3600);if(s.depth<50)continue;E.retreat(s);s.gold=Math.max(s.gold,750);const before=s.gold;assert.ok(E.buyUpgrade(s,'cartography'));E.setPolicy(s,'survey');E.setAuto(s,true);const wins=s.records.wins,defeats=s.records.defeats,clock=s.clock,copy=E.restore(E.serialize(s,0),0).state;
 E.advance(s,14400);for(let t=0;t<14400;t++)E.tick(copy);assert.deepEqual(copy,s);assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);
 console.log(['journey',seed,s.depth,s.party.length,s.records.wins-wins,s.records.wins-wins+s.records.defeats-defeats,s.lastReport.at-clock,s.gold-before,E.surveyComplete(s)].join(','));
}
