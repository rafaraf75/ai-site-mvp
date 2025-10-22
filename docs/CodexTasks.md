# CodexTasks.md

> Ka��de zadanie ma: **Cel ��' Kroki ��' Pliki ��' Definition of Done**. Wykonuj po kolei. J�tzyk UI: **polski** (z t�'umaczeniami EN/ES w JSON).

## Task 00 �?" Bootstrap projektu
**Cel:** Utworzenie projektu Next.js z TypeScript, Tailwind, shadcn/ui.  
**Kroki:**
1. `pnpm` lub `npm` init next@latest (App Router, TS)  
2. Dodaj Tailwind + PostCSS; skonfiguruj `globals.css`  
3. Zainstaluj shadcn/ui i wygeneruj podstawowe komponenty (Button, Card, Input)  
4. Dodaj ESLint, Prettier, Husky, lint�?'staged  
**Pliki:** `package.json`, `app/layout.tsx`, `tailwind.config.ts`, `postcss.config.js`, `styles/globals.css`  
**DoD:** Projekt buduje si�t; strona startowa renderuje; lint/format dzia�'a pre�?'commit.

## Task 01 �?" Konfiguracja i18n (PL/EN/ES)
**Cel:** Wieloj�tzyczno�>�� z `next-intl` i routingiem.  
**Kroki:**
1. Skonfiguruj segment `[locale]` (`pl`, `en`, `es`)  
2. Utwƈrz `locales/pl.json`, `en.json`, `es.json` (na start te same klucze)  
3. Dodaj `hreflang`, middleware przekierowuj�ce domy�>lnie na `pl`  
**Pliki:** `middleware.ts`, `locales/*.json`, `app/[locale]/layout.tsx`  
**DoD:** `/pl`, `/en`, `/es` dzia�'aj�; zmiana j�tzyka przez LangSwitcher.

## Task 02 �?" Motyw i tokeny + Dark Mode
**Cel:** Wprowadzi�� tokeny kolorƈw i ciemny motyw.  
**Kroki:**
1. `next-themes`; prze�'�cznik `ThemeToggle`  
2. Zdefiniuj CSS variables (light/dark) w `styles/tokens.css`  
3. Upewnij si�t, ��e komponenty shadcn respektuj� motyw  
**Pliki:** `styles/tokens.css`, `components/common/ThemeToggle.tsx`  
**DoD:** Przycisk zmienia motyw; preferencja zapami�ttana.

