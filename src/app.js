import * as E from './engine.js';
import { CLASSES, ORIGINS, UPGRADES, GATEKEEPERS } from './content.js';
import { compareRecruit, partyAdvice } from './presentation.js';
const $ = id => document.getElementById(id);
const key = 'idle-fodder-v1';
const esc = x => String(x).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state, away, storageAvailable = true, stored, paused = false;
try { stored = localStorage.getItem(key); } catch { storageAvailable = false; }
try { if (stored) ({ state, away } = E.restore(stored)); else state = E.createGame(); }
catch { state = E.createGame(); storageAvailable = false; $('notice').textContent = 'The existing save could not be read. It has been preserved. Export this new session before closing, or import a valid backup.'; }
if (!storageAvailable && !stored) $('notice').textContent = 'Browser storage is unavailable. Export your save before closing.';
if (away?.seconds >= 30) $('away').innerHTML = `<strong>Welcome back, Guildmaster.</strong> ${Math.floor(away.seconds / 60)} minutes resolved · +${away.gold} gold · ${away.wins} victories · ${away.levels} levels · ${away.depth} new depths.${away.defeats ? ' Your party was defeated and automation stopped. Everyone returned safely.' : ''} <button id="dismiss-away">Continue</button>`;
$('away').onclick = () => { $('away').textContent = ''; };
function save() { if (!storageAvailable || paused) return; try { localStorage.setItem(key, E.serialize(state)); } catch { storageAvailable = false; $('save-status').textContent = 'Autosave failed. Export your save to preserve progress.'; } }
window.addEventListener('storage', event => {
  if (event.key !== key || !event.newValue || paused) return;
  paused = true;
  message('This Guild was updated in another tab. This tab is paused to protect your progress. Reload to continue from the latest save.');
  $('save-status').textContent = 'Paused · another tab is managing this Guild';
  for (const control of document.querySelectorAll('button, input, select')) if (control.id !== 'export') control.disabled = true;
});
function message(text) { $('notice').textContent = text; }
function bar(value, max, cls = '') { return `<div class="bar ${cls}"><i style="width:${Math.max(0,Math.min(100,value/max*100))}%"></i></div>`; }
function comparison(a) {
  const c = compareRecruit(state,a), delta = n => n > 0 ? `+${n}` : String(n);
  if (!c.peer) return `<p class="comparison">Adds a new role to your roster: ${c.role}.</p>`;
  return `<p class="comparison">Compared at level ${c.level} with ${esc(c.peer.name)}:<br>${delta(c.delta.hp)} HP · ${delta(c.delta.attack)} attack · ${delta(c.delta.armor)} armor.<br>Current stats above reflect this recruit's actual level.</p>`;
}
function character(a, applicant = false) {
  const c = CLASSES[a.classId], o = ORIGINS[a.origin], t = E.stats(state,a), selected = state.party.includes(a.id);
  const disabled = applicant ? state.gold < E.recruitmentCost(state,a) || state.roster.length >= E.capacity(state) : !!state.expedition || (!selected && state.party.length >= E.partySlots(state));
  return `<article class="card ${selected?'selected':''}" style="--character:${c.color}"><div class="card-heading"><div class="portrait" aria-hidden="true">${c.icon}</div><div><h3>${esc(a.name)}</h3><div class="subtitle">${o.species} ${c.name} · Level ${a.level} · ${c.role}</div></div></div><div class="stats"><div>${t.hp}<span>HP</span></div><div>${t.attack}<span>ATK</span></div><div>${t.armor}<span>ARMOR</span></div><div>${t.speed}s<span>ATTACK</span></div></div><div class="trait">${o.trait} · ${o.name}</div><p class="origin-detail">${o.detail} Talent ${Math.round(a.talent*100)}%.</p><p><strong>${c.ability.name}</strong> — ${c.description}</p>${applicant?comparison(a):""}${!applicant?`${bar(a.xp,E.xpNeeded(a),'xp-bar')}<small>${a.xp} / ${E.xpNeeded(a)} XP</small>`:''}<button data-action="${applicant?'hire':'assign'}" data-id="${a.id}" ${disabled?'disabled':''} class="${applicant?'primary':''}">${applicant?E.recruitmentCost(state,a) === 0 ? 'Recruit relief volunteer · Free' : `Recruit · ${E.recruitmentCost(state,a)} gold`:selected?'✓ In party · Remove':'Assign to party'}</button>${!applicant?`<button class="dismiss" data-action="dismiss" data-id="${a.id}" ${state.expedition?'disabled':''}>Dismiss adventurer…</button>`:''}</article>`;
}
function html(id, content) { if ($(id).innerHTML !== content) $(id).innerHTML = content; }
function render() {
  const s = state, e = s.expedition, targetDepth = e?.depth || (s.policy==='farm'?Math.min(s.farmDepth,Math.max(1,s.depth)):s.depth+1), region = E.stratum(targetDepth);
  $('gold').textContent = Math.floor(s.gold).toLocaleString();
  html('overview', `<div class="metric"><strong>${s.depth}</strong><span>DEEPEST DELVE<br>${s.depth?'Frontier established':'The unknown awaits'}</span></div><div class="metric"><strong>${s.roster.length}/${E.capacity(s)}</strong><span>ADVENTURERS<br>${s.party.length} assigned to party</span></div><div class="metric"><strong>${s.records.wins}</strong><span>ROOMS CLEARED<br>${s.records.gold.toLocaleString()} gold recovered</span></div>`);
  $('activity').textContent = e ? `In combat · ${e.elapsed}s` : s.auto ? 'Orders active' : 'Awaiting orders';
  $('depth-mark').textContent = `DEPTH ${String(targetDepth).padStart(3,'0')}`;
  $('enemy-symbol').textContent = e?.enemy.boss ? '♛' : '♜';
  html('enemy', e ? `<strong>${esc(e.enemy.name)}</strong>${bar(e.enemy.hp,e.enemy.maxHp,'enemy-bar')}<small>${e.enemy.hp}/${e.enemy.maxHp} HP${e.enemy.shield?` · ${e.enemy.shield} shield`:''}${e.enemy.status.length?' · bleeding':''}</small>` : '<span>A passage into the unknown.</span>');
  const threat = targetDepth % 5 === 0 ? `<strong>Gatekeeper ahead:</strong> ${GATEKEEPERS[Math.floor((targetDepth-1)/10)%3].description}` : '';
  html('region', `<h3>${region.name}</h3><p>${region.subtitle}<br>${region.hazard} ${threat}</p>`);
  $('policy').value = s.policy; $('farm-depth').max = Math.max(1,s.depth); $('farm-depth').disabled = s.policy !== 'farm'; $('auto').checked = s.auto;
  $('start').disabled = !!e || !s.party.length; $('retreat').disabled = !e;
  html('battle-party', e ? e.units.map(u => { const a = s.roster.find(a=>a.id===u.id); return `<div class="battle-unit"><strong>${esc(a.name)}</strong> · ${CLASSES[a.classId].name}${bar(u.hp,u.maxHp)}<small>${u.hp}/${u.maxHp} HP · ${u.shield} shield · ${u.damage} damage · ${u.healing} healing${u.status.length?` · ${u.status.map(x=>x.type).join(", ")}`:""}${u.hp<=0?' · downed':''}</small></div>`; }).join('') : `<p>${esc(partyAdvice(s))}</p><div class="lineup">${s.party.map((id,i)=>{ const a=s.roster.find(a=>a.id===id); return `<div><span>${i+1}. ${esc(a.name)} · ${CLASSES[a.classId].name}</span><button data-action="earlier" data-id="${id}" aria-label="Move ${esc(a.name)} earlier" ${i===0?'disabled':''}>↑</button><button data-action="later" data-id="${id}" aria-label="Move ${esc(a.name)} later" ${i===s.party.length-1?'disabled':''}>↓</button></div>`; }).join('')}</div>`);
  $('party-count').textContent = `${s.party.length}/${E.partySlots(s)} party slots`;
  html('roster-cards', s.roster.map(a=>character(a)).join('') || '<div class="empty">Your guildhall is quiet. Three applicants await at the door.<br>Start with a guardian, a ranger, and a cleric.</div>');
  html('applicant-cards', s.applicants.map(a=>character(a,true)).join('') || '<div class="empty">All applicants recruited. Empty spaces refill automatically.</div>');
  $('applicant-timer').textContent = `Unfilled applicant spaces refill in ${120-s.applicantTimer}s. Current applicants stay until you seek a new batch. New applicants arrive at level ${Math.min(1000,1+Math.floor(s.depth/10))}. Each 10 frontier depths improves future recruitment. Hire cost: 25 gold + 10 per level above 1. A guild with no adventurers and insufficient funds can hire one relief volunteer for free.`;
  $('refresh').disabled = s.gold < 10;
  html('upgrades', Object.entries(UPGRADES).map(([k,u])=>`<article class="card upgrade"><div class="rank">RANK ${s.upgrades[k]} / ${u.max}</div><h3>${u.name}</h3><p>${u.description}</p><button data-action="upgrade" data-key="${k}" ${s.gold<E.upgradeCost(s,k)||s.upgrades[k]>=u.max||s.depth<(u.unlockDepth||0)?'disabled':''}>${s.depth<(u.unlockDepth||0)?`Unlocks at depth ${u.unlockDepth}`:s.upgrades[k]>=u.max?'Fully developed':`Improve · ${E.upgradeCost(s,k).toLocaleString()} gold`}</button></article>`).join(''));
  const r = s.lastReport;
  html('report', r ? `<strong>Last expedition · Depth ${r.depth}</strong> — ${esc(r.reason)} · ${r.seconds}s · +${r.reward} gold${r.win?"":"<p>Try farming a conquered room for XP and gold, then adjust the party or invest in the Guild. No adventurers were lost.</p>"}<div class="report-row">${r.units.map(u=>`<span>${esc(s.roster.find(a=>a.id===u.id)?.name||'Former adventurer')}: ${u.damage} damage / ${u.healing} healing / ${u.blocked ?? 0} shield absorbed / ${u.cleansed ?? 0} cleansed${u.survived?'':' / downed'}</span>`).join('')}</div>` : '');
  html('log', s.log.slice(0,7).map(l=>`<li><small>${Math.floor(l.time/60)}:${String(l.time%60).padStart(2,'0')}</small>${esc(l.message)}</li>`).join(''));
}
document.addEventListener('click', event => {
  if (paused) return;
  const b = event.target.closest('button[data-action]'); if (!b) return;
  const id = Number(b.dataset.id); let ok = false;
  if (b.dataset.action === 'hire') ok = E.recruit(state,id);
  if (b.dataset.action === 'assign') ok = E.assign(state,id);
  if (b.dataset.action === 'earlier') ok = E.reorder(state,id,-1);
  if (b.dataset.action === 'later') ok = E.reorder(state,id,1);
  if (b.dataset.action === 'upgrade') ok = E.buyUpgrade(state,b.dataset.key);
  if (b.dataset.action === 'dismiss' && confirm('Dismiss this adventurer permanently? Their levels and XP will be lost.')) ok = E.dismiss(state,id);
  if (ok) { message(''); save(); render(); }
});
$('start').onclick = () => { state.farmDepth = Math.max(1,Math.min(Math.max(1,state.depth), Math.floor(Number($('farm-depth').value)||1))); E.startExpedition(state); save(); render(); };
$('retreat').onclick = () => { E.retreat(state); save(); render(); };
$('refresh').onclick = () => { E.refreshApplicants(state); save(); render(); };
$('policy').onchange = event => { state.policy = event.target.value; save(); render(); };
$('farm-depth').oninput = event => { const n = Number(event.target.value); if (Number.isInteger(n) && n >= 1 && n <= Math.max(1,state.depth)) { state.farmDepth = n; save(); } };
$('farm-depth').onchange = event => { state.farmDepth = Math.max(1,Math.min(Math.max(1,state.depth), Math.floor(Number(event.target.value)||1))); $('farm-depth').value = state.farmDepth; save(); render(); };
$('auto').onchange = event => { state.auto = event.target.checked; save(); render(); };
$('export').onclick = () => { const blob = new Blob([E.serialize(state)],{type:'application/json'}); const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href=url; a.download='idle-fodder-save.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); };
$('import').onchange = async event => {
  const file = event.target.files[0]; if (!file) return;
  try {
    if (file.size>200000) throw new Error('Save file is too large.');
    const result = E.restore(await file.text());
    if (paused) throw new Error('This tab was paused because another tab updated the Guild. Reload before importing.');
    if (!confirm('Replace your current guild with this imported save? Export a backup first if you want to keep both.')) return;
    state = result.state; $('farm-depth').value = state.farmDepth; storageAvailable = true; save(); message('Save imported successfully.'); render();
  } catch (error) { message(`Import failed: ${error.message}`); }
  finally { event.target.value=''; }
};
let last = Date.now(), pending = 0;
setInterval(() => { if (paused) return; const now = Date.now(), elapsed = Math.max(0,Math.floor((now-last)/1000)); if (!elapsed) return; last += elapsed*1000; E.advance(state,elapsed); pending += elapsed; if(pending>=5){save();pending=0;} render(); },250);
window.addEventListener('pagehide',save);
$('farm-depth').value = state.farmDepth;
render();
