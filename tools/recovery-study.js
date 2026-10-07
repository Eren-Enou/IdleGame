import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
console.log('seconds,recoveryVictories,seeds,meanDepth,meanWins,meanDefeats,meanGold,ordersStillActive');
for(const duration of [3600,14400])for(const rooms of [0,5,10,20]){
 const rows=[];
 for(let seed=1;seed<=30;seed++){
  const s=E.createGame(seed,0);for(const a of [...s.applicants]){E.recruit(s,a.id);E.assign(s,a.id);}s.auto=true;
  for(let t=0;s.depth<5&&t<1000;t++)E.tick(s);assert.ok(s.depth>=5,'Opening must unlock recovery.');
  if(rooms)E.configureRecovery(s,true,rooms);
  E.advance(s,duration);assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);
  rows.push({depth:s.depth,wins:s.records.wins,defeats:s.records.defeats,gold:s.gold,active:Number(s.auto)});
 }
 const sum=k=>rows.reduce((n,r)=>n+r[k],0),mean=k=>(sum(k)/rows.length).toFixed(1);
 console.log([duration,rooms,rows.length,mean('depth'),mean('wins'),mean('defeats'),mean('gold'),sum('active')].join(','));
}
