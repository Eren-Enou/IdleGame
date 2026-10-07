import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
import {mixedJourney} from './journey-scenarios.js';
const runs=Number(process.argv[2]||20);
if(!Number.isInteger(runs)||runs<1||runs>100)throw new Error('Use 1–100 seeds.');
console.log('sourceSeconds,substitution,preparation,percent,eligible,activeOrders,recoveryFailures,depthGain,wins,defeats,goldEarned');
for(const sourceSeconds of [3600,14400]){
 const cohort=Array.from({length:runs},(_,i)=>mixedJourney(i+1,sourceSeconds));
 for(const substitution of ['original','guardian','cleric','fourth'])for(const preparation of substitution==='original'?['none']:['fresh','mentorRitual'])for(const percent of [60,80,95]){
  const rows=[];
  for(const base of cohort){
   const s=structuredClone(base);E.retreat(s);E.setAuto(s,false);E.setPolicy(s,'push');
   if(substitution!=='original'){
    const a=E.generate(s,'warden');s.applicants=[a];
    if(substitution==='fourth'&&!E.buyUpgrade(s,'quarters'))continue;
    if(!E.recruit(s,a.id))continue;
    if(preparation==='mentorRitual'){
     if(!E.unlockEquipment(s,'ritual')||!E.buyUpgrade(s,'mentorship'))continue;
     for(const member of s.roster)E.equip(s,member.id,'ritual');E.mentor(s,a.id,'catchup');
    }
    if(substitution!=='fourth'){const old=s.roster.find(member=>member.classId===substitution);assert.ok(E.assign(s,old.id));}
    assert.ok(E.assign(s,a.id));
   }
   assert.ok(E.configureRecovery(s,true,10,percent));E.setAuto(s,true);
   const before={depth:s.depth,wins:s.records.wins,defeats:s.records.defeats,gold:s.gold};
   const live=structuredClone(s);for(let i=0;i<14400;i++)E.tick(live);
   const offline=E.restore(E.serialize(s,0),14400000).state;
   assert.deepEqual(offline,{...live,savedAt:14400000});
   assert.deepEqual(E.restore(E.serialize(offline,0),0).state,{...offline,savedAt:0});
   rows.push({active:Number(offline.auto),failed:Number(!offline.auto&&offline.policy==='farm'&&!offline.lastReport.win),depth:offline.depth-before.depth,wins:offline.records.wins-before.wins,defeats:offline.records.defeats-before.defeats,gold:offline.gold-before.gold});
  }
  const sum=k=>rows.reduce((n,r)=>n+r[k],0),mean=k=>rows.length?(sum(k)/rows.length).toFixed(1):'—';
  console.log([sourceSeconds,substitution,preparation,percent,rows.length,sum('active'),sum('failed'),mean('depth'),mean('wins'),mean('defeats'),mean('gold')].join(','));
 }
}
