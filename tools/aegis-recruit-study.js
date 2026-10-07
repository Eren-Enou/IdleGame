import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
import {mixedJourney} from './journey-scenarios.js';
const rows=[];
for(const duration of [600,3600,14400])for(let seed=1;seed<=30;seed++){
 const base=mixedJourney(seed,duration);E.retreat(base);E.setAuto(base,false);if(base.depth<60)continue;
 // Conditional on a Cleric applicant: paired techniques reuse origin/talent/name.
 const candidate=E.generate(base,'cleric');base.applicants=[candidate];
 for(const room of ['frontier','gatekeeper'])for(const substitution of ['cleric','fourth'])for(const technique of [null,'quiet','greater','aegis'])for(const strategy of ['fresh','ritual','mentor','mentorRitual','mentorDawn']){
  const s=structuredClone(base),a=s.applicants[0],budget=s.gold,clock=s.clock;a.technique=technique;
  let eligible=true,reason='',searchWins=0,purchased=0;
  const buy=action=>{const before=s.gold;const ok=action();purchased+=before-s.gold;return ok;};
  const require=(ok,why)=>{if(!ok){eligible=false;reason=why;}return ok;};
  if(substitution==='fourth'&&!require(buy(()=>E.buyUpgrade(s,'quarters')),'quarters')){}
  if(eligible&&strategy==='mentorDawn'){
   if(!s.upgrades.cartography)require(buy(()=>E.buyUpgrade(s,'cartography')),'desk');
   if(eligible){const wins=s.records.wins;E.setPolicy(s,'survey');E.setAuto(s,true);for(let t=0;t<14400&&s.auto;t++)E.tick(s);searchWins=s.records.wins-wins;require(E.surveyComplete(s),'survey');}
   if(eligible)require(buy(()=>E.unlockEquipment(s,'dawn')),'Dawn commission');
  }
  if(eligible&&strategy.toLowerCase().includes('ritual'))require(buy(()=>E.unlockEquipment(s,'ritual')),'ritual commission');
  if(eligible&&strategy.startsWith('mentor'))require(buy(()=>E.buyUpgrade(s,'mentorship')),'mentorship hall');
  if(eligible)require(buy(()=>E.recruit(s,a.id)),'hire');
  if(eligible&&strategy.startsWith('mentor'))require(buy(()=>E.mentor(s,a.id,'catchup')),'training');
  if(eligible){
   if(strategy==='ritual'||strategy==='mentorRitual')E.equip(s,a.id,'ritual');
   if(strategy==='mentorDawn')E.equip(s,a.id,'dawn');
   if(substitution==='cleric')E.assign(s,s.roster.find(a=>a.classId==='cleric').id);
   assert.ok(E.assign(s,a.id));E.setPolicy(s,'push');E.setAuto(s,false);
   const entering={level:a.level,mentorLevel:Math.max(...s.roster.map(a=>a.level)),spent:purchased,netSpent:budget-s.gold,preparationSeconds:s.clock-clock,searchWins,depth:s.depth+1};
   const target=room==='frontier'?s.depth+1:Math.ceil((s.depth+1)/5)*5,begin=s.clock,beforeWins=s.records.wins;E.setPushLimit(s,target);E.setAuto(s,true);for(let t=0;t<1080&&s.auto;t++)E.tick(s);assert.equal(s.auto,false);assert.equal(s.expedition,null);assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);const r=s.lastReport,u=r.units.find(u=>u.id===a.id);
   rows.push({duration,seed,room,substitution,technique:technique||'standard',strategy,eligible:true,...entering,win:s.depth>=target,seconds:r.seconds,routeSeconds:s.clock-begin,cleared:s.records.wins-beforeWins,healing:u.healing,warded:u.warded});
  }else {assert.deepEqual(E.restore(E.serialize(s,0),0).state,s);rows.push({duration,seed,room,substitution,technique:technique||'standard',strategy,eligible:false,reason});}
 }
}
const groups=[];
for(const duration of [600,3600,14400])for(const room of ['frontier','gatekeeper'])for(const substitution of ['cleric','fourth'])for(const technique of ['standard','quiet','greater','aegis'])for(const strategy of ['fresh','ritual','mentor','mentorRitual','mentorDawn']){
 const group=rows.filter(r=>r.duration===duration&&r.room===room&&r.substitution===substitution&&r.technique===technique&&r.strategy===strategy),eligible=group.filter(r=>r.eligible),mean=k=>eligible.length?Number((eligible.reduce((n,r)=>n+r[k],0)/eligible.length).toFixed(2)):null;
 groups.push({duration,room,substitution,technique,strategy,attempted:group.length,eligible:eligible.length,wins:eligible.filter(r=>r.win).length,level:mean('level'),mentorLevel:mean('mentorLevel'),spent:mean('spent'),netSpent:mean('netSpent'),preparationSeconds:mean('preparationSeconds'),seconds:mean('seconds'),routeSeconds:mean('routeSeconds'),cleared:mean('cleared')});
}
console.log(JSON.stringify({experiment:'023-aegis-recruitment',eligibleRoutes:rows.filter(r=>r.eligible).length,encounters:rows.filter(r=>r.eligible).reduce((n,r)=>n+r.cleared+Number(!r.win),0),groups,rows},null,2));
