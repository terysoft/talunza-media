import type { Metadata } from 'next';
import { Header, Footer } from '../site';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'ArtistOS — Fictional Musician Preview',
  description: 'Fictional, text-first Zimbabwean musician business prototype. No real artist, sign-ups or bookings.',
  robots: { index: false, follow: false },
};

const pressKit = [
  ['Biography', 'Artist-approved short and long bios'],
  ['Media', 'Licensed photos, videos and artwork'],
  ['Releases', 'Official listening links and song credits'],
  ['Performance', 'Stage requirements and promoter facts'],
];
const releases = [
  ['Before release', 'Confirm music rights, credits, artwork, official links and radio/WhatsApp promotional plans.'],
  ['Release week', 'Publish approved listening links and short teasers; keep a low-data text version available.'],
  ['After release', 'Review campaign enquiries and observed outcomes; do not invent streaming or conversion numbers.'],
];
const bookings = [
  ['Receive', 'Promoter provides date, venue, city and contact through a future authorised system.'],
  ['Review', 'Artist or authorised manager checks the offer, logistics, terms and availability.'],
  ['Respond', 'Accept, decline or request details. No automatic contract, payment or confirmation.'],
];

export default function ArtistOSPreview() {
  return <main>
    <Header />
    <p className={styles.warning} role="status">FICTIONAL DEMO — NOT A REAL ARTIST PROFILE — NO LIVE BOOKINGS</p>
    <section className={styles.hero} aria-labelledby="artist-title">
      <div>
        <p className={styles.kicker}>TALUNZA ARTISTOS · ZIMBABWE-FIRST PROTOTYPE</p>
        <h1 id="artist-title">Demo Artist 001</h1>
        <p className={styles.lead}>A fictional musician demonstrating a lightweight professional home, an electronic press kit and practical career workflows.</p>
        <p className={styles.small}>Synthetic information only. No real artist name, image, music, contact details, fan registration or customer records.</p>
        <nav className={styles.links} aria-label="Preview sections">
          <a href="#press-kit">Press kit</a><a href="#release-plan">Release campaign</a><a href="#bookings">Bookings</a>
        </nav>
      </div>
      <aside className={styles.status} aria-label="Feature status">
        <h2>Artist business overview</h2>
        <dl>
          <div><dt>Press kit</dt><dd>Sample content only</dd></div>
          <div><dt>Booking pipeline</dt><dd>Design preview · inactive</dd></div>
          <div><dt>Fan subscriptions</dt><dd>Disabled until consent and security review</dd></div>
          <div><dt>Release metrics</dt><dd>No tracking enabled</dd></div>
        </dl>
      </aside>
    </section>
    <section className={styles.section} id="press-kit" aria-labelledby="kit-title">
      <p className={styles.kicker}>01 · ELECTRONIC PRESS KIT</p>
      <h2 id="kit-title">One trusted reference for promoters, sponsors and journalists.</h2>
      <p>Example fields only. A future artist must approve public material and licensing before publication.</p>
      <div className={styles.grid}>{pressKit.map(([title,copy])=><article className={styles.card} key={title}><h3>{title}</h3><p>{copy}</p><small>Not yet supplied</small></article>)}</div>
    </section>
    <section className={styles.alt} id="release-plan" aria-labelledby="release-title">
      <p className={styles.kicker}>02 · RELEASE CAMPAIGN</p>
      <h2 id="release-title">Plan promotion around music and measurable business outcomes.</h2>
      <p>Zimbabwe-specific channels can include radio, WhatsApp, short video, live shows and diaspora communities.</p>
      <ol className={styles.grid}>{releases.map(([stage,copy])=><li className={styles.card} key={stage}><h3>{stage}</h3><p>{copy}</p></li>)}</ol>
      <p className={styles.note}>Campaign links and statistics are not active. Official platform analytics require authorised access.</p>
    </section>
    <section className={styles.section} id="bookings" aria-labelledby="bookings-title">
      <p className={styles.kicker}>03 · BOOKING OPERATIONS</p>
      <h2 id="bookings-title">Do not let an enquiry disappear between messages.</h2>
      <div className={styles.grid}>{bookings.map(([stage,copy])=><article className={styles.card} key={stage}><h3>{stage}</h3><p>{copy}</p></article>)}</div>
      <p className={styles.note}>No contact form, payment collection or database is connected. Bookings require an authorised private backend, anti-abuse controls and retention rules.</p>
    </section>
    <section className={styles.alt} id="rights" aria-labelledby="rights-title">
      <p className={styles.kicker}>04 · RIGHTS RECORDKEEPING</p>
      <h2 id="rights-title">Separate compositions, masters and performer credits.</h2>
      <p>Future entries must record their sources and verification status. ArtistOS is not a rights registrar or a royalty collection agency.</p>
    </section>
    <section className={styles.closing} aria-labelledby="next-title">
      <h2 id="next-title">Prototype, not a launched service.</h2>
      <p>Next gates: validate with consenting Zimbabwean musicians, test on budget Android devices, approve privacy and identity architecture, then develop real artist-controlled workflows.</p>
      <a href="#artist-title">Return to the sample artist</a>
    </section>
    <Footer />
  </main>;
}
