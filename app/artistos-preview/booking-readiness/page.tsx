import type { Metadata } from 'next';
import { Header, Footer, base } from '../../site';
import BookingReadiness from './readiness-client';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'ArtistOS Booking Readiness — Fictional Demo',
  description: 'A private-in-the-browser sample checklist for Zimbabwean musicians assessing proposed performances. No contacts, bookings or licence checks are submitted.',
  robots: { index: false, follow: false },
};

export default function BookingReadinessPreview() {
  return <main>
    <Header />
    <p className={styles.warning} role="status">FICTIONAL DEMO · NOT A LIVE BOOKING OR LICENCE VERIFICATION SERVICE</p>
    <div className={styles.layout}>
      <nav aria-label="ArtistOS demo navigation" className={styles.back}>
        <a href={base + '/artistos-preview/'}>Back to fictional artist profile</a>
      </nav>
      <header className={styles.intro}>
        <p className={styles.kicker}>TALUNZA ARTISTOS · ZIMBABWE BOOKING READINESS</p>
        <h1>Before saying yes to a performance.</h1>
        <p>Review the commercial and practical details that should be clear before a musician or manager confirms a show. No details are requested or sent anywhere.</p>
      </header>
      <BookingReadiness />
      <aside className={styles.disclaimer}>
        <h2>Regulatory caution</h2>
        <p>Zimbabwe's promoter registration rules have changed, including an amendment in May 2026. This is a planning aid, not proof that a promoter or event is licensed or legally compliant. Confirm current conditions with the National Arts Council of Zimbabwe and qualified advisers.</p>
        <p><a href="https://nacz.co.zw/registration-requirements/" rel="noopener noreferrer" target="_blank">Read the National Arts Council registration guidance</a></p>
      </aside>
      <p className={styles.fine}>This is a non-published branch prototype with sample-only interactions. The parent TALUNZA Media layout may include normal site-level analytics if the site is ever deployed. No artist or promoter records are stored by this checklist.</p>
    </div>
    <Footer />
  </main>;
}
