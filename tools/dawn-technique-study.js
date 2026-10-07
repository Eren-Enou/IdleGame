import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
const rows=[];
const parties={three:['guardian','ranger','cleric'],warding:['guardian','ranger','cleric','warden'],damage:['guardian','ranger','ranger','cleric']};
for(const [party,classes] of Object.entries(parties))for(const depth of [55,65,75])for(const level of [12,16,20,24,28])for(const technique of [null,'quickshot','deepbarbs'])for(const gear of [null,'steel','ritual','dawn']){
 let wins=0,seconds=0,downed=0;
 for(let seed=1;seed<=40;seed++){
  const s=E.createGame(seed,0);s.depth=depth-1;s.upgrades.quarters=s.upgrades.cartography=1;s.upgrades.training=s.upgrades.infirmary=2;s.discoveries=['dawn'];s.equipmentUnlocked=['steel','ritual','dawn'];s.roster=classes.map(c=>E.generate(s,c));s.applicants=[];s.party=s.roster.map(a=>a.id);
  for(const a of s.roster){a.level=level;a.technique=null;a.equipment=a.classId==='ranger'?'steel':'ritual';}
  const ranger=s.roster.find(a=>a.classId==='ranger');ranger.technique=technique;ranger.equipment=gear;
  E.startExpedition(s);E.advance(s,181);assert.equal(s.expedition,null);assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);const r=s.lastReport;wins+=Number(r.win);seconds+=r.seconds;downed+=r.units.filter(u=>!u.survived).length;
 }
 rows.push({party,depth,level,technique:technique||'standard',gear:gear||'none',wins,seeds:40,seconds:Number((seconds/40).toFixed(2)),downed:Number((downed/40).toFixed(2))});
}
console.log(JSON.stringify({experiment:'021-dawn-techniques',encounters:rows.length*40,rows},null,2));
