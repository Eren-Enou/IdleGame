import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
import {EQUIPMENT, UPGRADES} from '../src/content.js';

// All resources come from actual expeditions. Purchases are automated experimental
// policies, not a feature of the game. Stop each common source at its first depth 50.
function invest(s){for(const key of s.upgrades.training<=s.upgrades.infirmary?['training','infirmary']:['infirmary','training'])E.buyUpgrade(s,key);}
function resume(s){if(!s.expedition&&!s.auto){E.setPolicy(s,'push');E.setAuto(s,true);}}
function source(seed){
 const s=E.createGame(seed,0);for(const a of [...s.applicants]){E.recruit(s,a.id);E.assign(s,a.id);}E.setAuto(s,true);E.setPushLimit(s,50);
 for(let t=0;t<14400&&s.depth<50;t++){
  if(s.depth>=5)E.configureRecovery(s,true,10,80);
  for(const gear of ['steel','ritual'])E.unlockEquipment(s,gear);
  if(!s.expedition)for(const a of s.roster)if(s.equipmentUnlocked.includes(a.classId==='ranger'?'steel':'ritual'))E.equip(s,a.id,a.classId==='ranger'?'steel':'ritual');
  invest(s);E.tick(s);resume(s);
 }
 assert.equal(s.depth,50);assert.equal(s.expedition,null);E.setPushLimit(s,0);E.setPolicy(s,'push');E.setAuto(s,true);return s;
}
function run(base,arm,duration){
 const s=structuredClone(base); if(arm==='ritual-ranger')E.equip(s,s.roster.find(a=>a.classId==='ranger').id,'ritual'); const begin=s.clock,wins=s.records.wins,defeats=s.records.defeats;
 let spent=0,completed=['facilities','ritual-ranger'].includes(arm)?0:null,searchStarted=null,targetId=null;
 const pay=action=>{const gold=s.gold;const ok=action();spent+=gold-s.gold;return ok;};
 for(let t=0;t<duration;t++){
  if(completed===null){
   if(arm.startsWith('dawn')){
    if(!s.upgrades.cartography)pay(()=>E.buyUpgrade(s,'cartography'));
    if(s.upgrades.cartography&&!E.surveyComplete(s)&&s.policy!=='survey'&&!s.expedition){E.setPolicy(s,'survey');E.setAuto(s,true);searchStarted=s.clock-begin;}
    if(E.surveyComplete(s)){
     if(!s.equipmentUnlocked.includes('dawn'))pay(()=>E.unlockEquipment(s,'dawn'));
     if(s.equipmentUnlocked.includes('dawn')&&!s.expedition){const a=s.roster.find(a=>a.classId===(arm==='dawn-ranger'?'ranger':'guardian'));if(arm!=='dawn-unused')E.equip(s,a.id,'dawn');completed=s.clock-begin;}
     resume(s);
    }
   }else{
    const classId=arm==='fourth-warden'?'warden':'cleric';
    if(!s.upgrades.quarters)pay(()=>E.buyUpgrade(s,'quarters'));
    if(!s.upgrades.mentorship)pay(()=>E.buyUpgrade(s,'mentorship'));
    if(targetId===null){
     const a=s.applicants.find(a=>a.classId===classId),q=a&&E.recruitmentPreparation(s,a.id);
     if(a&&q?.affordable&&s.upgrades.quarters&&s.upgrades.mentorship&&pay(()=>E.recruit(s,a.id)))targetId=a.id;
     else if(!a&&t%120===0)pay(()=>E.refreshApplicants(s));
    }
    if(targetId!==null&&!s.expedition){pay(()=>E.mentor(s,targetId,'catchup'));E.equip(s,targetId,'ritual');assert.ok(E.assign(s,targetId));completed=s.clock-begin;}
   }
  }
  if(completed!==null)invest(s);
  E.tick(s);
  // Survey failure remains a failure observation; don't manufacture a discovery.
  if(s.policy!=='survey'||E.surveyComplete(s))resume(s);
 }
 assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);
 return {seed:base.seed,arm,duration,startClock:begin,startGold:base.gold,startLevel:base.roster[0].level,startTraining:base.upgrades.training,startInfirmary:base.upgrades.infirmary,depth:s.depth,wins:s.records.wins-wins,defeats:s.records.defeats-defeats,gold:s.gold,training:s.upgrades.training,infirmary:s.upgrades.infirmary,spent,completed,searchStarted,discovered:E.surveyComplete(s),party:s.party.map(id=>s.roster.find(a=>a.id===id).classId).join('/'),meanLevel:s.roster.reduce((n,a)=>n+a.level,0)/s.roster.length};
}
const rows=[];
for(let seed=1;seed<=60;seed++){const base=source(seed);base.seed=seed;for(const duration of [600,3600])for(const arm of ['facilities','ritual-ranger','dawn-ranger','dawn-guardian','dawn-unused','fourth-warden','fourth-cleric'])rows.push(run(base,arm,duration));}
const groups=[];
for(const duration of [600,3600])for(const arm of ['facilities','ritual-ranger','dawn-ranger','dawn-guardian','dawn-unused','fourth-warden','fourth-cleric']){
 const group=rows.filter(r=>r.arm===arm&&r.duration===duration),reference=rows.filter(r=>r.arm==='facilities'&&r.duration===duration),mean=key=>Number((group.reduce((n,r)=>n+(r[key]??0),0)/group.length).toFixed(2));
 groups.push({duration,arm,runs:group.length,completed:group.filter(r=>r.completed!==null).length,meanDepth:mean('depth'),meanDefeats:mean('defeats'),meanWins:mean('wins'),meanSpent:mean('spent'),meanCompletionSeconds:Number((group.filter(r=>r.completed!==null).reduce((n,r)=>n+r.completed,0)/Math.max(1,group.filter(r=>r.completed!==null).length)).toFixed(2)),meanTraining:mean('training'),meanInfirmary:mean('infirmary'),deeper:group.filter((r,i)=>r.depth>reference[i].depth).length,shallower:group.filter((r,i)=>r.depth<reference[i].depth).length});
}
console.log(JSON.stringify({experiment:'021-discovery-opportunity-cost',deskCost:UPGRADES.cartography.cost,commissionCost:EQUIPMENT.dawn.cost,groups,rows},null,2));
