/** TALUNZA Studio — zero-cost, offline-ready creative brief engine.
 * No recording, generative AI, external requests, engagement prediction or verified claims.
 */
function clean(value,name,max=120){
  if(typeof value!=='string')throw new TypeError(`${name} must be text`);
  const text=value.replace(/[\u0000-\u001f\u007f]+/g,' ').replace(/\s+/g,' ').trim();
  if(text.length<3||text.length>max)throw new RangeError(`${name} must be 3–${max} characters`);
  return text;
}
const stamp=sec=>`00:00:${String(Math.floor(sec)).padStart(2,'0')},000`;
function srtCue(index,start,end,text){
  return `${index}\n${stamp(start)} --> ${stamp(end)}\n${text}\n`;
}

export function buildShortBrief(input){
  if(!input||typeof input!=='object'||Array.isArray(input))throw new TypeError('An offer brief is required');
  const business=clean(input.business,'Business');
  const offer=clean(input.offer,'Offer',160);
  const audience=clean(input.audience,'Audience',100);
  const benefit=clean(input.benefit,'What it helps with',160);
  const cta=clean(input.cta,'Call to action',140);
  const durationSec=input.durationSec;
  if(durationSec!==15&&durationSec!==30)throw new RangeError('Only 15 or 30 second planning presets are available');
  const cuts=durationSec===15?[0,2,6,11,15]:[0,3,10,20,30];
  const hooks=[
    {id:'problem',label:'Problem-first',text:`${audience}: struggling with ${benefit}? Here's ${offer}.`},
    {id:'show',label:'Show-first',text:`See ${offer} in action — from ${business}.`},
    {id:'question',label:'Question-first',text:`What if ${audience.toLowerCase()} could get ${benefit}?`},
  ];
  const shots=[
    {start:cuts[0],end:cuts[1],role:'HOOK',visual:'Show a real customer-relevant situation or the actual product; no fabricated before/after.',caption:hooks[0].text},
    {start:cuts[1],end:cuts[2],role:'DEMONSTRATION',visual:`Show real footage of ${offer}; if no footage exists, plan a permitted demonstration.`,caption:offer},
    {start:cuts[2],end:cuts[3],role:'BENEFIT',visual:'Show the actual use case. Verify claims or omit them before publishing.',caption:benefit},
    {start:cuts[3],end:cuts[4],role:'ACTION',visual:'Display real business identity and one clear contact action.',caption:cta},
  ];
  const srt=shots.map((shot,index)=>srtCue(index+1,shot.start,shot.end,shot.caption)).join('\n');
  const pasteText=[`${business} — ${durationSec}s short-video draft`, `Audience: ${audience}`,
    'HOOK OPTIONS',...hooks.map((h,i)=>`${i+1}. ${h.label}: ${h.text}`),'SHOT PLAN',
    ...shots.map(s=>`${s.start}–${s.end}s | ${s.role}: ${s.visual} | Text: ${s.caption}`),
    'CHECK BEFORE POSTING: permission for footage/voices, accurate claims, readable captions, audio clarity, current CTA.'].join('\n');
  return Object.freeze({kind:'talunza.studio.short_brief.v1',status:'DRAFT_UNVERIFIED',
    business,offer,audience,benefit,cta,durationSec,source:'USER_SUPPLIED_INPUT_ONLY',
    estimatedPaidApiCostUsd:0,paidAIRequired:false,
    hooks:Object.freeze(hooks),shots:Object.freeze(shots),srt,pasteText,
    limitations:'Creative templates only. Timings are illustrative, subtitles are not synced to recorded speech, and actual rights, accuracy, performance and customer approval are unverified.'});
}
