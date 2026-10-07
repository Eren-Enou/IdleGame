import { CLASSES, ORIGINS, UPGRADES, STRATA, GATEKEEPERS } from './content.js';
export const VERSION = 1;
export const MAX_OFFLINE = 4 * 60 * 60;
export function random(s) { s.rng = (Math.imul(s.rng, 1664525) + 1013904223) >>> 0; return s.rng / 4294967296; }
const pick = (s, a) => a[Math.floor(random(s) * a.length)];
const names = { Dwarf: ['Brin', 'Orra', 'Thorek', 'Dagna', 'Borin'], Elf: ['Ilyra', 'Thalen', 'Syl', 'Aerin', 'Veya'], Human: ['Mara', 'Edric', 'Nell', 'Rowan', 'Tamsin'] };
export function generate(s, forcedClass) {
  if (forcedClass && !Object.hasOwn(CLASSES,forcedClass)) throw new Error('Unknown adventurer class.');
  const origin = pick(s, Object.keys(ORIGINS).filter(k => !forcedClass || ORIGINS[k].classes.includes(forcedClass)));
  const o = ORIGINS[origin], classId = forcedClass || pick(s, o.classes);
  return { id: s.nextId++, name: pick(s, names[o.species]), origin, classId, talent: 0.95 + Math.floor(random(s) * 11) / 100, level: Math.min(1000,1 + Math.floor(s.depth / 10)), xp: 0 };
}
export function stats(s, a) {
  const c = CLASSES[a.classId], o = ORIGINS[a.origin], growth = 1 + (a.level - 1) * .12;
  return { hp: Math.round(c.hp * o.hp * a.talent * growth * (1 + s.upgrades.infirmary * .15)), attack: Math.round(c.attack * o.attack * a.talent * growth * (1 + s.upgrades.training * .12)), armor: c.armor + o.armor, speed: c.speed };
}
export const capacity = s => 6 + s.upgrades.quarters * 2;
export const partySlots = s => s.upgrades.quarters > 0 ? 4 : 3;
export const upgradeCost = (s, key) => Math.round(UPGRADES[key].cost * UPGRADES[key].factor ** s.upgrades[key]);
export const hireCost = a => 25 + (a.level - 1) * 10;
export const recruitmentCost = (s, a) => s.roster.length === 0 && s.gold < hireCost(a) ? 0 : hireCost(a);
export const xpNeeded = a => 20 + (a.level - 1) * 12;
export function createGame(seed = Date.now() >>> 0, now = Date.now()) {
  const s = { version: VERSION, rng: seed >>> 0, nextId: 1, gold: 90, depth: 0, roster: [], applicants: [], party: [], upgrades: { training: 0, infirmary: 0, quarters: 0 }, policy: 'push', farmDepth: 1, auto: false, expedition: null, applicantTimer: 0, clock: 0, savedAt: now, log: [], records: { wins: 0, defeats: 0, gold: 0 }, lastReport: null };
  s.applicants = ['guardian', 'ranger', 'cleric'].map(c => generate(s, c));
  note(s, 'Your charter is signed. Recruit three adventurers and open the Delve.');
  return s;
}
function note(s, message) { s.log.unshift({ time: s.clock, message }); s.log.length = Math.min(s.log.length, 40); }
function battleNote(e, message) { e.events.unshift({ time: e.elapsed, message }); e.events.length = Math.min(e.events.length,12); }
export function recruit(s, id) {
  const a = s.applicants.find(a => a.id === id);
  if (!a || s.gold < recruitmentCost(s,a) || s.roster.length >= capacity(s)) return false;
  s.gold -= recruitmentCost(s,a); s.roster.push(a); s.applicants = s.applicants.filter(x => x.id !== id);
  note(s, `${a.name} joined the Guild.`); return true;
}
export function assign(s, id) {
  if (s.expedition || !s.roster.some(a => a.id === id)) return false;
  if (s.party.includes(id)) s.party = s.party.filter(x => x !== id);
  else if (s.party.length < partySlots(s)) s.party.push(id); else return false;
  return true;
}
export function dismiss(s, id) {
  if (s.expedition || !s.roster.some(a => a.id === id)) return false;
  s.party = s.party.filter(x => x !== id); s.roster = s.roster.filter(a => a.id !== id); return true;
}
export function reorder(s, id, direction) {
  if (s.expedition || ![-1,1].includes(direction)) return false;
  const index = s.party.indexOf(id), next = index + direction;
  if (index < 0 || next < 0 || next >= s.party.length) return false;
  [s.party[index],s.party[next]] = [s.party[next],s.party[index]];
  return true;
}
export function buyUpgrade(s, key) {
  if (!Object.hasOwn(UPGRADES,key) || s.depth < (UPGRADES[key].unlockDepth || 0) || s.upgrades[key] >= UPGRADES[key].max || s.gold < upgradeCost(s, key)) return false;
  s.gold -= upgradeCost(s, key); s.upgrades[key]++; note(s, `${UPGRADES[key].name} improved to rank ${s.upgrades[key]}.`); return true;
}
export function refreshApplicants(s) {
  if (s.gold < 10) return false;
  s.gold -= 10; s.applicants = Array.from({ length: 3 }, () => generate(s)); s.applicantTimer = 0; return true;
}
export function stratum(depth) { return STRATA[Math.floor((depth - 1) / 10) % STRATA.length]; }
export function makeEnemy(depth) {
  const boss = depth % 5 === 0, region = Math.floor((depth - 1) / 10) % 3;
  const scale = (1 + depth * .18) * (1 + Math.floor(depth / 30) * .25);
  const hp = Math.round(70 * scale * (boss ? 2.3 : 1));
  return { name: boss ? GATEKEEPERS[region].name : stratum(depth).enemies[(depth - 1) % 3], hp, maxHp: hp, attack: Math.round((5 + depth * 1.5) * (boss ? 1.35 : 1)), armor: boss ? 3 : 0, cooldown: 2, status: [], shield: boss ? Math.round(hp * .15) : 0, boss, region };
}
export function startExpedition(s) {
  if (s.expedition || !s.party.length) return false;
  const depth = s.policy === 'farm' ? Math.min(s.farmDepth, Math.max(1, s.depth)) : s.depth + 1;
  const seed = (random(s) * 4294967296) >>> 0;
  s.expedition = { depth, elapsed: 0, seed, rng: seed, events: [], enemy: makeEnemy(depth), units: s.party.map(id => { const a = s.roster.find(a => a.id === id), t = stats(s, a); return { id, ...t, maxHp: t.hp, shield: 0, cooldown: 1, abilityCooldown: CLASSES[a.classId].ability.cooldown, status: [], damage: 0, healing: 0, blocked: 0, cleansed: 0, cleanse: s.upgrades.infirmary > 0 }; }) };
  return true;
}
export function retreat(s) { if (!s.expedition) return false; s.expedition = null; s.auto = false; note(s, 'Expedition recalled safely. No rewards from the unfinished room.'); return true; }
function hit(target, amount, pierce = false) {
  let n = Math.max(1, Math.round(amount) - (pierce ? 0 : target.armor));
  const absorbed = Math.min(target.shield, n); target.shield -= absorbed; n -= absorbed;
  if ('blocked' in target) target.blocked += absorbed;
  const damage = Math.min(target.hp, n); target.hp -= damage; return damage;
}
function statuses(u, sources = []) {
  let total=0;
  for (const x of u.status) { if (u.hp > 0) { const damage = hit(u, x.power, true), source = sources.find(a => a.id === x.source); total+=damage; if (source) source.damage += damage; } x.remaining--; }
  u.status = u.status.filter(x => x.remaining > 0);
  return total;
}
function endRoom(s, win) {
  const e = s.expedition, reward = win ? Math.round((12 + e.depth * 3) * (e.enemy.boss ? 1.8 : 1)) : 0;
  s.gold = Math.min(1e12, s.gold + reward); s.records.gold = Math.min(1e12, s.records.gold + reward);
  if (win) {
    const oldDepth = s.depth;
    s.depth = Math.max(s.depth, e.depth); s.records.wins++;
    if (oldDepth < 5 && s.depth >= 5) note(s,'The first Gatekeeper falls. Expanded quarters can now unlock a fourth party slot.');
    if (Math.floor(oldDepth / 10) < Math.floor(s.depth / 10)) note(s,`Word of your Guild spreads. New applicants now arrive at level ${Math.min(1000,1+Math.floor(s.depth/10))}. Existing applicants stay available.`);
    for (const u of e.units) {
      const a = s.roster.find(a => a.id === u.id); a.xp += 8 + e.depth * 2;
      while (a.xp >= xpNeeded(a) && a.level < 1000) { a.xp -= xpNeeded(a); a.level++; }
    }
  } else { s.records.defeats++; s.auto = false; }
  const reason = win ? 'Victory' : e.elapsed >= 180 ? 'Stalemate: recalled after 180 seconds' : 'Defeat: the party was overwhelmed';
  battleNote(e,win?`${e.enemy.name} defeated.`:reason);
  s.lastReport = { depth: e.depth, seed: e.seed, events: e.events, win, reward, seconds: e.elapsed, reason, units: e.units.map(u => ({ id: u.id, damage: u.damage, healing: u.healing, blocked: u.blocked, cleansed: u.cleansed, survived: u.hp > 0 })) };
  note(s, `${reason} at depth ${e.depth}. ${win ? `+${reward} gold. Party recovered.` : 'Everyone returned safely. Try training, a healer, or a shallower farm.'}`);
  s.expedition = null;
}
export function tick(s) {
  s.clock++; s.applicantTimer++;
  if (s.applicantTimer >= 120) { s.applicantTimer = 0; while (s.applicants.length < 3) s.applicants.push(generate(s)); }
  if (!s.expedition) { if (s.auto) startExpedition(s); return; }
  const e = s.expedition; e.elapsed++; const bleed= statuses(e.enemy, e.units);
  if(bleed>0) battleNote(e,`Bleed deals ${bleed} damage to ${e.enemy.name}.`);
  for (const u of e.units) {
    const harm=statuses(u); if(harm>0) battleNote(e,`${s.roster.find(a=>a.id===u.id).name} suffers ${harm} damage from harmful statuses${u.hp<=0?' — downed':''}.`); if (u.hp <= 0 || e.enemy.hp <= 0) continue;
    const a = s.roster.find(a => a.id === u.id), c = CLASSES[a.classId];
    if (--u.abilityCooldown <= 0) {
      const ability = c.ability; u.abilityCooldown = ability.cooldown;
      if (ability.effect === 'shield') { const before=u.shield; u.shield = Math.min(Math.round(u.maxHp * .6), u.shield + Math.round(u.attack * ability.scale)); battleNote(e,`${a.name}: Bulwark grants ${u.shield-before} shield.`); }
      if (ability.effect === 'heal') {
        const target = e.units.filter(x => x.hp > 0).sort((a,b) => a.hp / a.maxHp - b.hp / b.maxHp)[0];
        if (target) { const healing = Math.min(target.maxHp - target.hp, Math.round(u.attack * ability.scale)); target.hp += healing; u.healing += healing; let cleansed=''; if (u.cleanse && target.status.length) { cleansed=target.status.shift().type; u.cleansed++; } if(healing>0||cleansed) battleNote(e,`${a.name} heals ${s.roster.find(a=>a.id===target.id).name} for ${healing}${cleansed?` and cleanses ${cleansed}`:''}.`); }
      }
      if (ability.effect === 'bleed') { u.damage += hit(e.enemy, u.attack); e.enemy.status.push({ type: 'bleed', source: u.id, power: Math.round(u.attack * ability.scale), remaining: 4 }); battleNote(e,`${a.name}: Barbed arrow inflicts a four-second bleed.`); }
    }
    if (--u.cooldown <= 0 && e.enemy.hp > 0) { u.cooldown = u.speed; const critical=random(e)<.1, damage=hit(e.enemy,u.attack*(critical?1.5:1)); u.damage+=damage; battleNote(e,`${a.name} ${critical?'critically hits':'hits'} for ${damage} damage.`); }
  }
  if (e.enemy.hp <= 0) { endRoom(s, true); return; }
  const alive = e.units.filter(u => u.hp > 0);
  if (!alive.length) { endRoom(s, false); return; }
  if (--e.enemy.cooldown <= 0) {
    e.enemy.cooldown = 2;
    const target = alive.find(u => s.roster.find(a => a.id === u.id).classId === 'guardian') || alive[0];
    const beforeShield=target.shield, damage = hit(target, e.enemy.attack), absorbed=beforeShield-target.shield;
    battleNote(e,`${e.enemy.name} hits ${s.roster.find(a=>a.id===target.id).name} for ${damage} damage${absorbed?`, ${absorbed} absorbed by shield`:''}${target.hp<=0?' — downed':''}.`);
    if (e.enemy.region === 1) target.status.push({ type: 'burn', power: 2, remaining: 3 });
    if (e.enemy.region === 2) e.enemy.hp = Math.min(e.enemy.maxHp, e.enemy.hp + Math.round(damage * .3));
    if (e.enemy.boss && e.elapsed % 6 === 0) {
      const ability = GATEKEEPERS[e.enemy.region];
      if (ability.effect === 'shield') e.enemy.shield = Math.min(Math.round(e.enemy.maxHp * .3), e.enemy.shield + Math.round(e.enemy.maxHp * ability.scale));
      if (ability.effect === 'cleave') for (const u of e.units.filter(u => u.hp > 0)) hit(u, e.enemy.attack * ability.scale);
      if (ability.effect === 'bleed') target.status.push({ type: 'bleed', power: Math.round(e.enemy.attack * ability.scale), remaining: 4 });
      battleNote(e,`${e.enemy.name}: ${ability.effect==='shield'?'regrows a shield':ability.effect==='cleave'?'lashes the entire party':'inflicts a four-second wound'}.`);
    }
  }
  if (e.units.every(u => u.hp <= 0) || e.elapsed >= 180) endRoom(s, false);
}
export function advance(s, seconds) { const n = Math.min(MAX_OFFLINE, Math.max(0, Math.floor(seconds))); for (let i = 0; i < n; i++) tick(s); return n; }
export function serialize(s, now = Date.now()) { return JSON.stringify({ ...s, savedAt: now }); }
export function restore(raw, now = Date.now()) {
  const s = JSON.parse(raw);
  validateSave(s);
  const before = { gold: s.gold, wins: s.records.wins, defeats: s.records.defeats, depth: s.depth, levels: s.roster.reduce((n,a) => n+a.level, 0) };
  const seconds = advance(s, (now - s.savedAt) / 1000); s.savedAt = now;
  return { state: s, away: { seconds, gold: s.gold - before.gold, wins: s.records.wins - before.wins, defeats: s.records.defeats - before.defeats, depth: s.depth - before.depth, levels: s.roster.reduce((n,a) => n+a.level, 0) - before.levels } };
}
function validateSave(s) {
  const fail = () => { throw new Error('Save data is invalid or from an unsupported version.'); };
  const num = (n, max = 1e12) => Number.isFinite(n) && n >= 0 && n <= max;
  const int = (n, max = 1e12) => num(n,max) && Number.isInteger(n);
  const events = list => Array.isArray(list) && list.length <= 12 && list.every(l => l && int(l.time,180) && typeof l.message === 'string' && l.message.length <= 300);
  if (!s || s.version !== VERSION || !int(s.rng,4294967295) || !int(s.nextId) || !num(s.gold) || !int(s.depth,1000000) || !num(s.savedAt,1e15) || !int(s.clock) || !int(s.applicantTimer,119) || typeof s.auto !== 'boolean' || !['push','farm'].includes(s.policy) || !int(s.farmDepth,1000000) || s.farmDepth < 1) fail();
  if (!s.upgrades || Object.keys(UPGRADES).some(k => !int(s.upgrades[k], UPGRADES[k].max))) fail();
  if (!Array.isArray(s.roster) || s.roster.length > capacity(s) || !Array.isArray(s.applicants) || s.applicants.length > 3) fail();
  const ids = new Set();
  for (const a of [...s.roster, ...s.applicants]) {
    if (!a || !int(a.id) || a.id < 1 || ids.has(a.id) || a.id >= s.nextId || typeof a.name !== 'string' || a.name.length > 40 || !Object.hasOwn(CLASSES,a.classId) || !Object.hasOwn(ORIGINS,a.origin) || !ORIGINS[a.origin].classes.includes(a.classId) || !num(a.talent,1.05) || a.talent < .95 || !int(a.level,1000) || a.level < 1 || !int(a.xp)) fail(); ids.add(a.id);
  }
  if (!Array.isArray(s.party) || s.party.length > partySlots(s) || new Set(s.party).size !== s.party.length || s.party.some(id => !s.roster.some(a => a.id === id))) fail();
  if (!s.records || ['wins','defeats','gold'].some(k => !num(s.records[k])) || !Array.isArray(s.log) || s.log.length > 40 || s.log.some(l => !l || !num(l.time) || typeof l.message !== 'string' || l.message.length > 500)) fail();
  if (s.lastReport !== null) {
    const r = s.lastReport;
    if (!r || !int(r.depth,1000000) || !num(r.reward) || !int(r.seconds,180) || typeof r.win !== 'boolean' || typeof r.reason !== 'string' || r.reason.length > 100 || !Array.isArray(r.units) || r.units.length > 4 || r.units.some(u => !u || !int(u.id) || !num(u.damage) || !num(u.healing) || typeof u.survived !== 'boolean')) fail();
    for (const u of r.units) { u.blocked ??= 0; u.cleansed ??= 0; if (!num(u.blocked) || !int(u.cleansed)) fail(); }
    r.events ??= []; r.seed ??= null; if (!events(r.events) || (r.seed !== null && !int(r.seed,4294967295))) fail();
  }
  if (s.expedition !== null) {
    const e = s.expedition;
    if (!e || !int(e.depth,1000000) || e.depth < 1 || !int(e.elapsed,180) || !int(e.seed,4294967295) || !Array.isArray(e.units) || e.units.length !== s.party.length || !e.units.length || new Set(e.units.map(u => u.id)).size !== e.units.length) fail();
    e.events ??= []; e.rng ??= s.rng; if (!events(e.events) || !int(e.rng,4294967295)) fail();
    for (const u of [...e.units, e.enemy]) {
      if (!u || ['hp','maxHp','attack','armor','shield','cooldown'].some(k => !num(u[k])) || u.maxHp <= 0 || u.hp > u.maxHp || !Array.isArray(u.status) || u.status.length > 100 || u.status.some(x => !x || !['burn','bleed'].includes(x.type) || !num(x.power) || !int(x.remaining,4))) fail();
    }
    for (const u of e.units) { u.blocked ??= 0; u.cleansed ??= 0; u.cleanse ??= s.upgrades.infirmary > 0; if (!s.party.includes(u.id) || !int(u.speed,10) || u.speed < 1 || !num(u.abilityCooldown,10) || !num(u.damage) || !num(u.healing) || !num(u.blocked) || !int(u.cleansed) || typeof u.cleanse !== 'boolean') fail(); }
    if (typeof e.enemy.name !== 'string' || e.enemy.name.length > 80 || typeof e.enemy.boss !== 'boolean' || !int(e.enemy.region,2)) fail();
  }
}
