import type {Metadata} from 'next';
import Script from 'next/script';
import {ThemeProvider} from '@/components/common/ThemeProvider';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import {LOCALES, SITE_NAME, SITE_URL, defaultOgImage} from '@/lib/seo';
import ThemeScript from '@/components/common/ThemeScript';
import ChatWidget from '@/components/common/ChatWidget';

export const locales = ['pl', 'en', 'es'] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const languages = Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}` as const]));

  return {
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: 'Nowoczesny landing z i18n, dark mode i swietnym SEO.',
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url: `${SITE_URL}/${locale}`,
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
      card: 'summary_large_image',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = (await import(`@/locales/${locale}.json`)).default as {
    nav: Record<string, string>;
    footer: {rights: string; privacy: string; social: string};
  };

  return (
    <>
      <ThemeScript />
      {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
        <Script
          src="https://plausible.io/js/script.js"
          strategy="beforeInteractive"
          data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
        />
      ) : null}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground px-3 py-2 rounded"
      >
        Pomin do tresci
      </a>
      <ThemeProvider>
        <Navbar labels={messages.nav} />
        <main id="content" className="mx-auto max-w-6xl px-4 sm:px-6">
          {children}
        </main>
        <Footer labels={messages.footer} locale={locale} />
      </ThemeProvider>
      {(process.env.NEXT_PUBLIC_CHAT_WIDGET_ENABLED === '1' ||
        process.env.NEXT_PUBLIC_CHAT_WIDGET_ENABLED === 'true') && <ChatWidget locale={locale} />}
    </>
  );
}
