'use client';

import { useState } from 'react';
import styles from './page.module.css';

type Check = { id: string; name: string; guidance: string; emphasis: string };

const checks: Check[] = [
  {
    id: 'organiser',
    name: 'Promoter identity and registration',
    guidance: 'Ask who is legally responsible for the event. Independently check the promoter or organiser registration and any current permissions that apply.',
    emphasis: 'Do not assume a social profile, poster or spoken promise proves registration.',
  },
  {
    id: 'event',
    name: 'Date, venue and event details',
    guidance: 'Confirm the actual event date, venue, town, stage time, expected audience, event type and main organiser.',
    emphasis: 'An advertised venue or date is not proof that the venue is booked.',
  },
  {
    id: 'terms',
    name: 'Written performance agreement',
    guidance: 'Review who signs, agreed performance duration, artist fee, currency, transport and accommodation, cancellations, and which costs each party covers.',
    emphasis: 'Keep a copy approved by the artist or authorised manager.',
  },
  {
    id: 'payment',
    name: 'Payment, deposit and refund terms',
    guidance: 'Confirm when payment is due, how it is recorded, what happens if a show is cancelled and whether any agent commission applies.',
    emphasis: 'This prototype cannot take payments or certify an organiser.',
  },
  {
    id: 'production',
    name: 'Stage, power, sound and safety',
    guidance: 'Agree on PA and microphones, stage power, soundcheck, stage security, weather contingencies, technical rider and safe access.',
    emphasis: 'Get the organiser to confirm who supplies and pays for equipment.',
  },
  {
    id: 'travel',
    name: 'Travel and schedule feasibility',
    guidance: 'Check journey time, vehicle arrangements, arrival and departure, accommodation where needed, and any cross-border requirements.',
    emphasis: 'Do not treat visa or immigration requirements as universally the same.',
  },
  {
    id: 'promotion',
    name: 'Approved publicity and filming',
    guidance: 'Agree how the artist’s name, music, photos, performances and recordings may be used in posters, paid adverts, livestreams and replays.',
    emphasis: 'Promotion approval does not automatically grant music or recording rights.',
  },
  {
    id: 'decision',
    name: 'Manager or artist sign-off',
    guidance: 'Record who has authority to accept, decline or request changes, and send a final decision through an agreed official channel.',
    emphasis: 'Checking every item here does not constitute a booking confirmation.',
  },
];

export default function BookingReadiness() {
  const [reviewed, setReviewed] = useState<string[]>([]);
  const total = checks.length;
  const count = reviewed.length;

  function toggle(id: string) {
    setReviewed(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  }

  return <section className={styles.checklist} aria-labelledby="checklist-title">
    <div className={styles.summary}>
      <div>
        <p className={styles.kicker}>INTERACTIVE SAMPLE · NO SUBMISSION</p>
        <h2 id="checklist-title">Booking review checklist</h2>
        <p>Tap an item when you have reviewed what it means. This does not certify that the requirement has been satisfied.</p>
      </div>
      <div className={styles.progress}>
        <strong aria-live="polite">{count} of {total} reviewed</strong>
        <progress max={total} value={count} aria-label="Checklist review progress">{count} of {total}</progress>
      </div>
    </div>
    <div className={styles.items}>
      {checks.map(item => {
        const active = reviewed.includes(item.id);
        return <button
          key={item.id}
          type="button"
          className={active ? styles.checked : styles.item}
          onClick={() => toggle(item.id)}
          aria-pressed={active}
          aria-label={(active ? 'Mark not reviewed: ' : 'Mark reviewed: ') + item.name}
        >
          <span className={styles.checkSymbol} aria-hidden="true">{active ? '✓' : '○'}</span>
          <span className={styles.itemBody}>
            <strong>{item.name}</strong>
            <span>{item.guidance}</span>
            <small>{item.emphasis}</small>
          </span>
        </button>;
      })}
    </div>
    <div className={styles.bottom}>
      <button type="button" className={styles.reset} onClick={() => setReviewed([])} disabled={count === 0}>Reset this review</button>
      <p>Selections exist only in the current page memory. Refreshing or leaving the page clears them. No organiser data, personal contact, payment or fan information is requested.</p>
    </div>
  </section>;
}
