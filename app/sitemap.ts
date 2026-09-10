import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://talunza.co.zw/media').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/production', '/ai-studio', '/academy', '/services', '/for-business', '/ai-video-training', '/about', '/contact'];
  return paths.map((path, index) => ({
    url: `${siteUrl}${path}/`,
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : 0.8,
  }));
}
