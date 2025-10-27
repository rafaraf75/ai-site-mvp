# AI Site MVP

Nowoczesny landing (Next.js App Router, TS, Tailwind, shadcn/ui) z i18n (PL/EN/ES), dark mode, animacjami, formularzem kontaktu i SEO.

## Wymagania
- Node 18/20
- npm

## Uruchomienie lokalne
- Dev: `npm run dev` → http://localhost:3000 (redirect na `/pl`)
- Build: `npm run build`
- Start prod: `npm start`
- E2E (Playwright): `npm run test:e2e`

## i18n
- Segment: `app/[locale]`
- Dostępne: `pl`, `en`, `es`
- Treści: `locales/*.json`

## Środowisko (env)
Utwórz `.env.local` i ustaw:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=localhost
```

W produkcji ustaw `NEXT_PUBLIC_SITE_URL` na pełny adres (np. `https://twojadomena.pl`) i `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` na domenę śledzoną w Plausible.

## SEO
- Konfiguracja: `lib/seo.ts`, `next-seo.config.ts`
- `app/sitemap.ts` generuje sitemapę dla `/[locale]`, `/[locale]/services`, `/[locale]/contact` z alternates/hreflang
- `app/robots.ts` wskazuje na `Sitemap: ${SITE_URL}/sitemap.xml`

## Styl i UI
- Tailwind v3, shadcn/ui (Button, Card, Input)
- Tokeny motywu: `app/styles/tokens.css`
- Dark mode: `next-themes` + `ThemeToggle` + skrypt no-flash (`ThemeScript`)

## Formularz kontaktu
- Klient: `components/sections/ContactForm.tsx` (react-hook-form + zod)
- Serwer: `app/api/contact/route.ts` (MVP – loguje dane; łatwy swap na Formspree/Nodemailer)
- Analityka: `trackEvent('contact_sent')` (Plausible)

## Animacje
- Framer Motion; wspólne warianty: `lib/motion.ts`
- Respektuje `prefers-reduced-motion`

## Deploy na Vercel
1) Połącz repo z Vercel (New Project → import z GitHub)
2) Ustaw zmienne środowiskowe w Project Settings → Environment Variables:
   - `NEXT_PUBLIC_SITE_URL` → `https://twoja-domena.pl`
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` → `twoja-domena.pl`
3) Build & Output Settings: domyślne (Framework: Next.js, Build Command: `npm run build`)
4) Deploy. Po starcie sprawdź:
   - `/sitemap.xml` (z wpisami PL/EN/ES i hreflang)
   - `/robots.txt` (Sitemap: …/sitemap.xml)
   - Meta OG/Twitter w źródle `/pl`, `/en`, `/es`

## CI
- `.github/workflows/ci.yml` – matrix (Ubuntu/Windows, Node 18/20), kroki: `npm ci` → `lint --max-warnings=0` → `build` → Playwright (instalacja przeglądarek) → upload artefaktów (`playwright-report`, `test-results`).

## Konwencje
- Brak `any`; logika w `lib/*`, komponenty w `components/*`
- i18n: brak twardych stringów w komponentach; używamy `locales/*.json`

## Struktura (skrót)
- `app/[locale]/*` – strony i layout i18n
- `components/common/*`, `components/sections/*`
- `lib/*` – utils (seo, motion, validation, analytics)
- `public/og-default.svg` – OG image 1200×630

