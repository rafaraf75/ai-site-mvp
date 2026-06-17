'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LangSwitcherWithTestIds } from '@/components/common/LangSwitcher';
import ThemeToggle from '@/components/common/ThemeToggle';
import { Button } from '@/components/ui/button';

export type NavLabels = {
  home: string;
  services: string;
  contact: string;
  themeToggle: {
    toDark: string;
    toLight: string;
  };
};

function currentLocaleFromPath(pathname: string | null): string {
  if (!pathname) return 'pl';
  const m = pathname.match(/^\/(\w{2})(?:\b|\/)/);
  return m?.[1] ?? 'pl';
}

function navTestId(href: string, isRoot?: boolean) {
  if (isRoot) return 'nav-home-link';
  if (href.endsWith('/services')) return 'nav-services-link';
  return 'nav-contact-link';
}

function mobileNavTestId(href: string, isRoot?: boolean) {
  if (isRoot) return 'nav-mobile-home-link';
  if (href.endsWith('/services')) return 'nav-mobile-services-link';
  return 'nav-mobile-contact-link';
}

export default function Navbar({ labels }: { labels: NavLabels }) {
  const pathname = usePathname();
  const locale = currentLocaleFromPath(pathname);
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}`, label: labels.home, isRoot: true },
    { href: `/${locale}/services`, label: labels.services, isRoot: false },
    { href: `/${locale}/contact`, label: labels.contact, isRoot: false },
  ];

  const currentPath = (pathname ?? '/').replace(/\/$/, '') || '/';
  const isActive = (href: string, isRoot?: boolean) => {
    const target = href.replace(/\/$/, '') || '/';
    if (isRoot) return currentPath === target;
    return currentPath === target || currentPath.startsWith(`${target}/`);
  };

  return (
    <header className="site-navbar-shell border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        data-testid="site-navbar"
        className="mx-auto max-w-6xl px-4 sm:px-6"
        role="navigation"
        aria-label="Glowna nawigacja"
      >
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}`}
              data-testid="nav-brand-link"
              className="font-semibold tracking-[0.01em] transition-colors hover:opacity-90"
              aria-label="RafLab"
            >
              RafLab
            </Link>
          </div>

          <div className="hidden items-center gap-6 md:flex" data-testid="site-navbar-desktop">
            {navLinks.map((l) => {
              const active = isActive(l.href, l.isRoot);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  data-testid={navTestId(l.href, l.isRoot)}
                  className={`site-nav-link relative pb-1 transition-colors after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-[hsl(var(--copper))]/60 after:transition-transform after:duration-200 hover:after:scale-x-100 ${
                    active ? 'site-nav-link-active after:scale-x-100 after:bg-[hsl(var(--primary))]' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <LangSwitcherWithTestIds testIdPrefix="nav-lang" />
            <ThemeToggle labels={labels.themeToggle} className="site-theme-toggle" />
          </div>

          <div className="flex items-center gap-2 md:hidden" data-testid="site-navbar-mobile">
            <LangSwitcherWithTestIds testIdPrefix="nav-mobile-lang" />
            <Button
              variant="outline"
              size="sm"
              className="site-mobile-menu-button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Otworz menu"
              onClick={() => setOpen((v) => !v)}
            >
              Menu
            </Button>
          </div>
        </div>

        <div id="mobile-menu" className={`site-mobile-menu pb-4 border-t md:hidden ${open ? 'block' : 'hidden'}`}>
          <div className="flex flex-col gap-3 pt-3">
            {navLinks.map((l) => {
              const active = isActive(l.href, l.isRoot);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  data-testid={mobileNavTestId(l.href, l.isRoot)}
                  className={`site-mobile-nav-link px-1 py-1 transition-colors ${active ? 'site-mobile-nav-link-active' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              );
            })}
            <ThemeToggle labels={labels.themeToggle} className="site-theme-toggle" />
          </div>
        </div>
      </nav>
    </header>
  );
}
