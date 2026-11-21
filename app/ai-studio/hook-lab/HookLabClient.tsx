'use client';
import {useState} from 'react';
import {buildShortBrief, type StudioBrief} from '../../../lib/hook-lab.mjs';
import styles from './page.module.css';

type FormInput={business:string;offer:string;audience:string;benefit:string;cta:string;durationSec:15|30};
const starter:FormInput={business:'TALUNZA Energy',offer:'custom poultry incubators',audience:'poultry farmers',
  benefit:'hatching planning',cta:'Ask for a custom quotation',durationSec:30};

export default function HookLabClient(){
  const [form,setForm]=useState<FormInput>(starter);
  const [brief,setBrief]=useState<StudioBrief|null>(null);
  const [activeHook,setActiveHook]=useState(0);
  const [error,setError]=useState('');
  const [feedback,setFeedback]=useState('');
  const update=(key:keyof FormInput,value:string)=>{
    setForm(current=>({...current,[key]:key==='durationSec'?Number(value) as 15|30:value}));
    setBrief(null);setFeedback('');
  };
  const generate=()=>{
    try{const result=buildShortBrief(form);setBrief(result);setActiveHook(0);setError('');setFeedback('Draft created locally. Review every factual claim before publishing.');}
    catch(e){setBrief(null);setError(e instanceof Error?e.message:'Check the entered details.');}
  };
  const copy=async(text:string,name:string)=>{
    try{if(!navigator.clipboard)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(text);
      setFeedback(`${name} copied. Check it before publishing.`);}
    catch{setFeedback('Could not copy automatically. Select the text below to copy manually.');}
  };
  return <section className={styles.layout} aria-label="Short-video planning tool">
    <div className={styles.formCard}>
      <h2>Your free creative brief</h2>
      <p className={styles.help}>Everything below is processed on this page. No uploaded video, cloud AI or paid credits are needed.</p>
      <div className={styles.fields}>
        <label>Business or creator name<input value={form.business} maxLength={120} onChange={e=>update('business',e.target.value)}/></label>
        <label>Product or service<input value={form.offer} maxLength={160} onChange={e=>update('offer',e.target.value)}/></label>
        <label>Who is it for?<input value={form.audience} maxLength={100} onChange={e=>update('audience',e.target.value)}/></label>
        <label>What problem does it help with?<input value={form.benefit} maxLength={160} onChange={e=>update('benefit',e.target.value)}/></label>
        <label>Call to action<input value={form.cta} maxLength={140} onChange={e=>update('cta',e.target.value)}/></label>
        <label>Target length<select value={form.durationSec} onChange={e=>update('durationSec',e.target.value)}>
          <option value={15}>15 seconds</option><option value={30}>30 seconds</option>
        </select></label>
      </div>
      <button type="button" className={styles.mainButton} onClick={generate}>Generate free video brief</button>
      {error&&<p role="alert" className={styles.error}>{error}</p>}
      <p className={styles.privacy}>No automatic post, voice clone, video render or claim verification occurs.</p>
    </div>
    <div className={styles.output} aria-live="polite">
      {!brief?<div className={styles.empty}><h2>Three hooks. One clear plan.</h2><p>Enter your offer and create a 15–30 second shot-by-shot draft with suggested subtitles. Then film real footage or use your own editor.</p></div>:
      <>
        <p className={styles.draft}>DRAFT · UNVERIFIED · {brief.durationSec} SEC · $0 API SPEND</p>
        <h2>Choose your opening hook</h2>
        <div className={styles.hooks} role="group" aria-label="Hook variations">{brief.hooks.map((hook,index)=><button
          type="button" key={hook.id} aria-pressed={activeHook===index} className={activeHook===index?styles.selected:''}
          onClick={()=>setActiveHook(index)}>{hook.label}</button>)}</div>
        <blockquote className={styles.hook}>{brief.hooks[activeHook].text}</blockquote>
        <h3>Shot-by-shot plan</h3>
        <ol className={styles.shots}>{brief.shots.map((shot,i)=><li key={shot.role}>
          <strong>{shot.start}–{shot.end}s · {shot.role}</strong><p>{shot.visual}</p><small>Suggested on-screen text: {i===0?brief.hooks[activeHook].text:shot.caption}</small>
        </li>)}</ol>
        <div className={styles.buttons}>
          <button type="button" onClick={()=>copy(brief.pasteText,'Creative brief')}>Copy plan</button>
          <button type="button" onClick={()=>copy(brief.srt.replace(brief.hooks[0].text,brief.hooks[activeHook].text),'Sample subtitles')}>Copy sample SRT</button>
        </div>
        {feedback&&<p role="status" className={styles.feedback}>{feedback}</p>}
        <details><summary>Editable brief text</summary><textarea readOnly rows={11} value={brief.pasteText} aria-label="Copyable video plan"/></details>
        <details><summary>Sample subtitle timing (SRT)</summary><textarea readOnly rows={10} value={brief.srt.replace(brief.hooks[0].text,brief.hooks[activeHook].text)} aria-label="Copyable SRT subtitles"/></details>
        <p className={styles.privacy}>{brief.limitations}</p>
      </>}
    </div>
  </section>;
}
