# Changelog

## v0.1.0 – MVP (Initial Release)

Pierwsze wydanie dzia³aj¹cego MVP marketing site opartego o Next.js (App Router) z i18n, dark mode, SEO i podstawow¹ analityk¹.

### Najwa¿niejsze
- UI: Tailwind + shadcn/ui, spójne tokeny (w tym miedziany akcent w dark i light)
- i18n: pe³ne PL/EN/ES z segmentem `app/[locale]` i hreflang
- Sekcje: Hero, Korzyœci, Us³ugi, Mini-case’y, Opinie, Pakiety, FAQ
- Kontakt: formularz (react-hook-form + zod) + API route (MVP, bez wysy³ki e-mail)
- SEO: metadata/OG, `app/sitemap.ts`, `app/robots.ts`, domyœlne OG `/og-default.svg`
- CI: GitHub Actions (Ubuntu/Windows × Node 18/20), Playwright smoke + artefakty
- Dodatkowo: prosty widget chatu (w³¹czany envem)

### Szczegó³y
- Stack: Next.js 16 (App Router, TS), Tailwind v3, shadcn/ui, Framer Motion, next-themes
- i18n: `/[locale]` (pl/en/es), pliki w `locales/*.json`, alternates/languages w metadata
- Animacje: warianty w `lib/motion`, respekt `prefers-reduced-motion`
- Formularz: walidacja po stronie klienta; API route zwraca `{ ok: true }` (logowanie do serwera), gotowy do podmiany na Formspree/Nodemailer
- Analityka: `lib/analytics.ts` – `trackEvent('contact_sent')`; skrypt Plausible wed³ug env
- Redirecty: `next.config.ts` zamiast przestarza³ego middleware

### Uruchomienie
- Dev: `npm run dev` › http://localhost:3000 (redirect na `/pl`)
- Build: `npm run build`  •  Start: `npm start`
- Testy E2E: `npm run test:e2e` (Playwright)

### Zmienne œrodowiskowe
Utwórz `.env.local`:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=localhost
NEXT_PUBLIC_CHAT_WIDGET_ENABLED=1
```
W produkcji ustaw domenê i (opcjonalnie) wy³¹cz chat, zmieniaj¹c flagê na `0`.

### Deploy (Vercel)
1) Pod³¹cz repo do Vercel
2) Ustaw env (patrz wy¿ej)
3) Deploy — sprawdŸ `/sitemap.xml`, `/robots.txt` i meta OG/Twitter na `/pl`, `/en`, `/es`

---
Tag: `v0.1.0`
