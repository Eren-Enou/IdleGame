import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
import {mixedJourney} from './journey-scenarios.js';
console.log('seconds,class,strategy,eligible,wins,meanSpent');
for(const duration of [3600,14400]){
 const cohort=Array.from({length:30},(_,i)=>mixedJourney(i+1,duration));
 for(const classId of ['guardian','ranger','cleric'])for(const strategy of ['fresh','mentor','ritual','mentorRitual']){
  let eligible=0,wins=0,spent=0;
  for(const base of cohort){
   const s=structuredClone(base);E.retreat(s);s.auto=false;const budget=s.gold,veteran=s.roster.find(a=>a.classId===classId),candidate=E.generate(s,classId);candidate.technique=null;s.applicants=[candidate];
   if(!E.recruit(s,candidate.id))continue;
   if(strategy.toLowerCase().includes('ritual')){if(!E.unlockEquipment(s,'ritual'))continue;for(const a of s.roster)E.equip(s,a.id,'ritual');}
   if(strategy.toLowerCase().includes('mentor')){if(!E.buyUpgrade(s,'mentorship'))continue;E.mentor(s,candidate.id,'catchup');}
   s.party=s.party.map(id=>id===veteran.id?candidate.id:id);s.policy='push';s.depth=Math.ceil((s.depth+1)/5)*5-1;spent+=budget-s.gold;eligible++;
   E.startExpedition(s);for(let t=0;s.expedition&&t<181;t++)E.tick(s);assert.equal(s.expedition,null);wins+=Number(s.lastReport.win);assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);
  }
  console.log([duration,classId,strategy,eligible,wins,(spent/eligible).toFixed(1)].join(','));
 }
}
