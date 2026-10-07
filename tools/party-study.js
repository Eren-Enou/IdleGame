import * as E from '../src/engine.js';
const parties = {
 balanced: ['guardian','ranger','cleric'],
 barrage: ['ranger','ranger','ranger'],
 skirmish: ['guardian','ranger','ranger'],
 sustain: ['guardian','cleric','cleric'],
 hunt: ['ranger','ranger','cleric'],
 fortress: ['guardian','guardian','guardian'],
};
const seeds=100, rows=[];
for(const depth of [5,15,25,35]) for(const [name,classes] of Object.entries(parties)) {
 let wins=0,time=0,health=0;
 for(let seed=1;seed<=seeds;seed++) {
  const s=E.createGame(seed,0);s.roster=classes.map(c=>E.generate(s,c));s.roster.forEach(a=>a.level=8);s.party=s.roster.map(a=>a.id);s.depth=depth-1;s.upgrades.training=2;s.upgrades.infirmary=2;
  E.startExpedition(s); while(s.expedition){health=s.expedition.units.reduce((n,u)=>n+u.hp,0);E.tick(s);}
  wins+=Number(s.lastReport.win);time+=s.lastReport.seconds;
 }
 rows.push({depth,party:name,winPercent:wins,meanSeconds:Math.round(time/seeds*10)/10});
}
console.log(JSON.stringify({experiment:'002-fixed-party-comparison',seeds,level:8,training:2,infirmary:2,rows},null,2));
