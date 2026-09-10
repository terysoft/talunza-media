import './globals.css';
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://talunza.co.zw/media';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Talunza Media | Production, AI Studio & Academy',
  description: 'Phone-first media production, selective AI enhancement and practical AI training for creators, businesses, events and communities in Zimbabwe.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
