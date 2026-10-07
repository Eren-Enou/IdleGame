import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import * as E from '../src/engine.js';
const baseline='4db6b41';
const read=path=>execFileSync('git',['show',`${baseline}:${path}`],{encoding:'utf8'});
const moduleUrl=source=>`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const old=await import(moduleUrl(read('src/engine.js').replace("'./content.js'",JSON.stringify(moduleUrl(read('src/content.js'))))));
const withoutName=({name,...a})=>a;
const duplicate=s=>new Set([...s.roster,...s.applicants].map(a=>a.name)).size<s.roster.length+s.applicants.length;
let oldCollisions=0,newCollisions=0,comparedBatches=0,fights=0;
for(let seed=1;seed<=200;seed++){
 const before=old.createGame(seed,0),after=E.createGame(seed,0);
 for(const [engine,s] of [[old,before],[E,after]]){
  for(const a of [...s.applicants]){engine.recruit(s,a.id);engine.assign(s,a.id);}
  s.depth=40;s.upgrades.quarters=6;s.gold=100000;
  while(s.roster.length<engine.capacity(s)){s.applicants=[engine.generate(s)];engine.recruit(s,s.applicants[0].id);}
 }
 assert.deepEqual(after.roster.map(withoutName),before.roster.map(withoutName));
 for(let batch=0;batch<100;batch++){
  old.refreshApplicants(before);E.refreshApplicants(after);
  oldCollisions+=Number(duplicate(before));newCollisions+=Number(duplicate(after));comparedBatches++;
  assert.deepEqual(after.applicants.map(withoutName),before.applicants.map(withoutName));assert.equal(after.rng,before.rng);
 }
 for(const [engine,s] of [[old,before],[E,after]]){
  s.depth=44;for(const a of s.roster)a.level=20;s.upgrades.training=s.upgrades.infirmary=2;
  engine.startExpedition(s);engine.advance(s,181);assert.equal(s.expedition,null);
  assert.deepEqual(engine.restore(engine.serialize(s,0),0).state,s);
 }
 const fingerprint=s=>({rng:s.rng,depth:s.depth,gold:s.gold,records:s.records,roster:s.roster.map(withoutName),report:{...s.lastReport,events:[],units:s.lastReport.units.map(withoutName)}});
 assert.deepEqual(fingerprint(after),fingerprint(before));fights++;
}
console.log(JSON.stringify({experiment:'origin-names-and-mechanical-parity',baseline,seeds:200,comparedBatches,oldCollisionBatches:oldCollisions,newCollisionBatches:newCollisions,pairedFights:fights},null,2));
