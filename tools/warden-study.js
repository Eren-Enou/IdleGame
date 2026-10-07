import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
import {CLASSES} from '../src/content.js';
const parties={damage:['guardian','ranger','ranger','cleric'],healing:['guardian','ranger','cleric','cleric'],warding:['guardian','ranger','cleric','warden'],noHealing:['guardian','ranger','ranger','warden'],noGuardian:['warden','ranger','ranger','cleric'],threeWardens:['warden','warden','warden','cleric']};
console.log('scale,cooldown,level,depth,party,build,wins,seeds,seconds,wardGranted,shieldAbsorbed,downed');
for(const scale of [.8,1.2,1.6,2])for(const cooldown of [4,6])for(const level of [12,20,28])for(const depth of [45,55,65,75])for(const [party,classes]of Object.entries(parties))for(const build of [null,'steel','ritual']){
 CLASSES.warden.ability.scale=scale;CLASSES.warden.ability.cooldown=cooldown;
 let wins=0,seconds=0,granted=0,blocked=0,downed=0;
 for(let seed=1;seed<=30;seed++){
  const s=E.createGame(seed,0);s.depth=depth-1;s.roster=classes.map(c=>E.generate(s,c));s.applicants=[];s.party=s.roster.map(a=>a.id);s.upgrades.quarters=1;s.upgrades.training=s.upgrades.infirmary=2;s.equipmentUnlocked=['steel','ritual'];
  for(const a of s.roster){a.level=level;a.technique=null;E.equip(s,a.id,build);}
  E.startExpedition(s);E.advance(s,181);assert.equal(s.expedition,null);assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);
  const r=s.lastReport;wins+=Number(r.win);seconds+=r.seconds;granted+=r.units.filter(u=>u.classId==='warden').reduce((n,u)=>n+u.warded,0);blocked+=r.units.reduce((n,u)=>n+u.blocked,0);downed+=r.units.filter(u=>!u.survived).length;
 }
 const mean=n=>(n/30).toFixed(1);console.log([scale,cooldown,level,depth,party,build||'none',wins,30,mean(seconds),mean(granted),mean(blocked),mean(downed)].join(','));
}
