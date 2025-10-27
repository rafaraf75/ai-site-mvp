import type { MetadataRoute } from 'next';
import { LOCALES, SITE_URL } from '@/lib/seo';

const PAGES = ['', '/services', '/contact'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    for (const page of PAGES) {
      const loc = `${SITE_URL}/${locale}${page}`.replace(/\/$/, '');
      entries.push({
        url: loc,
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.7,
        alternates: {
          languages: {
            pl: `${SITE_URL}/pl${page}`.replace(/\/$/, ''),
            en: `${SITE_URL}/en${page}`.replace(/\/$/, ''),
            es: `${SITE_URL}/es${page}`.replace(/\/$/, ''),
          },
        },
      });
    }
  }
  return entries;
}

