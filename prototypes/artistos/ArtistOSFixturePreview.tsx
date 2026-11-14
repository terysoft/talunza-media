import type { ReactNode } from 'react';

/**
 * ArtistOS fixture-only preview. Not imported by any route.
 * Synthetic identity only. No network requests, forms, analytics, or persistence.
 * Publication requires a separate consent and security review.
 */
const artist = {
  stageName: 'Demo Musician',
  location: 'Zimbabwe',
  genres: ['Contemporary', 'Live performance'],
  releases: [{ title: 'Example Release', status: 'Planning', date: 'Not announced' }],
  bookingStatus: 'Enquiries unavailable in preview',
  rightsStatus: 'Rights unverified — demonstration only',
} as const;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section style={{ borderTop: '1px solid #cbd5e1', padding: '1rem 0' }}>
    <h2 style={{ fontSize: '1.15rem', marginBottom: '.5rem' }}>{title}</h2>
    {children}
  </section>;
}

export default function ArtistOSFixturePreview() {
  return (
    <article aria-label="Synthetic ArtistOS product preview" style={{ maxWidth: 640, margin: 'auto', padding: '1rem', color: '#172033', background: '#fff', lineHeight: 1.55 }}>
      <p role="status" style={{ fontWeight: 700 }}>INTERNAL SYNTHETIC FIXTURE — NOT AN ARTIST PROFILE</p>
      <h1>{artist.stageName}</h1>
      <p>{artist.location} · {artist.genres.join(' / ')}</p>
      <Section title="Press kit">
        <p>Biography, approved photographs, stage requirements and verified contacts would appear only after the artist authorises publication.</p>
        <p>Nothing to download in this fixture.</p>
      </Section>
      <Section title="Release campaign">
        <p>{artist.releases[0].title}: {artist.releases[0].status}. Date: {artist.releases[0].date}.</p>
        <p>Trackable outbound campaign links require a privacy-reviewed redirect and consent policy. No tracking is active.</p>
      </Section>
      <Section title="Bookings">
        <p>{artist.bookingStatus}. A secure, rate-limited backend and verified recipient are required before enabling enquiries.</p>
      </Section>
      <Section title="Fans and rights">
        <p>No fan registration or contact collection is enabled.</p>
        <p>{artist.rightsStatus}. This is not a royalty statement or proof of ownership.</p>
      </Section>
    </article>
  );
}
