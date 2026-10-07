import * as E from '../src/engine.js';
const parties={balanced:['guardian','ranger','cleric'],barrage:['ranger','ranger','ranger'],skirmish:['guardian','ranger','ranger'],sustain:['guardian','cleric','cleric']};
const builds=['none','steel','ritual','role'], levels=[12,20,28], depths=[35,45,55], seeds=50;
const results=[];
for(const level of levels) for(const depth of depths) for(const [party,classes] of Object.entries(parties)) for(const build of builds){
 let wins=0,seconds=0,downed=0;
 for(let seed=1;seed<=seeds;seed++){
  const s=E.createGame(seed,0);s.roster=classes.map(c=>E.generate(s,c));s.party=s.roster.map(a=>a.id);s.depth=depth-1;s.upgrades.training=s.upgrades.infirmary=2;s.equipmentUnlocked=['steel','ritual'];
  for(const a of s.roster){a.level=level;E.equip(s,a.id,build==='none'?null:build==='role'?(a.classId==='ranger'?'steel':'ritual'):build);}
  E.startExpedition(s);for(let t=0;s.expedition&&t<181;t++)E.tick(s);
  if(s.expedition)throw new Error(`Nonterminating fight: ${seed}, ${depth}, ${party}, ${build}`);
  wins+=Number(s.lastReport.win);seconds+=s.lastReport.seconds;downed+=s.lastReport.units.filter(u=>!u.survived).length;
 }
 results.push({level,depth,party,build,winPercent:wins/seeds*100,seconds:Math.round(seconds/seeds*10)/10,meanDowned:downed/seeds});
}
// Print near-wall cells and directly comparable choices, omitting universally trivial/impossible cells.
console.log('level,depth,party,none,steel,ritual,role');
for(const level of levels) for(const depth of depths) for(const party of Object.keys(parties)){
 const rows=results.filter(r=>r.level===level&&r.depth===depth&&r.party===party);
 if(rows.every(r=>r.winPercent===0)||rows.every(r=>r.winPercent===100))continue;
 console.log([level,depth,party,...rows.map(r=>`${r.winPercent}%/${r.seconds}s`)].join(','));
}
console.log(JSON.stringify({encounters:results.length*seeds,levels,depths,seeds,builds,byBuild:builds.map(build=>{
 const rows=results.filter(r=>r.build===build);return {build,meanWinPercent:Math.round(rows.reduce((n,r)=>n+r.winPercent,0)/rows.length*10)/10,meanSeconds:Math.round(rows.reduce((n,r)=>n+r.seconds,0)/rows.length*10)/10};
})},null,2));
