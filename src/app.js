import * as E from './engine.js';
import { CLASSES, ORIGINS, UPGRADES, STRATA, GATEKEEPERS, EQUIPMENT } from './content.js';
import { compareRecruit, partyAdvice, reportAdvice, combatDescription } from './presentation.js';
const $ = id => document.getElementById(id);
const key = 'idle-fodder-v1';
const esc = x => String(x).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state, away, storageAvailable = true, stored, paused = false, destinationDraft=false;
try { stored = localStorage.getItem(key); } catch { storageAvailable = false; }
try { if (stored) ({ state, away } = E.restore(stored)); else state = E.createGame(); }
catch { state = E.createGame(); storageAvailable = false; $('notice').textContent = 'The existing save could not be read. It has been preserved. Export this new session before closing, or import a valid backup.'; }
if (!storageAvailable && !stored) $('notice').textContent = 'Browser storage is unavailable. Export your save before closing.';
if (away?.seconds >= 30) $('away').innerHTML = `<strong>Welcome back, Guildmaster.</strong> ${Math.floor(away.seconds / 60)} minutes resolved · +${away.gold} gold · ${away.wins} victories · ${away.levels} levels · ${away.depth} new depths.${away.defeats ? ` Your party suffered defeats. Everyone returned safely. Automatic orders ${state.auto?'are continuing':'stopped'}.` : ''} <button id="dismiss-away">Continue</button>`;
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
  const different=a.technique!==c.peer.technique?`<br>Technique: ${esc(E.abilityFor(a).name)} versus ${esc(E.abilityFor(c.peer).name)}. Inspect combat numbers for strength and timing.`:'';
  return `<p class="comparison">Compared at level ${c.level} with ${esc(c.peer.name)}:<br>${delta(c.delta.hp)} HP · ${delta(c.delta.attack)} power · ${delta(c.delta.armor)} armor.<br>Compared before equipment; current stats above reflect this recruit's actual level.${different}</p>`;
}
function timeline(events) { return `<ol class="combat-timeline">${events.map(event=>`<li><small>${event.time}s</small> ${esc(event.message)}</li>`).join('')}</ol>`; }
function reportBody(r) {
  const enemy=r.enemy, gear=u=>u.equipment==='unknown'?'Equipment not recorded':u.equipment?EQUIPMENT[u.equipment].name:'No equipment';
  return `${r.purpose==='survey'?`<p><strong>Rootways survey</strong>: ${r.discovery?'Dawn seal blueprint discovered. Commission it in the Guild workshop.':r.win?'No blueprint found on this survey.':'Victory is required to discover a blueprint.'}</p>`:''}<p>${esc(reportAdvice(r))}</p>${enemy?`<p class="enemy-summary">${esc(enemy.name)} ended at ${enemy.hp}/${enemy.maxHp} HP · ${enemy.blocked} damage absorbed by shields · ${enemy.healing} health recovered${enemy.reflected?` · ${enemy.reflected} reflected health damage`:''}.</p>`:''}<div class="report-row">${r.units.map(u=>`<span><strong>${esc(u.name)}</strong>${u.level?` · Lv ${u.level}`:''} · ${gear(u)}<br><small>${esc(u.technique==='unknown'||!u.classId?'Technique not recorded':E.abilityFor(u).name)}</small><br>${u.damage} damage · ${u.healing} healing · ${u.blocked} shield absorbed · ${u.warded===null?'shield granted not recorded':`${u.warded} shield granted`} · ${u.taken===null?'damage taken not recorded':`${u.taken} damage taken`} · ${u.cleansed} cleansed${u.survived?'':' · downed'}</span>`).join('')}</div>`;
}
function equipmentControls(a) {
  if(state.depth<5) return '';
  const item=EQUIPMENT[a.equipment];
  return `<label class="equipment-control">Equipment<select data-equip="${a.id}" aria-label="Equipment for ${esc(a.name)}" ${state.expedition?'disabled':''}><option value="">No equipment</option>${state.equipmentUnlocked.map(key=>`<option value="${key}" ${a.equipment===key?'selected':''}>${EQUIPMENT[key].name}</option>`).join('')}</select></label><p class="origin-detail">${item?`${item.description} Ability cooldown: ${E.abilityFor(a).cooldown+item.cooldown}s.`:state.equipmentUnlocked.length?'Choose an unlocked item above. Changing equipment is free between fights.':'Commission equipment in the Guild workshop at depth 10. Equipping unlocked items is free.'}</p>`;
}
function character(a, applicant = false) {
  const c = CLASSES[a.classId], ability=E.abilityFor(a), o = ORIGINS[a.origin], t = E.stats(state,a), selected = state.party.includes(a.id);
  const disabled = applicant ? state.gold < E.recruitmentCost(state,a) || state.roster.length >= E.capacity(state) : !!state.expedition || (!selected && state.party.length >= E.partySlots(state));
  return `<article class="card ${selected?'selected':''}" style="--character:${c.color}"><div class="card-heading"><div class="portrait" aria-hidden="true">${c.icon}</div><div><h3>${esc(a.name)}</h3><div class="subtitle">${o.species} ${c.name} · Level ${a.level} · ${c.role}</div></div></div><div class="stats"><div>${t.hp}<span>HP</span></div><div>${t.attack}<span>POWER</span></div><div>${t.armor}<span>ARMOR</span></div><div>${t.speed}s<span>ATTACK</span></div></div><div class="trait">${o.trait} · ${o.name}</div><p class="origin-detail">${o.detail} Talent ${Math.round(a.talent*100)}%.</p><p><strong>${ability.name}</strong> — ${ability.description||c.description}</p><details class="combat-numbers" data-persist="combat-${a.id}"><summary>Combat numbers</summary><p>${esc(combatDescription(state,a))}</p><p>Power above is the base for attacks and abilities. These numbers include current Guild upgrades and equipment; purchases during combat apply to the next room.</p></details>${applicant?comparison(a)+preparation(a):equipmentControls(a)}${!applicant?`${bar(a.xp,E.xpNeeded(a),'xp-bar')}<small>${a.xp} / ${E.xpNeeded(a)} XP</small>${mentorshipControls(a)}${careerControls(a)}`:''}<button data-action="${applicant?'hire':'assign'}" data-id="${a.id}" ${disabled?'disabled':''} class="${applicant?'primary':''}">${applicant?E.recruitmentCost(state,a) === 0 ? 'Recruit relief volunteer · Free' : `Recruit · ${E.recruitmentCost(state,a)} gold`:selected?'✓ In party · Remove':'Assign to party'}</button>${!applicant?`<button class="dismiss" data-action="dismiss" data-id="${a.id}" ${state.expedition?'disabled':''}>Dismiss adventurer…</button>`:''}</article>`;
}
const rendered = new Map();
function html(id, content) {
  if (rendered.get(id) === content) return;
  const open=new Set([...$(id).querySelectorAll('details[data-persist][open]')].map(detail=>detail.dataset.persist));
  $(id).innerHTML = content;
  for(const detail of $(id).querySelectorAll('details[data-persist]')) if(open.has(detail.dataset.persist)) detail.open=true;
  rendered.set(id,content);
}
function preparation(a){
  const q=E.recruitmentPreparation(state,a.id);if(!q)return '';
  const gold=n=>n.toLocaleString();
  return `<p class="comparison"><strong>Training after hiring</strong><br>${esc(q.mentor)} can mentor this applicant to Lv ${q.target}.<br>${gold(q.hire)} hire${q.hall?` + ${gold(q.hall)} Mentorship hall`:''} + ${gold(q.training)} training = ${gold(q.total)} Gold.<br>${!q.space?'Roster is full; freeing a space changes this quote.':!q.affordable?'More Gold is needed for this first training level.':'Quoted from current Gold after hire and hall costs.'} Training is a separate choice on roster cards between fights.</p>`;
}
function mentorshipControls(a) {
  if(!state.upgrades.mentorship) return '';
  const one=E.mentorshipQuote(state,a.id),catchup=E.mentorshipQuote(state,a.id,'catchup');
  if(!one) return '<p class="origin-detail">This adventurer can mentor lower-level Guild members.</p>';
  const button=(q,mode,label)=>`<button data-action="mentor" data-mode="${mode}" data-id="${a.id}" ${state.expedition||q.cost>state.gold?'disabled':''}>${label} · ${q.cost.toLocaleString()} gold</button>`;
  return `<div class="mentorship"><p class="origin-detail">${esc(one.mentor)} can mentor to level ${one.limit}. Training costs 1 Gold per 4 remaining XP, at least 10 Gold per level.</p>${button(one,'one','Mentor +1 level')}${catchup.levels>1?button(catchup,'catchup',`Catch up to Lv ${catchup.target}`):''}</div>`;
}
function careerControls(a) {
  const c=a.career,format=n=>n.toLocaleString();
  return `<details class="combat-numbers" data-persist="career-${a.id}"><summary>Guild record · ${format(c.wins)} ${c.wins===1?'victory':'victories'}</summary><p>${c.complete?'Since joining the Guild':`Earlier history was not recorded; tracking began at Guild minute ${Math.floor(c.since/60)}`}. ${format(c.rooms)} completed rooms · ${format(c.rooms-c.wins)} unsuccessful · downed ${format(c.downed)} times.</p><p>Deepest victory: ${c.bestDepth?`depth ${format(c.bestDepth)}`:'none yet'} · ${format(c.bosses)} Gatekeepers defeated.</p><p>Completed-room totals: ${format(c.damage)} health damage · ${format(c.healing)} healing · ${format(c.blocked)} shield absorbed · ${format(c.cleansed)} statuses cleansed.</p></details>`;
}
function partyPlans(){
  return state.partyPlans.map((plan,slot)=>{
    if(!plan)return `<article class="card"><h3>Slot ${slot+1}</h3><p>No party saved yet.</p></article>`;
    const status=E.partyPlanStatus(state,slot);
    return `<article class="card"><small>SLOT ${slot+1}</small><h3>${esc(plan.name)}</h3><ol>${plan.members.map(m=>{const a=state.roster.find(a=>a.id===m.id);return `<li>${esc(a?.name||m.name)} · ${CLASSES[m.classId].name}${a?` · Lv ${a.level}`:' · unavailable'}<br><small>${m.equipment?EQUIPMENT[m.equipment].name:'No equipment'}</small></li>`;}).join('')}</ol>${status.reason?`<p>${esc(status.reason)}</p>`:''}<button data-action="apply-plan" data-slot="${slot}" ${state.expedition||!status.usable?'disabled':''}>Use ${esc(plan.name)}</button></article>`;
  }).join('');
}
function render() {
  const s = state, e = s.expedition, destinationDone=!e&&s.policy==='push'&&E.pushDestinationReached(s), targetDepth = e?.depth || (s.policy==='survey'?E.surveyDepth(s):s.policy==='farm'?Math.min(s.farmDepth,Math.max(1,s.depth)):destinationDone?s.pushLimit:s.depth+1), region = e ? STRATA[e.enemy.region] : E.stratum(targetDepth);
  $('gold').textContent = Math.floor(s.gold).toLocaleString();
  $('recovery-controls').hidden=s.depth<5;
  $('recover').checked=s.recovery.enabled;
  $('recovery-rooms').value=s.recovery.rooms;
  $('recovery-rooms').disabled=!s.recovery.enabled||s.recovery.remaining>0;
  $('recovery-percent').value=s.recovery.percent;
  $('recovery-percent').disabled=!s.recovery.enabled||s.recovery.remaining>0;
  $('recovery-help').textContent=`When automatically pushing, a defeat sends the party to farm at ${s.recovery.percent}% of your deepest depth, avoiding Gatekeepers (currently depth ${E.recoveryTarget(s)}), then retry. A failed recovery farm stops automatic orders.`;
  $('auto-help').textContent=s.policy==='survey'?'Stops on blueprint discovery or defeat.':s.recovery.enabled?'Uses recovery orders after a frontier defeat.':'Stops on defeat.';
  $('push-limit').disabled=s.recovery.remaining>0;
  if(s.recovery.remaining>0)destinationDraft=false; if(!destinationDraft)$('push-limit').value=s.pushLimit; $('set-destination').disabled=s.recovery.remaining>0;
  $('destination-help').textContent=E.pushDestinationReached(s)?`Destination depth ${s.pushLimit} is conquered. Raise it or choose 0 to push farther. Farming remains available.${e?' The current room finishes.':''}`:s.pushLimit?`Push to depth ${s.pushLimit}, then stop. Recovery orders still work before arrival. The current room finishes; farming remains available.`:'0 keeps pushing. A destination stops further pushes once conquered; the current room finishes. Farming remains available.';
  $('auto').disabled=(s.policy==='push'&&E.pushDestinationReached(s))||(s.policy==='survey'&&E.surveyComplete(s));
  $('survey-option').hidden=!s.upgrades.cartography; $('survey-option').disabled=!s.upgrades.cartography;
  $('survey-help').hidden=s.policy!=='survey'; $('survey-help').textContent=E.surveyComplete(s)?'Dawn seal blueprint discovered. Commission it in the Guild workshop, then choose new expedition orders.':`Survey depth ${E.surveyDepth(s)} in the Rootways. A victory has a ${Math.round(E.surveyChance(s.party.map(id=>s.roster.find(a=>a.id===id)))*100)}% discovery chance (20% + 10% per Ranger, up to 50%). Earn normal Gold and XP without pushing the frontier. Repeats stop on discovery or defeat.`;
  html('recovery-status',s.recovery.remaining?`Recovering at depth ${s.recovery.depth} · ${s.recovery.remaining} victories until frontier retry.`:'');
  html('overview', `<div class="metric"><strong>${s.depth}</strong><span>DEEPEST DELVE<br>${s.depth?'Frontier established':'The unknown awaits'}</span></div><div class="metric"><strong>${s.roster.length}/${E.capacity(s)}</strong><span>ADVENTURERS<br>${s.party.length} assigned to party</span></div><div class="metric"><strong>${s.records.wins}</strong><span>ROOMS CLEARED<br>${s.records.gold.toLocaleString()} gold recovered</span></div>`);
  $('activity').textContent = e ? `In combat · ${e.elapsed}s` : s.auto ? 'Orders active' : 'Awaiting orders';
  $('depth-mark').textContent = `DEPTH ${String(targetDepth).padStart(3,'0')}`;
  $('enemy-symbol').textContent = e?.enemy.boss ? '♛' : '♜';
  html('enemy', e ? `<strong>${esc(e.enemy.name)}</strong>${bar(e.enemy.hp,e.enemy.maxHp,'enemy-bar')}<small>${e.enemy.hp}/${e.enemy.maxHp} HP${e.enemy.shield?` · ${e.enemy.shield} shield`:''}${e.enemy.status.length?' · bleeding':''}</small>` : destinationDone ? '<span>Destination conquered. The Guild awaits new orders.</span>' : s.policy==='survey'?(E.surveyComplete(s)?'<span>Blueprint found. The Guild awaits new orders.</span>':'<span>A charted passage with something left to discover.</span>'): '<span>A passage into the unknown.</span>');
  const threat = !destinationDone && targetDepth % 5 === 0 ? `<strong>Gatekeeper ahead:</strong> ${GATEKEEPERS[e?.enemy.region ?? E.regionIndex(targetDepth)].description}` : '';
  html('region', `<h3>${region.name}</h3><p>${region.subtitle}<br>${region.hazard} ${threat}</p>`);
  $('policy').value = s.policy; $('farm-depth').max = Math.max(1,s.depth); $('farm-depth').disabled = s.policy !== 'farm'||s.recovery.remaining>0; $('auto').checked = s.auto;
  if(s.recovery.remaining>0)$('farm-depth').value=s.recovery.depth;
  $('start').disabled = !!e || !s.party.length || (s.policy==='push'&&E.pushDestinationReached(s)) || (s.policy==='survey'&&E.surveyComplete(s)); $('retreat').disabled = !e;
  html('battle-party', e ? e.units.map(u => { const a = s.roster.find(a=>a.id===u.id); return `<div class="battle-unit"><strong>${esc(a.name)}</strong> · ${CLASSES[a.classId].name}${bar(u.hp,u.maxHp)}<small>${u.hp}/${u.maxHp} HP · ${u.shield} shield · ${u.warded===null?'shield granted not recorded':`${u.warded} shield granted`} · ${u.damage} damage · ${u.healing} healing${u.status.length?` · ${u.status.map(x=>x.type).join(", ")}`:""}${u.hp<=0?' · downed':''}</small></div>`; }).join('') : `<p>${esc(partyAdvice(s))}</p><div class="lineup">${s.party.map((id,i)=>{ const a=s.roster.find(a=>a.id===id); return `<div><span>${i+1}. ${esc(a.name)} · ${CLASSES[a.classId].name}</span><button data-action="earlier" data-id="${id}" aria-label="Move ${esc(a.name)} earlier" ${i===0?'disabled':''}>↑</button><button data-action="later" data-id="${id}" aria-label="Move ${esc(a.name)} later" ${i===s.party.length-1?'disabled':''}>↓</button></div>`; }).join('')}</div>`);
  $('party-count').textContent = `${s.party.length}/${E.partySlots(s)} party slots`;
  $('party-plans').hidden=s.depth<5;
  $('save-plan').disabled=!!s.expedition||!s.party.length;
  html('plan-list',partyPlans());
  html('roster-cards', s.roster.map(a=>character(a)).join('') || '<div class="empty">Your guildhall is quiet. Three applicants await at the door.<br>Start with a guardian, a ranger, and a cleric.</div>');
  html('applicant-cards', s.applicants.map(a=>character(a,true)).join('') || '<div class="empty">All applicants recruited. Empty spaces refill automatically.</div>');
  $('applicant-timer').textContent = `Unfilled applicant spaces refill in ${120-s.applicantTimer}s. Current applicants stay until you seek a new batch. New applicants arrive at level ${Math.min(E.MAX_LEVEL,1+Math.floor(s.depth/10))}. Each 10 frontier depths improves future recruitment. At depth 10, future applicants may bring distinct shield, healing or bleed techniques. Existing adventurers keep their technique. ${s.depth>=60?'Future Clerics may now bring Aegis mending: weaker healing that turns unused healing into shield.':'Clear depth 60 to attract Clerics with Aegis mending.'} ${s.depth>=40?'Wardens are now available from Human and Dwarf origins; Sheltering ward shields the entire living party.':'Clear depth 40 to attract Wardens who shield the entire living party.'} Hire cost: 25 gold + 10 per level above 1. A guild with no adventurers and insufficient funds can hire one relief volunteer for free.`;
  $('refresh').disabled = s.gold < 10;
  html('upgrades', Object.entries(UPGRADES).map(([k,u])=>`<article class="card upgrade"><div class="rank">RANK ${s.upgrades[k]} / ${u.max}</div><h3>${u.name}</h3><p>${u.description}</p>${k==='cartography'?`<p class="origin-detail">After discovery, commission the Dawn seal for ${EQUIPMENT.dawn.cost.toLocaleString()} Gold. Desk + pattern: ${(u.cost+EQUIPMENT.dawn.cost).toLocaleString()} Gold. Survey victories earn normal rewards.</p>`:''}<button data-action="upgrade" data-key="${k}" ${s.gold<E.upgradeCost(s,k)||s.upgrades[k]>=u.max||s.depth<(u.unlockDepth||0)?'disabled':''}>${s.depth<(u.unlockDepth||0)?`Unlocks at depth ${u.unlockDepth}`:s.upgrades[k]>=u.max?'Fully developed':`Improve · ${E.upgradeCost(s,k).toLocaleString()} gold`}</button></article>`).join('') + (s.depth>=5?Object.entries(EQUIPMENT).map(([k,item])=>`<article class="card upgrade"><div class="rank">GUILD WORKSHOP</div><h3>${item.name}</h3><p>${item.description}</p><button data-action="commission" data-key="${k}" ${!E.equipmentAvailable(s,k)||s.gold<item.cost||s.equipmentUnlocked.includes(k)?'disabled':''}>${s.equipmentUnlocked.includes(k)?'Available on roster':s.depth<(item.unlockDepth||10)?`Unlocks at depth ${item.unlockDepth||10}`:!E.equipmentAvailable(s,k)?`Discover first - ${item.cost.toLocaleString()} Gold commission`:`Commission · ${item.cost} gold`}</button></article>`).join(''):''));
  const r = s.lastReport;
  html('combat-feed', e ? `<div class="battle-caption">LIVE COMBAT · SEED ${e.seed}</div>${e.events.length?timeline(e.events.slice(0,5)):'<p class="section-intro">The party enters the chamber.</p>'}` : '');
  html('report', r ? `<strong>Last expedition · Depth ${r.depth}</strong> — ${esc(r.reason)} · ${r.seconds}s · +${r.reward} Gold${reportBody(r)}<details><summary>Final combat moments${r.seed===null?'':` · seed ${r.seed}`}</summary>${timeline(r.events)}</details>` : '');
  $('archive').hidden = s.reports.length<2;
  html('archive-list',s.reports.map(r=>`<details><summary>Depth ${r.depth} · ${r.win?'Victory':'Defeat'} · ${r.seconds}s · +${r.reward} Gold${r.at!==null?` · Guild minute ${Math.floor(r.at/60)}`:''}</summary>${reportBody(r)}</details>`).join(''));
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
  if (b.dataset.action === 'commission') ok = E.unlockEquipment(state,b.dataset.key);
  if (b.dataset.action === 'mentor') ok = E.mentor(state,id,b.dataset.mode);
  if (b.dataset.action === 'apply-plan') ok = E.applyPartyPlan(state,Number(b.dataset.slot));
  if (b.dataset.action === 'dismiss' && confirm('Dismiss this adventurer permanently? Their levels and XP will be lost.')) ok = E.dismiss(state,id);
  if (ok) { message(''); save(); render(); }
});
document.addEventListener('change',event=>{ if(paused || !event.target.matches('select[data-equip]')) return; if(E.equip(state,Number(event.target.dataset.equip),event.target.value||null)){save();render();} });
$('recover').onchange = event => { E.configureRecovery(state,event.target.checked); save(); render(); };
$('save-plan').onclick = () => { if(E.savePartyPlan(state,Number($('plan-slot').value),$('plan-name').value)){ $('plan-name').value=''; save(); render(); message('Party plan saved in the selected slot.'); } };
$('recovery-rooms').onchange = event => { E.configureRecovery(state,state.recovery.enabled,Number(event.target.value)); save(); render(); };
$('recovery-percent').onchange = event => { E.configureRecovery(state,state.recovery.enabled,state.recovery.rooms,Number(event.target.value)); save(); render(); };
$('start').onclick = () => { state.farmDepth = Math.max(1,Math.min(Math.max(1,state.depth), Math.floor(Number($('farm-depth').value)||1))); E.startExpedition(state); save(); render(); };
$('retreat').onclick = () => { E.retreat(state); save(); render(); };
$('refresh').onclick = () => { E.refreshApplicants(state); save(); render(); };
$('policy').onchange = event => { E.setPolicy(state,event.target.value); save(); render(); };
$('push-limit').oninput=()=>{destinationDraft=true;};
$('set-destination').onclick=()=>{const raw=$('push-limit').value,limit=Number(raw);if(raw!==''&&E.setPushLimit(state,limit)){destinationDraft=false;save();render();message('');}else message('Choose a whole destination depth from 0 to 1,000,000. Recovery locks this setting until the queue is canceled.');};
$('farm-depth').oninput = event => { const n = Number(event.target.value); if (Number.isInteger(n) && n >= 1 && n <= Math.max(1,state.depth)) { state.farmDepth = n; save(); } };
$('farm-depth').onchange = event => { state.farmDepth = Math.max(1,Math.min(Math.max(1,state.depth), Math.floor(Number(event.target.value)||1))); $('farm-depth').value = state.farmDepth; save(); render(); };
$('auto').onchange = event => { E.setAuto(state,event.target.checked); save(); render(); };
$('export').onclick = () => { const blob = new Blob([E.serialize(state)],{type:'application/json'}); const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href=url; a.download='idle-fodder-save.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); };
$('import').onchange = async event => {
  const file = event.target.files[0]; if (!file) return;
  try {
    if (file.size>200000) throw new Error('Save file is too large.');
    const result = E.restore(await file.text());
    if (paused) throw new Error('This tab was paused because another tab updated the Guild. Reload before importing.');
    if (!confirm('Replace your current guild with this imported save? Export a backup first if you want to keep both.')) return;
    state = result.state; destinationDraft=false; $('farm-depth').value = state.farmDepth; storageAvailable = true; save(); message('Save imported successfully.'); render();
  } catch (error) { message(`Import failed: ${error.message}`); }
  finally { event.target.value=''; }
};
let last = Date.now(), pending = 0;
setInterval(() => { if (paused) return; const now = Date.now(), elapsed = Math.max(0,Math.floor((now-last)/1000)); if (!elapsed) return; last += elapsed*1000; E.advance(state,elapsed); pending += elapsed; if(pending>=5){save();pending=0;} render(); },250);
window.addEventListener('pagehide',save);
$('farm-depth').value = state.farmDepth;
render();
