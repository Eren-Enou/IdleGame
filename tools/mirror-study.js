import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
const parties={balanced:['guardian','ranger','cleric'],barrage:['ranger','ranger','ranger'],sustain:['guardian','cleric','cleric'],fourDamage:['guardian','ranger','ranger','cleric'],fourSupport:['guardian','ranger','cleric','cleric']};
console.log('reflection,level,depth,party,build,rangerTechnique,wins,seeds,seconds,reflected,downed');
for(const reflection of [0,.1,.15,.2])for(const level of [12,20])for(const depth of [31,35,40,75])for(const [party,classes]of Object.entries(parties))for(const build of [null,'steel','ritual'])for(const technique of (classes.includes('ranger')?[null,'quickshot','deepbarbs']:[null])){
 let wins=0,seconds=0,returned=0,downed=0;
 for(let seed=1;seed<=30;seed++){
  const s=E.createGame(seed,0);s.roster=classes.map(c=>E.generate(s,c));s.party=s.roster.map(a=>a.id);s.depth=depth-1;s.upgrades.quarters=1;s.upgrades.training=s.upgrades.infirmary=2;s.equipmentUnlocked=['steel','ritual'];
  for(const a of s.roster){a.level=level;if(a.classId==='ranger')a.technique=technique;E.equip(s,a.id,build);}
  E.startExpedition(s);s.expedition.enemy.reflection=reflection;
  E.advance(s,181);assert.equal(s.expedition,null);assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);
  const r=s.lastReport;wins+=Number(r.win);seconds+=r.seconds;returned+=r.enemy.reflected;downed+=r.units.filter(u=>!u.survived).length;
 }
 const mean=n=>(n/30).toFixed(1);console.log([reflection,level,depth,party,build||'none',technique||'standard',wins,30,mean(seconds),mean(returned),mean(downed)].join(','));
}
