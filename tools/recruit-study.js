import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
import {TECHNIQUES} from '../src/content.js';
const classes=['guardian','ranger','cleric'];
const options=classes.map(c=>[null,...Object.keys(TECHNIQUES).filter(k=>TECHNIQUES[k].classId===c)]);
const outcomes=[];
for(const depth of [35,45,55])for(const equipment of [null,'steel','ritual'])for(const guardian of options[0])for(const ranger of options[1])for(const cleric of options[2]){
 let wins=0,seconds=0;
 for(let seed=1;seed<=50;seed++){
  const s=E.createGame(seed,0);s.roster=s.applicants;s.applicants=[];s.party=s.roster.map(a=>a.id);s.depth=depth-1;s.upgrades.training=s.upgrades.infirmary=2;s.equipmentUnlocked=['steel','ritual'];
  s.roster.forEach((a,i)=>{a.level=depth===35?12:20;a.equipment=equipment;a.technique=[guardian,ranger,cleric][i];});
  E.startExpedition(s);for(let t=0;s.expedition&&t<181;t++)E.tick(s);assert.equal(s.expedition,null);
  assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);wins+=Number(s.lastReport.win);seconds+=s.lastReport.seconds;
 }
 outcomes.push({depth,equipment:equipment||'none',guardian:guardian||'standard',ranger:ranger||'standard',cleric:cleric||'standard',wins,seconds:Math.round(seconds/50*10)/10});
}
console.log('Combination study: 12,150 encounters; 50 seeds per combination.');
for(const depth of [35,45,55])for(const equipment of ['none','steel','ritual']){
 const group=outcomes.filter(r=>r.depth===depth&&r.equipment===equipment).sort((a,b)=>b.wins-a.wins||a.seconds-b.seconds);
 console.log(JSON.stringify({depth,equipment,best:group[0],worst:group.at(-1),standard:group.find(r=>[r.guardian,r.ranger,r.cleric].every(t=>t==='standard'))}));
}
for(const duration of [600,3600,14400]){
 const rows=[];
 for(let seed=1;seed<=10;seed++){
  const s=E.createGame(seed,0);for(const a of [...s.applicants]){E.recruit(s,a.id);E.assign(s,a.id);}s.auto=true;let farmWins=0,lastWins=0,lastDefeats=0;
  for(let t=0;t<duration;t++){
   for(const k of s.upgrades.training<=s.upgrades.infirmary?['training','infirmary']:['infirmary','training'])E.buyUpgrade(s,k);
   E.tick(s);
   if(s.records.defeats>lastDefeats){s.policy='farm';s.farmDepth=Math.max(1,s.depth);s.auto=true;farmWins=0;lastDefeats=s.records.defeats;}
   if(s.records.wins>lastWins){if(s.policy==='farm'&&++farmWins>=10)s.policy='push';lastWins=s.records.wins;}
  }
  assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);
  const candidate=E.generate(s,'ranger'),veteran=s.roster.find(a=>a.classId==='ranger');
  const row={depth:s.depth,gold:s.gold,veteran:veteran.level,recruit:candidate.level,powerRatio:E.stats(s,candidate).attack/E.stats(s,veteran).attack};
  E.retreat(s);s.applicants=[candidate];
  if(E.buyUpgrade(s,'mentorship')&&E.recruit(s,candidate.id))E.mentor(s,candidate.id,'catchup');
  row.mentoredLevel=candidate.level;row.mentoredPowerRatio=E.stats(s,candidate).attack/E.stats(s,veteran).attack;
  row.spent=row.gold-s.gold;
  assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);rows.push(row);
 }
 const mean=k=>Math.round(rows.reduce((n,r)=>n+r[k],0)/rows.length*100)/100;
 console.log(JSON.stringify({duration,seeds:10,meanDepth:mean('depth'),meanGold:mean('gold'),meanVeteran:mean('veteran'),meanRecruit:mean('recruit'),meanPowerRatio:mean('powerRatio'),meanMentoredLevel:mean('mentoredLevel'),meanMentoredPowerRatio:mean('mentoredPowerRatio'),meanSpent:mean('spent')}));
}
