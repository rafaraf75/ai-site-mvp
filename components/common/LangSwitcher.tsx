'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SUPPORTED = ['pl', 'en', 'es'] as const;
const isSupported = (val: string): val is (typeof SUPPORTED)[number] =>
  (SUPPORTED as readonly string[]).includes(val);

function withLocale(pathname: string, target: string) {
  if (!pathname) return `/${target}`;
  const parts = pathname.split('/');
  if (parts.length > 1 && isSupported(parts[1])) {
    parts[1] = target;
    return parts.join('/') || `/${target}`;
  }
  // jeśli brak prefixu, doklej
  return `/${target}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

export default function LangSwitcher() {
  const pathname = usePathname();
  const currentLocale = (() => {
    if (!pathname) return 'pl';
    const m = pathname.match(/^\/(\w{2})(?:\b|\/)/);
    return (m?.[1] ?? 'pl') as (typeof SUPPORTED)[number] | 'pl';
  })();

  return (
    <div className="flex gap-2 items-center">
      {SUPPORTED.map((loc) => {
        const active = currentLocale === loc;
        return (
          <Link
            key={loc}
            href={withLocale(pathname, loc)}
            prefetch
            className={`text-xs font-semibold tracking-wide transition-colors ${active ? 'text-[hsl(var(--copper))]' : 'text-muted-foreground hover:text-foreground'}`}
            aria-current={active ? 'true' : undefined}
          >
            {loc.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
