import * as E from '../src/engine.js';
const builds={none:[null,null,null],steel:['steel','steel','steel'],ritual:['ritual','ritual','ritual'],specialists:['ritual','steel','ritual']};
console.log('level,depth,build,wins,meanSeconds');
for(const level of [8,12]) for(const depth of [25,35,45]) for(const [build,items] of Object.entries(builds)){
 let wins=0,time=0;
 for(let seed=1;seed<=100;seed++){
  const s=E.createGame(seed,0);for(const a of [...s.applicants]){E.recruit(s,a.id);E.assign(s,a.id);}s.equipmentUnlocked=['steel','ritual'];s.depth=depth-1;s.upgrades.training=s.upgrades.infirmary=2;
  s.roster.forEach((a,i)=>{a.level=level;E.equip(s,a.id,items[i]);});
  E.startExpedition(s);for(let t=0;s.expedition&&t<181;t++)E.tick(s);
  if(s.expedition)throw new Error('Nonterminating equipment study encounter');
  wins+=Number(s.lastReport.win);time+=s.lastReport.seconds;
  E.restore(E.serialize(s,0),0);
 }
 console.log(`${level},${depth},${build},${wins},${(time/100).toFixed(1)}`);
}
