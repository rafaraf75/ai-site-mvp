# Agent.md

## 0) Cel projektu
Zbudowa�� nowoczesny, szybki i wieloj�tzyczny **landing dla us�'ug** (asystenci AI + strony/serwisy), z **dark mode**, subtelnymi **animacjami** i prostym formularzem kontaktowym. MVP bez logowania i bez bazy danych (opcjonalny widget chatbota w pƈ��niejszym kroku).

## 1) Stack i narz�tdzia
- **Framework:** Next.js (App Router, TypeScript)
- **Styling/UI:** Tailwind CSS + shadcn/ui (tylko potrzebne komponenty)
- **Animacje:** Framer Motion (scroll�?'reveal, hover, micro�?'interactions)
- **Dark mode:** `next-themes` (system + prze�'�cznik)
- **i18n:** `next-intl` (PL/EN/ES, routing `/pl`, `/en`, `/es`, hreflang)
- **Formularz kontaktu (MVP):** endpoint Next.js API **lub** Formspree (bez bazy)
- **Analityka:** Plausible (lekka, bez cookies)
- **SEO:** next/metadata + `next-seo` (OG, Twitter, canonical, hreflang)
- **Jako�>��:** ESLint, Prettier, Husky + lint�?'staged
- **Testy (light):** Playwright (smoke dla kluczowych �>cie��ek)
- **Deploy:** Vercel (preview per branch)

> Uwaga: **Supabase nie jest potrzebny** w MVP (brak auth i DB). Mo��na doda�� w wersji 1.0 (np. blog, CMS, lead storage).

## 2) Zakres MVP (funkcje)
- **Strony:** Home, Us�'ugi, Kontakt, (Case Studies �?" placeholder), 404
- **Home:** hero z UVP, korzy�>ci, mini�?'case�?ty (na start placeholdery), pakiety, FAQ, CTA
- **Us�'ugi:** Asystenci AI / Strony & Serwisy �?" opis, proces, �?�od�?� ceny
- **Kontakt:** formularz (walidacja, wysy�'ka e�?'mail)
- **i18n:** pe�'ne t�'umaczenia PL/EN/ES tre�>ci statycznych
- **Dark mode:** auto + r�tczny prze�'�cznik
- **Animacje:** subtelne, nie degraduj�ce wydajno�>ci

## 3) Zasady projektowe (dla AI i ludzi)
- **Wydajno�>��:** Core Web Vitals �%� 90; lazy�?'load obrazƈw; unika�� ci�t��kich bibliotek
- **Dost�tpno�>��:** a11y (kontrast, focus states, aria�?'labels, semantic HTML)
- **Responsywno�>��:** mobile�?'first; breakpoints Tailwind
- **Kod:** TypeScript; bez `any`; Server Components tam gdzie to mo��liwe
- **Struktura tre�>ci:** copy krƈtkie, j�tzyk nietechniczny; sekcje z nag�'ƈwkami H1/H2
- **SEO:** unikalne tytu�'y/opisy; og:image; hreflang; sitemap.xml; robots.txt
- **i18n:** stringi w plikach t�'umacze�"; brak twardych tekstƈw w komponentach
- **Animacje:** Framer Motion; dur �%� 600ms; prefer�?'reduced�?'motion respektowane
- **Styl:** Tailwind + design tokens (kolory, spacing, typografia)

## 4) Struktura katalogƈw (docelowa)
```
app/
  (marketing)/
    [locale]/ (segment i18n)
      page.tsx  (Home)
      services/page.tsx
      contact/page.tsx
  components/
    ui/ (shadcn)
    common/ (Navbar, Footer, LangSwitcher, ThemeToggle, Section�?|)
  lib/ (utils: i18n, analytics, seo, motion variants)
  styles/ (globals.css, tokens.css)
  api/contact/route.ts (optional, je�>li bez Formspree)
locales/
  pl.json en.json es.json
public/
  images/
```

## 5) Wskazƈwki dla AI (wa��ne)
- Pisz�c komponenty, **oddziel logik�t od prezentacji** (lib vs components)
- **Nie** u��ywaj `any`; typy eksportuj z lib; reu��ywalne warianty animacji w `lib/motion`
- **Dla i18n**: wszystkie stringi z `locales/*.json`; komponenty przyjmuj� `t` lub u��ywaj� hooka z `next-intl`
- **Formularz**: walidacja po stronie klienta (react-hook-form + zod); po stronie serwera (je�>li endpoint)
- **Dark mode**: `next-themes` z klas� `class` na `<html>`; tokeny kolorƈw w CSS vars
- **Dost�tpno�>��**: aria, role, focus outline; testy Playwright smoke dla nawigacji i formularza
- **Definition of Done** na ko�"cu ka��dego zadania w `CodexTasks.md` ma by�� spe�'nione

## 6) Definition of Done (globalne)
- Build przechodzi bez b�'�tdƈw; ESLint/Prettier czysto
- Lighthouse (Mobile): Perf �%� 90, Access �%� 90, Best �%� 90, SEO �%� 90
- Strony PL/EN/ES dzia�'aj� i maj� poprawne hreflang
- Formularz kontaktu wysy�'a wiadomo�>�� (na testowy adres) i pokazuje potwierdzenie
- Dark mode + prze�'�cznik + pami�t�� preferencji
- Analytics (Plausible) z eventem wys�'ania formularza

## 7) Out of scope (MVP)
- Auth/logowanie, baza danych, panel admina, blog/CMS (do wersji 1.0)
- P�'atno�>ci, z�'o��one integracje
- Zaawansowany chatbot (opcjonalny lekki widget w pƈ��niejszym kroku)