## Task 03 �?" Nawigacja i stopka
**Cel:** Responsywne Navbar + Footer z i18n i a11y.  
**Kroki:**
1. `Navbar` (logo, linki: Home, Us�'ugi, Kontakt, LangSwitcher, ThemeToggle)  
2. `Footer` (prawa aut., linki spo�'., polityka prywatno�>ci �?" placeholder)  
**Pliki:** `components/common/Navbar.tsx`, `components/common/Footer.tsx`, `components/common/LangSwitcher.tsx`  
**DoD:** Dzia�'a na mobile/desktop; nawigacja klawiatur�.

## Task 04 �?" Strona Home (Hero + Korzy�>ci)
**Cel:** Sekcje hero i korzy�>ci z animacjami wej�>cia.  
**Kroki:**
1. Sekcja `Hero` z UVP + 2 CTA (Zobacz demo / Umƈw rozmow�t)  
2. Sekcja korzy�>ci (3�?"4 punkty z ikonami)  
3. Animacje Framer Motion (respect `prefers-reduced-motion`)  
**Pliki:** `app/[locale]/page.tsx`, `components/sections/Hero.tsx`, `components/sections/Benefits.tsx`  
**DoD:** Teksty z i18n; animacje p�'ynne; LCP �%� 2.5s.

## Task 05 �?" Sekcja Us�'ugi na Home
**Cel:** Zarys oferty (Asystenci AI + Strony/Serwisy) + CTA.  
**Kroki:**
1. Karty us�'ug z krƈtkim opisem i linkiem do /services  
2. Warianty hover; micro�?'interactions  
**Pliki:** `components/sections/ServicesPreview.tsx`  
**DoD:** Linki prowadz� do `/[locale]/services`.

## Task 06 �?" Mini�?'case�?ty + Opinie (placeholder)
**Cel:** Pokaza�� dowody zaufania.  
**Kroki:**
1. 2�?"3 karty case (placeholder tekst + liczby)  
2. Sekcja opinii (cytaty �?" placeholder)  
**Pliki:** `components/sections/Cases.tsx`, `components/sections/Testimonials.tsx`  
**DoD:** Sekcje renderuj� si�t poprawnie; �'atwa wymiana tre�>ci z i18n.

## Task 07 �?" Pakiety + FAQ
**Cel:** Uporz�dkowa�� ofert�t i odpowiedzie�� na obiekcje.  
**Kroki:**
1. Tabela 3 pakietƈw (Starter/Pro/Custom) �?" ceny �?�od�?�  
2. FAQ (5�?"7 pyta�") z elementami `details/summary`  
**Pliki:** `components/sections/Pricing.tsx`, `components/sections/FAQ.tsx`  
**DoD:** CTA prowadzi do kontaktu; czytelno�>�� na mobile.

## Task 08 �?" Strona Us�'ugi
**Cel:** Dedykowana strona z pe�'nym opisem us�'ug.  
**Kroki:**
1. `/services` �?" podzia�': Asystenci AI, Strony & Serwisy  
2. Opis procesu (Discovery ��' Design ��' Dev ��' Launch)  
**Pliki:** `app/[locale]/services/page.tsx`  
**DoD:** Pe�'ne i18n; linki CTA ��' Kontakt.

## Task 09 �?" Strona Kontakt + Formularz
**Cel:** Dzia�'aj�cy formularz bez backendu.  
**Kroki:**
1. Formularz (imi�t, e�?'mail, wiadomo�>��); `react-hook-form` + `zod`  
2. Wysy�'ka przez Formspree **lub** Next.js API route (mail do w�'a�>ciciela)  
3. Komunikaty sukces/b�'�d  
**Pliki:** `app/[locale]/contact/page.tsx`, `app/api/contact/route.ts` (je�>li endpoint)  
**DoD:** Wysy�'ka dzia�'a; event w Plausible.

## Task 10 �?" SEO + Social + Sitemap
**Cel:** Podstawy SEO i udost�tpniania.  
**Kroki:**
1. `next-seo`/metadata; tytu�'y, opisy, OG images  
2. `sitemap.xml`, `robots.txt`; `hreflang`  
**Pliki:** `next-seo.config.ts`, `app/sitemap.ts`, `app/robots.ts`  
**DoD:** Lighthouse SEO �%� 90; poprawne meta na ka��dej stronie.

## Task 11 �?" Analityka (Plausible)
**Cel:** Mierzenie ruchu i konwersji.  
**Kroki:**
1. Dodaj skrypt Plausible; zarejestruj event �?�contact_sent�?�  
**Pliki:** `app/[locale]/layout.tsx`, `lib/analytics.ts`  
**DoD:** Eventy widoczne w panelu.

## Task 12 �?" Animacje i mikro�?'interakcje (szlify)
**Cel:** Doda�� subtelne efekty bez utraty wydajno�>ci.  
**Kroki:**
1. Wspƈlne warianty w `lib/motion`  
2. Parallax/scroll�?'reveal tylko na wybranych sekcjach  
**Pliki:** `lib/motion.ts`, aktualizacje sekcji  
**DoD:** Brak jank; CLS �%? 0; respect reduced�?'motion.

## Task 13 �?" Dost�tpno�>�� i testy smoke
**Cel:** Zapewni�� a11y i stabilno�>��.  
**Kroki:**
1. Sprawd�� nag�'ƈwki, aria�?'labels, focus trap w modals (je�>li s�)  
2. Playwright: testy nawigacji i formularza  
**Pliki:** `tests/*.spec.ts`  
**DoD:** Testy przechodz� lokalnie i w CI.

## Task 14 �?" CI i jako�>��
**Cel:** Automatyczna weryfikacja PR.  
**Kroki:**
1. GitHub Actions: lint, build, test  
2. Husky: pre�?'commit lint�?'staged  
**Pliki:** `.github/workflows/ci.yml`, `.husky/*`  
**DoD:** Ka��dy commit/PR przechodzi CI.

## Task 15 �?" Deploy na Vercel + README
**Cel:** Publiczny podgl�d i dokumentacja.  
**Kroki:**
1. Pod�'�cz repo do Vercel; ustaw domen�t  
2. Uzupe�'nij `README.md` (uruchomienie, i18n, edycja tre�>ci)  
**Pliki:** `vercel.json` (opcjonalnie), `README.md`  
**DoD:** Strona online; link do produkcji dzia�'a.

## Task 16 (opcjonalny) �?" Lekki widget chatbota
**Cel:** Prosty widget na stronie (dowƈd kompetencji AI).  
**Kroki:**
1. Osadzi�� istniej�cy widget (np. w�'asny endpoint lub zewn�ttrzny dostawca) **albo** zrobi�� modal z prostym Q&A na lokalnych tre�>ciach (bez danych wra��liwych)  
2. Jasna polityka prywatno�>ci (brak zapisu danych w bazie w MVP)  
**Pliki:** `components/common/ChatWidget.tsx`  
**DoD:** Widget w�'�cza si�t/wy�'�cza flag� �>rodowiskow�; brak b�'�tdƈw.

