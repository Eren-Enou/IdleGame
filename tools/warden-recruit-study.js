import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
import {mixedJourney} from './journey-scenarios.js';

console.log('seconds,room,substitution,candidate,strategy,eligible,wins,level,spent,secondsInRoom');
for(const duration of [600,3600,14400]){
 const cohort=Array.from({length:30},(_,i)=>mixedJourney(i+1,duration));
 for(const room of ['frontier','nextGatekeeper'])for(const substitution of ['guardian','cleric','fourth'])for(const candidateKind of ['warden','reference'])for(const strategy of ['fresh','ritual','mentor','mentorRitual']){
  const rows=[];
  for(const base of cohort){
   const s=structuredClone(base);E.retreat(s);E.setAuto(s,false);E.setPolicy(s,'push');
   if(s.depth<40)continue;
   const budget=s.gold,candidate=E.generate(s,candidateKind==='warden'?'warden':substitution==='fourth'?'cleric':substitution);
   candidate.technique=null;s.applicants=[candidate];
   if(substitution==='fourth'&&!E.buyUpgrade(s,'quarters'))continue;
   if(!E.recruit(s,candidate.id))continue;
   if(strategy.toLowerCase().includes('ritual')){if(!E.unlockEquipment(s,'ritual'))continue;for(const a of s.roster)E.equip(s,a.id,'ritual');}
   if(strategy.toLowerCase().includes('mentor')){if(!E.buyUpgrade(s,'mentorship'))continue;E.mentor(s,candidate.id,'catchup');}
   if(substitution==='fourth')assert.ok(E.assign(s,candidate.id));
   else {const veteran=s.roster.find(a=>a.classId===substitution);assert.ok(E.assign(s,veteran.id));assert.ok(E.assign(s,candidate.id));}
   const level=candidate.level,spent=budget-s.gold;
   if(room==='nextGatekeeper')s.depth=Math.ceil((s.depth+1)/5)*5-1;
   assert.ok(E.startExpedition(s));E.advance(s,181);assert.equal(s.expedition,null);assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);
   rows.push({win:Number(s.lastReport.win),level,spent,seconds:s.lastReport.seconds});
  }
  const sum=k=>rows.reduce((n,r)=>n+r[k],0),mean=k=>rows.length?(sum(k)/rows.length).toFixed(1):'—';
  console.log([duration,room,substitution,candidateKind,strategy,rows.length,sum('win'),mean('level'),mean('spent'),mean('seconds')].join(','));
 }
}
