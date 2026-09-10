import './globals.css';
import type { Metadata } from 'next';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://talunza.co.zw/media').replace(/\/$/, '');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Talunza Media | Video Production, AI Studio & Academy Zimbabwe',
    template: '%s | Talunza Media',
  },
  description: 'Talunza Media provides phone-first video production, AI-assisted creative services and practical AI/media training for creators, businesses, schools, events and communities in Zimbabwe.',
  keywords: [
    'Talunza Media', 'video production Zimbabwe', 'video production Chiredzi', 'AI media Zimbabwe',
    'AI training Zimbabwe', 'wedding videography Chiredzi', 'business adverts Zimbabwe',
    'phone filmmaking Zimbabwe', 'creator training Zimbabwe', 'AI studio Zimbabwe'
  ],
  alternates: { canonical: `${siteUrl}/` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: {
    type: 'website', locale: 'en_ZW', siteName: 'Talunza Media', url: `${siteUrl}/`,
    title: 'Talunza Media | Production, AI Studio & Academy',
    description: 'Real filming, better production, selective AI enhancement and practical training for Zimbabwean creators, businesses and communities.'
  },
  twitter: {
    card: 'summary', title: 'Talunza Media | Production, AI Studio & Academy',
    description: 'Video production, AI-assisted creative services and practical AI/media training in Zimbabwe.'
  },
};

const mediaSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Talunza Media',
  url: `${siteUrl}/`,
  telephone: '+263777323918',
  areaServed: ['Zimbabwe', 'Chiredzi', 'Lowveld'],
  description: 'Video and media production, AI-assisted creative services, and practical AI and media training.',
  parentOrganization: { '@type': 'Organization', name: 'Talunza', url: 'https://talunza.co.zw/' },
  serviceType: ['Video production', 'Media production', 'AI-assisted creative services', 'AI training', 'Media training']
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><script defer src="https://talunza.co.zw/analytics-loader.js"></script></head><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mediaSchema) }} /></body></html>;
}
