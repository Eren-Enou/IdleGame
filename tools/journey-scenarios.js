import * as E from '../src/engine.js';
// The mixed-investment recovery policy used by recruitment experiments.
export function mixedJourney(seed,duration){
 if(!Number.isInteger(duration)||duration<1||duration>86400)throw new Error('Journey duration must be 1–86400 seconds.');
 const s=E.createGame(seed,0);for(const a of [...s.applicants]){E.recruit(s,a.id);E.assign(s,a.id);}s.auto=true;
 let farmWins=0,lastWins=0,lastDefeats=0;
 for(let t=0;t<duration;t++){
  for(const k of s.upgrades.training<=s.upgrades.infirmary?['training','infirmary']:['infirmary','training'])E.buyUpgrade(s,k);
  E.tick(s);
  if(s.records.defeats>lastDefeats){s.policy='farm';s.farmDepth=Math.max(1,s.depth);s.auto=true;farmWins=0;lastDefeats=s.records.defeats;}
  if(s.records.wins>lastWins){if(s.policy==='farm'&&++farmWins>=10)s.policy='push';lastWins=s.records.wins;}
 }
 return s;
}
