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
  ctaDemo: {label: string; href: string};
  ctaCall: {label: string; href: string};
};

export default function Hero({title, subtitle, ctaDemo, ctaCall}: Props) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const fade = fadeUp(Boolean(reduce));

  return (
    <section className="relative overflow-hidden py-14 sm:py-16 lg:py-[72px] text-center">
      <div className="pointer-events-none absolute inset-0 -z-10 hero-backdrop-2026" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 hero-cinematic-2026" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-background -z-10"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-5xl w-full px-4 sm:px-6 relative z-10">
        <div className="hero-glass">
          <motion.h1
            initial={mounted ? "hidden" : false}
            animate={mounted ? "show" : false}
            variants={fade}
            className="hero-title-3d text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.06] md:leading-[0.95]"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={mounted ? "hidden" : false}
            animate={mounted ? "show" : false}
            variants={fade}
            transition={{delay: 0.15}}
            className="mt-5 text-base sm:text-lg text-muted-foreground leading-7 max-w-[60ch] mx-auto"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={mounted ? "hidden" : false}
            animate={mounted ? "show" : false}
            variants={fade}
            transition={{delay: 0.3}}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="group">
              <Link href={ctaDemo.href} aria-label={ctaDemo.label}>
                <span className="inline-flex items-center gap-2">
                  {ctaDemo.label}
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={18} aria-hidden="true" />
                </span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="group">
              <Link href={ctaCall.href} aria-label={ctaCall.label}>
                <span className="inline-flex items-center gap-2">
                  {ctaCall.label}
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={18} aria-hidden="true" />
                </span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

