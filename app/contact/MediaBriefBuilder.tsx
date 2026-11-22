'use client';

import {useEffect, useState, type FormEvent} from 'react';
import styles from './MediaBriefBuilder.module.css';
import {MEDIA_CATEGORIES, mediaMessage, mediaWhatsAppUrl, type MediaProjectType} from '../../lib/media-enquiry.mjs';

type Brief = { category: string; location: string; deadline: string; deliverables: string; details: string };
const empty: Brief = {category:'',location:'',deadline:'',deliverables:'',details:''};

export default function MediaBriefBuilder(){
  const [hydrated, setHydrated] = useState(false);
  const [brief, setBrief] = useState<Brief>(empty);
  const [prepared, setPrepared] = useState<{message:string;url:string}|null>(null);
  useEffect(() => setHydrated(true), []);

  function change(field:keyof Brief, value:string){
    setBrief(previous => ({...previous,[field]:value}));
    setPrepared(null);
  }
  function prepare(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    if (!MEDIA_CATEGORIES.some(category => category === brief.category)) return;
    const fields={...brief,category:brief.category as MediaProjectType};
    setPrepared({message:mediaMessage(fields),url:mediaWhatsAppUrl(fields)});
  }

  return <section className={styles.panel} aria-labelledby="media-brief-title">
    <p className="eyebrow dark">PRIVATE PROJECT BRIEF</p>
    <h2 id="media-brief-title">Prepare a quote request.</h2>
    <p>Describe the job in your own words. Review the message before deciding whether to open WhatsApp. Nothing is sent automatically.</p>
    <form className={styles.form} method="post" hidden={!hydrated} onSubmit={prepare}>
      <label>Project type
        <select required value={brief.category} onChange={e=>change('category',e.target.value)}>
          <option value="">Choose a service</option>
          {MEDIA_CATEGORIES.map(category=><option key={category} value={category}>{category}</option>)}
        </select>
      </label>
      <label>Location
        <input required maxLength={100} autoComplete="address-level2" placeholder="e.g. Chiredzi" value={brief.location} onChange={e=>change('location',e.target.value)}/>
      </label>
      <label>Date or deadline (optional)
        <input maxLength={100} placeholder="e.g. Next Friday" value={brief.deadline} onChange={e=>change('deadline',e.target.value)}/>
      </label>
      <label>Where will the content be used? (optional)
        <input maxLength={140} placeholder="e.g. WhatsApp Status, YouTube" value={brief.deliverables} onChange={e=>change('deliverables',e.target.value)}/>
      </label>
      <label className={styles.wide}>What would you like us to make?
        <textarea required rows={4} maxLength={1000} placeholder="Describe your audience, what you have already and what you need delivered" value={brief.details} onChange={e=>change('details',e.target.value)}/>
      </label>
      <button type="submit" className={styles.prepare}>Prepare my message</button>
    </form>
    {!hydrated && <p className={styles.fallback}>Or <a href="https://wa.me/263777323918">contact TALUNZA Media directly on WhatsApp</a>.</p>}
    <noscript><p>To prepare a brief without scripts, <a href="https://wa.me/263777323918">contact TALUNZA Media directly on WhatsApp</a>.</p></noscript>
    {prepared && <div className={styles.preview} aria-live="polite">
      <h3>Review your message</h3>
      <pre>{prepared.message}</pre>
      <a className={styles.send} href={prepared.url} target="_blank" rel="noopener noreferrer">Open this message in WhatsApp</a>
      <p>WhatsApp opens only when you choose the link. Please check the text before sending.</p>
    </div>}
  </section>;
}
