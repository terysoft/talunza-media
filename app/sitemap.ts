import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://media.talunza.co.zw/', changeFrequency: 'weekly', priority: 1 }];
}
