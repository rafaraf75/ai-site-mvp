"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import ThemeToggle from "@/components/common/ThemeToggle";
import LangSwitcher from "@/components/common/LangSwitcher";

type Labels = {
  home: string;
  services: string;
  contact: string;
};

function currentLocaleFromPath(pathname: string | null): string {
  if (!pathname) return "pl";
  const m = pathname.match(/^\/(\w{2})(?:\b|\/)/);
  return m?.[1] ?? "pl";
}

export default function Navbar({labels}: {labels: Labels}) {
  const pathname = usePathname();
  const locale = currentLocaleFromPath(pathname);
  const [open, setOpen] = useState(false);

  const navLinks = [
    {href: `/${locale}`, label: labels.home},
    {href: `/${locale}/services`, label: labels.services},
    {href: `/${locale}/contact`, label: labels.contact},
  ];

  return (
    <header className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        className="mx-auto max-w-6xl px-4 sm:px-6"
        role="navigation"
        aria-label="Główna nawigacja"
      >
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/${locale}`} className="font-semibold hover:opacity-80" aria-label="Logo">
              AI Site
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:underline underline-offset-4">
                {l.label}
              </Link>
            ))}
            <LangSwitcher />
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LangSwitcher />
            <Button
              variant="outline"
              size="sm"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Otwórz menu"
              onClick={() => setOpen((v) => !v)}
            >
              Menu
            </Button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`md:hidden ${open ? "block" : "hidden"} pb-4 border-t`}
        >
          <div className="flex flex-col gap-3 pt-3">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-1 py-1 hover:underline underline-offset-4"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}

