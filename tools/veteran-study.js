import assert from 'node:assert/strict';
import * as E from '../src/engine.js';

const runs=Number(process.argv[2]||20);
if(!Number.isInteger(runs)||runs<1||runs>100)throw new Error('Use 1–100 seeds.');
const checkpoints=[3600,14400,28800,86400];
const results=[];
for(const policy of ['three','four','ritual-four']){
 const rows=[];
 for(let seed=1;seed<=runs;seed++){
  const s=E.createGame(seed,0);
  for(const a of [...s.applicants]){E.recruit(s,a.id);E.assign(s,a.id);}
  E.setAuto(s,true);
  let cappedAt=null,lastInvestment=0,fourthAt=null,equipmentAt=null;
  for(let t=1;t<=86400;t++){
   if(s.depth>=5&&!s.recovery.enabled)E.configureRecovery(s,true,10,80);
   if(policy!=='three'&&s.depth>=5&&s.roster.length<4&&!s.expedition){
    if(!s.upgrades.quarters)E.buyUpgrade(s,'quarters');
    if(s.upgrades.quarters){
     const recruit=s.applicants.find(a=>a.classId==='ranger');
     if(recruit&&E.recruit(s,recruit.id)){E.assign(s,recruit.id);fourthAt=t;}
     else if(!recruit)E.refreshApplicants(s);
    }
   }
   if(policy==='ritual-four'&&s.depth>=10&&!s.equipmentUnlocked.includes('ritual')&&E.unlockEquipment(s,'ritual'))equipmentAt=t;
   if(policy==='ritual-four'&&!s.expedition&&s.equipmentUnlocked.includes('ritual'))for(const a of s.roster)if(a.equipment!=='ritual')E.equip(s,a.id,'ritual');
   for(const k of s.upgrades.training<=s.upgrades.infirmary?['training','infirmary']:['infirmary','training'])if(E.buyUpgrade(s,k))lastInvestment=t;
   if(cappedAt===null&&s.upgrades.training===20&&s.upgrades.infirmary===20)cappedAt=t;
   E.tick(s);
   if(checkpoints.includes(t)){
    assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);
    rows.push({seconds:t,depth:s.depth,level:s.roster[0].level,gold:s.gold,wins:s.records.wins,defeats:s.records.defeats,training:s.upgrades.training,infirmary:s.upgrades.infirmary,cappedAt,lastInvestment,fourthAt,equipmentAt,active:s.auto,regionsVisited:Math.min(3,Math.ceil(s.depth/10)),regionCycles:Math.floor(s.depth/30)});
   }
  }
 }
 for(const seconds of checkpoints){
  const cohort=rows.filter(r=>r.seconds===seconds),mean=k=>Math.round(cohort.reduce((n,r)=>n+r[k],0)/runs*10)/10;
  const capped=cohort.filter(r=>r.cappedAt!==null);
  results.push({policy,seconds,runs,depth:mean('depth'),level:mean('level'),gold:mean('gold'),wins:mean('wins'),defeats:mean('defeats'),training:mean('training'),infirmary:mean('infirmary'),capped:capped.length,meanCapMinute:capped.length?Math.round(capped.reduce((n,r)=>n+r.cappedAt,0)/capped.length/60*10)/10:null,minutesSinceInvestment:Math.round((seconds-mean('lastInvestment'))/60*10)/10,fourthRecruited:cohort.filter(r=>r.fourthAt!==null).length,patternCommissioned:cohort.filter(r=>r.equipmentAt!==null).length,activeOrders:cohort.filter(r=>r.active).length,regionCycles:mean('regionCycles')});
 }
}
console.log(JSON.stringify({experiment:'veteran-capability-progression',seedRange:[1,runs],checkpoints,results},null,2));
