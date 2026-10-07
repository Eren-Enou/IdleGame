import * as E from '../src/engine.js';
const runs=200;
const results=[];
for(const investment of ['none','training','infirmary']){
 const depths=[], seconds=[], defeats=[];
 for(let seed=1;seed<=runs;seed++){
  const s=E.createGame(seed,0);for(const a of [...s.applicants]){E.recruit(s,a.id);E.assign(s,a.id);}s.auto=true;
  for(let t=0;t<3600;t++){
   if(investment!=='none') E.buyUpgrade(s,investment);
   E.tick(s);
   if(!s.auto){defeats.push(t);break;}
  }
  depths.push(s.depth);seconds.push(s.clock);
 }
 const avg=a=>Math.round(a.reduce((x,y)=>x+y,0)/a.length*10)/10;
 results.push({investment,runs,depth:{min:Math.min(...depths),mean:avg(depths),max:Math.max(...depths)},meanSeconds:avg(seconds),defeats:defeats.length});
}
console.log(JSON.stringify({experiment:'001-opening-progression',seedRange:[1,runs],maxSeconds:3600,results},null,2));
