import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
console.log('investment,percent,seeds,meanDepth,meanWins,meanDefeats,activeOrders');
for(const investment of ['none','training','mixed'])for(const percent of [60,80,95]){
 const rows=[];
 for(let seed=1;seed<=20;seed++){
  const s=E.createGame(seed,0);for(const a of [...s.applicants]){E.recruit(s,a.id);E.assign(s,a.id);}s.auto=true;
  for(let t=0;t<14400;t++){
   if(s.depth>=5&&!s.recovery.enabled)E.configureRecovery(s,true,10,percent);
   if(investment==='training')E.buyUpgrade(s,'training');
   if(investment==='mixed')for(const k of s.upgrades.training<=s.upgrades.infirmary?['training','infirmary']:['infirmary','training'])E.buyUpgrade(s,k);
   E.tick(s);
  }
  assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);rows.push({depth:s.depth,wins:s.records.wins,defeats:s.records.defeats,active:Number(s.auto)});
 }
 const sum=k=>rows.reduce((n,r)=>n+r[k],0),mean=k=>(sum(k)/rows.length).toFixed(1);
 console.log([investment,percent,rows.length,mean('depth'),mean('wins'),mean('defeats'),sum('active')].join(','));
}
