import test from 'node:test';
import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
import { CLASSES, ORIGINS } from '../src/content.js';
function ready(seed=123) { const s=E.createGame(seed,0); for(const a of [...s.applicants]) { E.recruit(s,a.id); E.assign(s,a.id); } return s; }
function room(s) { E.startExpedition(s); for(let i=0;s.expedition && i<181;i++) E.tick(s); assert.equal(s.expedition,null); return s.lastReport; }
test('seeded characters are reproducible and origin-compatible across 1000 generations',()=>{
 const a=E.createGame(123,0), b=E.createGame(123,0); assert.deepEqual(a,b);
 for(let i=0;i<1000;i++){const c=E.generate(a); assert.ok(ORIGINS[c.origin].classes.includes(c.classId)); const t=E.stats(a,c); assert.ok(t.hp>0&&t.attack>0&&t.speed>0); assert.ok(CLASSES[c.classId].ability.tags.length);}
});
test('starting gold buys a complete balanced party; cannot recruit twice',()=>{const s=ready();assert.equal(s.roster.length,3);assert.equal(s.gold,15);assert.equal(E.recruit(s,1),false);assert.equal(s.party.length,3);});
test('party assignment and dismissal remain locked during combat',()=>{const s=ready();E.startExpedition(s);assert.equal(E.assign(s,s.party[0]),false);assert.equal(E.dismiss(s,s.party[0]),false);});
test('successful combat awards gold and XP exactly once',()=>{const s=ready(), r=room(s);assert.equal(r.win,true);assert.equal(s.depth,1);assert.equal(s.gold,30);assert.equal(s.roster[0].xp,10);E.tick(s);assert.equal(s.gold,30);});
test('baseline party clears first gatekeeper and levels up',()=>{for(let seed=1;seed<=50;seed++){const s=ready(seed);for(let i=0;i<5;i++)assert.equal(room(s).win,true,`seed ${seed}, room ${i+1}`);assert.equal(s.depth,5);assert.ok(s.roster.every(a=>a.level>1));}});
test('upgrades change future statistics and require payment',()=>{const s=ready();assert.equal(E.buyUpgrade(s,'training'),false);s.gold=100;const before=E.stats(s,s.roster[0]);assert.equal(E.buyUpgrade(s,'training'),true);assert.equal(s.gold,35);assert.ok(E.stats(s,s.roster[0]).attack>before.attack);s.gold=100;E.buyUpgrade(s,'quarters');assert.equal(E.partySlots(s),4);assert.equal(E.capacity(s),8);});
test('farm orders never push frontier; selected farm depth is bounded',()=>{const s=ready();for(let i=0;i<3;i++)room(s);s.policy='farm';s.farmDepth=2;assert.equal(room(s).depth,2);assert.equal(s.depth,3);s.farmDepth=999;assert.equal(room(s).depth,3);});
test('defeat ends automation without deleting characters',()=>{const s=ready();s.depth=999;s.auto=true;const r=room(s);assert.equal(r.win,false);assert.equal(s.auto,false);assert.equal(s.roster.length,3);assert.equal(s.records.defeats,1);assert.equal(s.gold,15);});
test('recall gives no unfinished reward and ends automation',()=>{const s=ready();s.auto=true;E.startExpedition(s);assert.ok(E.retreat(s));assert.equal(s.auto,false);assert.equal(s.gold,15);assert.equal(s.expedition,null);});
test('idle simulation is identical to one-second live simulation',()=>{const a=ready(),b=ready();a.auto=b.auto=true;E.advance(a,1000);for(let i=0;i<1000;i++)E.tick(b);assert.deepEqual(a,b);});
test('save reload preserves in-flight combat and deterministic continuation',()=>{const a=ready();E.startExpedition(a);E.tick(a);const b=E.restore(E.serialize(a,0),0).state;assert.deepEqual(a,b);E.advance(a,10);E.advance(b,10);assert.deepEqual(a,b);});
test('offline results honor orders, cap elapsed time, stop on defeat',()=>{const s=ready();s.auto=true;const r=E.restore(E.serialize(s,0),86400000);assert.equal(r.away.seconds,E.MAX_OFFLINE);assert.ok(r.away.gold>0);assert.equal(r.state.auto,false);assert.equal(r.away.defeats,1);});
test('backward clock does not advance or take away resources',()=>{const s=ready();const r=E.restore(E.serialize(s,5000),0);assert.equal(r.away.seconds,0);assert.equal(r.state.gold,s.gold);});
test('applicants refill without replacing existing candidates',()=>{const s=E.createGame(1,0),keep=s.applicants[1];E.recruit(s,s.applicants[0].id);E.advance(s,120);assert.equal(s.applicants.length,3);assert.deepEqual(s.applicants[0],keep);});
test('malformed, unsupported and inconsistent saves are rejected',()=>{for(const mutate of [s=>s.version=999,s=>s.gold=-1,s=>s.upgrades.training='bad',s=>s.party=[999],s=>s.roster[0].origin='__proto__',s=>s.applicants.push(s.roster[0]),s=>s.roster[0].talent=null,s=>s.expedition.units[0].speed=0,s=>s.expedition.enemy.hp=Infinity,s=>s.expedition.units=[]]){const s=ready();E.startExpedition(s);mutate(s);assert.throws(()=>E.restore(JSON.stringify(s),0));}});
test('encounters are finite and escalating across distant depths',()=>{let previous=0;for(const depth of [1,10,100,1000,10000,100000]){const e=E.makeEnemy(depth);assert.ok(Number.isFinite(e.hp));assert.ok(e.hp>previous);previous=e.hp;}});
test('shields and healing contribute to a long fight',()=>{const s=ready();s.depth=4;const r=room(s);assert.equal(r.win,true);assert.ok(r.units.some(u=>u.healing>0));});
test('empty guild can recover after spending the entire treasury',()=>{const s=E.createGame(1,0);s.gold=0;const a=s.applicants[0];assert.equal(E.recruitmentCost(s,a),0);assert.ok(E.recruit(s,a.id));assert.equal(E.recruitmentCost(s,s.applicants[0]),25);E.assign(s,a.id);assert.ok(room(s).win);assert.ok(s.gold>0);});
test('bleed damage is attributed to its ranger and shields record absorbed damage',()=>{const s=ready();s.depth=4;E.startExpedition(s);const hp=s.expedition.enemy.hp;const r=roomActive(s);assert.ok(r.units.reduce((n,u)=>n+u.damage,0)<=hp);assert.ok(r.units.find(u=>s.roster.find(a=>a.id===u.id).classId==='ranger').damage>0);assert.ok(r.units.some(u=>u.blocked>0));});
function roomActive(s) { while(s.expedition) E.tick(s); return s.lastReport; }
test('last expedition report survives save reload',()=>{const s=ready();room(s);const r=E.restore(E.serialize(s,0),0);assert.deepEqual(r.state.lastReport,s.lastReport);});
test('malformed report cannot crash the interface',()=>{const s=ready();s.lastReport={units:'bad'};assert.throws(()=>E.restore(E.serialize(s,0),0));});
