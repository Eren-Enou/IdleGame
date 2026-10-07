import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
import {TECHNIQUES} from '../src/content.js';
import {mixedJourney} from './journey-scenarios.js';
function fight(s){E.retreat(s);s.auto=false;s.policy='push';assert.ok(E.startExpedition(s));for(let t=0;s.expedition&&t<181;t++)E.tick(s);assert.equal(s.expedition,null);assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);return s.lastReport.win;}
console.log('duration,room,class,technique,eligiblePairs,originalWins,freshWins,mentoredWins,meanEnteringMentoredLevel,meanGoldSpent,meanFreshSeconds,meanMentoredSeconds');
for(const duration of [600,3600,14400]){
 const cohort=Array.from({length:30},(_,i)=>mixedJourney(i+1,duration));
 for(const room of ['frontier','nextGatekeeper'])for(const classId of ['guardian','ranger','cleric'])for(const technique of [null,...Object.keys(TECHNIQUES).filter(k=>TECHNIQUES[k].classId===classId)]){
  const rows=[];
  for(const base of cohort){
   const source=structuredClone(base);E.retreat(source);source.auto=false;const candidate=E.generate(source,classId);candidate.technique=technique;source.applicants=[candidate];
   const fresh=structuredClone(source),trained=structuredClone(source);const veteran=source.roster.find(a=>a.classId===classId);
   if(!E.recruit(fresh,candidate.id)||!E.buyUpgrade(trained,'mentorship')||!E.recruit(trained,candidate.id))continue;
   const costBefore=source.gold;E.mentor(trained,candidate.id,'catchup');
   const a=trained.roster.find(a=>a.id===candidate.id),level=a.level;
   fresh.party=fresh.party.map(id=>id===veteran.id?candidate.id:id);trained.party=trained.party.map(id=>id===veteran.id?candidate.id:id);
   if(room==='nextGatekeeper')for(const s of [source,fresh,trained])s.depth=Math.ceil((s.depth+1)/5)*5-1;
   rows.push({original:Number(fight(source)),fresh:Number(fight(fresh)),trained:Number(fight(trained)),level,freshSeconds:fresh.lastReport.seconds,trainedSeconds:trained.lastReport.seconds,spent:costBefore-trained.gold+trained.lastReport.reward});
  }
  const sum=k=>rows.reduce((n,r)=>n+r[k],0),mean=k=>rows.length?(sum(k)/rows.length).toFixed(1):'—';
  console.log([duration,room,classId,technique||'standard',rows.length,sum('original'),sum('fresh'),sum('trained'),mean('level'),mean('spent'),mean('freshSeconds'),mean('trainedSeconds')].join(','));
 }
}
