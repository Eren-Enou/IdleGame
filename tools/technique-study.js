import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
import {TECHNIQUES} from '../src/content.js';
const seeds=100,depths=[35,45,55],builds=[null,'steel','ritual'];
console.log('depth,equipment,changedClass,technique,wins,meanSeconds');
for(const depth of depths)for(const equipment of builds)for(const technique of [null,...Object.keys(TECHNIQUES)]){
 let wins=0,seconds=0;
 for(let seed=1;seed<=seeds;seed++){
  const s=E.createGame(seed,0);s.roster=[...s.applicants];s.applicants=[];s.party=s.roster.map(a=>a.id);s.depth=depth-1;s.upgrades.training=s.upgrades.infirmary=2;s.equipmentUnlocked=['steel','ritual'];
  for(const a of s.roster){a.level=depth===35?12:20;a.equipment=equipment;if(technique&&TECHNIQUES[technique].classId===a.classId)a.technique=technique;}
  E.startExpedition(s);for(let t=0;s.expedition&&t<181;t++)E.tick(s);
  if(s.expedition)throw new Error('Encounter failed to terminate.');
  wins+=Number(s.lastReport.win);seconds+=s.lastReport.seconds;
  assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);
 }
 console.log([depth,equipment||'none',technique?TECHNIQUES[technique].classId:'baseline',technique||'standard',wins,(seconds/seeds).toFixed(1)].join(','));
}
