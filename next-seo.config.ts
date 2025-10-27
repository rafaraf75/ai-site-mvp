import type { DefaultSeoProps } from 'next-seo';
import { SITE_NAME, SITE_URL, defaultOgImage } from './lib/seo';

const SEO: DefaultSeoProps = {
  titleTemplate: `%s | ${SITE_NAME}`,
  defaultTitle: SITE_NAME,
  description: 'Nowoczesny landing z i18n, dark mode i świetnym SEO.',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}${defaultOgImage}`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};

export default SEO;

