import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
const policies=['training','mixed','fourth'], runs=50, duration=3600, results=[];
for(const policy of policies){
 const rows=[];
 for(let seed=1;seed<=runs;seed++){
  const s=E.createGame(seed,0);for(const a of [...s.applicants]){E.recruit(s,a.id);E.assign(s,a.id);}s.auto=true;
  let farmRooms=0, lastWins=0, lastDefeats=0, resumed=0;
  for(let t=0;t<duration;t++){
   if(policy==='fourth' && !s.expedition && s.roster.length<4 && s.depth>=5){
    if(!s.upgrades.quarters) E.buyUpgrade(s,'quarters');
    if(s.upgrades.quarters){
     const a=s.applicants.find(a=>a.classId==='ranger');
     if(a && E.recruit(s,a.id)) E.assign(s,a.id);
     else if(!a && s.gold>=45) E.refreshApplicants(s);
    }
   }
   if(policy==='training') E.buyUpgrade(s,'training');
   else {
    const order=s.upgrades.training<=s.upgrades.infirmary?['training','infirmary']:['infirmary','training'];
    for(const k of order) E.buyUpgrade(s,k);
   }
   E.tick(s);
   if(s.records.defeats>lastDefeats){s.policy='farm';s.farmDepth=Math.max(1,s.depth);s.auto=true;farmRooms=0;lastDefeats=s.records.defeats;}
   if(s.records.wins>lastWins){
    if(s.policy==='farm' && ++farmRooms>=10){s.policy='push';resumed++;}
    lastWins=s.records.wins;
   }
   assert.ok(Number.isFinite(s.gold));assert.ok(s.gold>=0);
  }
  // Validate the entire late-session save through the actual loading path.
  const loaded=E.restore(E.serialize(s,0),0).state;
  assert.deepEqual(loaded,s);
  rows.push({depth:s.depth,defeats:s.records.defeats,resumed,training:s.upgrades.training,infirmary:s.upgrades.infirmary,roster:s.roster.length});
 }
 const mean=k=>Math.round(rows.reduce((n,r)=>n+r[k],0)/runs*10)/10;
 results.push({policy,runs,depth:{min:Math.min(...rows.map(r=>r.depth)),mean:mean('depth'),max:Math.max(...rows.map(r=>r.depth))},meanDefeats:mean('defeats'),meanPushResumptions:mean('resumed'),meanTraining:mean('training'),meanInfirmary:mean('infirmary'),fourthRecruited:rows.filter(r=>r.roster===4).length});
}
console.log(JSON.stringify({experiment:'003-one-hour-recovery-journeys',seedRange:[1,runs],duration,results},null,2));
