"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

const SUPPORTED = ["pl", "en", "es"] as const;
const isSupported = (val: string): val is typeof SUPPORTED[number] => (SUPPORTED as readonly string[]).includes(val);

function withLocale(pathname: string, target: string) {
  if (!pathname) return `/${target}`;
  const parts = pathname.split("/");
  if (parts.length > 1 && isSupported(parts[1])) {
    parts[1] = target;
    return parts.join("/") || `/${target}`;
  }
  // jeśli brak prefixu, doklej
  return `/${target}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export default function LangSwitcher() {
  const pathname = usePathname();

  return (
    <div style={{display: "flex", gap: 8}}>
      {SUPPORTED.map((loc) => (
        <Link key={loc} href={withLocale(pathname, loc)} prefetch>
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}




