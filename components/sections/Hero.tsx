/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {motion, useReducedMotion} from "framer-motion";
import {fadeUp} from "@/lib/motion";
import {useEffect, useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
  localLine: string;
  primaryCta: {label: string; href: string};
  secondaryCta?: {label: string; href: string; external?: boolean};
};

export default function Hero({title, subtitle, localLine, primaryCta, secondaryCta}: Props) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const fade = fadeUp(Boolean(reduce));

  return (
    <section className="relative overflow-hidden py-12 sm:py-14 lg:py-16 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10 hero-backdrop-2026" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 hero-cinematic-2026" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-[10%] bottom-1 h-10 hero-glow -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-background -z-10"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 relative z-10">
        <div className="hero-glass brand-shell">
          <motion.h1
            initial={mounted ? "hidden" : false}
            animate={mounted ? "show" : false}
            variants={fade}
            className="page-heading hero-title-3d mx-auto max-w-4xl text-[2.05rem] sm:text-[2.8rem] lg:text-[3.3rem] text-white"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={mounted ? "hidden" : false}
            animate={mounted ? "show" : false}
            variants={fade}
            transition={{delay: 0.15}}
            className="section-copy mt-5 mx-auto max-w-[64ch] text-[1rem] text-[hsl(200_35%_88%)] sm:text-[1.08rem] dark:text-[hsl(var(--muted-foreground))]"
          >
            {subtitle}
          </motion.p>
          <motion.p
            initial={mounted ? "hidden" : false}
            animate={mounted ? "show" : false}
            variants={fade}
            transition={{delay: 0.22}}
            className="eyebrow mt-4 text-[0.8rem] text-[hsl(199_24%_80%)] sm:text-[0.86rem] dark:text-[hsl(var(--muted-foreground)/0.92)]"
          >
            {localLine}
          </motion.p>

          <motion.div
            initial={mounted ? "hidden" : false}
            animate={mounted ? "show" : false}
            variants={fade}
            transition={{delay: 0.3}}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="group min-w-[15rem]">
              <Link href={primaryCta.href} aria-label={primaryCta.label}>
                <span className="inline-flex items-center gap-2">
                  {primaryCta.label}
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={18} aria-hidden="true" />
                </span>
              </Link>
            </Button>
            {secondaryCta ? (
              <Button asChild size="lg" variant="secondary" className="group min-w-[15rem]">
                {secondaryCta.external ? (
                  <a
                    href={secondaryCta.href}
                    aria-label={secondaryCta.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="inline-flex items-center gap-2">
                      {secondaryCta.label}
                      <ArrowRight
                        className="transition-transform group-hover:translate-x-0.5"
                        size={18}
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                ) : (
                  <Link href={secondaryCta.href} aria-label={secondaryCta.label}>
                    <span className="inline-flex items-center gap-2">
                      {secondaryCta.label}
                      <ArrowRight
                        className="transition-transform group-hover:translate-x-0.5"
                        size={18}
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                )}
              </Button>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

