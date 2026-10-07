import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
import {TECHNIQUES} from '../src/content.js';
const rows=[],parties={three:['guardian','ranger','cleric'],warding:['guardian','ranger','cleric','warden'],healing:['guardian','ranger','cleric','cleric']};
const singleTarget=process.argv.includes('--single-target');
TECHNIQUES.aegis.overflowTarget=singleTarget?'lowest':'party';
// Pure healing references are evaluated once; hybrid values are prototypes.
const variants=[{name:'standard',technique:null},{name:'quiet',technique:'quiet'},{name:'greater',technique:'greater'},...(singleTarget?[1.5,1.75,2]:[1.75,2,2.25]).flatMap(scale=>[.5,1].map(overflow=>({name:`aegis-${scale}-${overflow}`,technique:'aegis',scale,overflow})))];
for(const variant of variants){
 if(variant.technique==='aegis'){TECHNIQUES.aegis.scale=variant.scale;TECHNIQUES.aegis.overflowWard=variant.overflow;}
 for(const [party,classes] of Object.entries(parties))for(const depth of [65,75,85,95])for(const level of [16,24,32])for(const gear of [null,'ritual','dawn']){
  let wins=0,seconds=0,healing=0,warded=0,downed=0;
  for(let seed=1;seed<=20;seed++){
   const s=E.createGame(seed,0);s.depth=depth-1;s.upgrades.quarters=s.upgrades.cartography=1;s.upgrades.training=s.upgrades.infirmary=2;s.discoveries=['dawn'];s.equipmentUnlocked=['steel','ritual','dawn'];s.roster=classes.map(c=>E.generate(s,c));s.applicants=[];s.party=s.roster.map(a=>a.id);
   for(const a of s.roster){a.level=level;a.technique=null;a.equipment=a.classId==='ranger'?'steel':'ritual';}
   const cleric=s.roster.find(a=>a.classId==='cleric');cleric.technique=variant.technique;cleric.equipment=gear;
   E.startExpedition(s);E.advance(s,181);assert.equal(s.expedition,null);assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);const r=s.lastReport,c=r.units.find(u=>u.id===cleric.id);wins+=Number(r.win);seconds+=r.seconds;healing+=c.healing;warded+=c.warded;downed+=r.units.filter(u=>!u.survived).length;
  }
  const mean=n=>Number((n/20).toFixed(2));rows.push({variant:variant.name,party,depth,level,gear:gear||'none',wins,seeds:20,seconds:mean(seconds),healing:mean(healing),warded:mean(warded),downed:mean(downed)});
 }
}
console.log(JSON.stringify({experiment:'022-aegis-mending',overflowTarget:singleTarget?'lowest':'party',encounters:rows.length*20,rows},null,2));
