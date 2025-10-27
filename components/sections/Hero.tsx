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
    <section className="py-16 sm:py-24 text-center">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.h1
          initial={mounted ? "hidden" : false}
          animate={mounted ? "show" : false}
          variants={fade}
          className="text-3xl sm:text-5xl font-bold tracking-tight"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={mounted ? "hidden" : false}
          animate={mounted ? "show" : false}
          variants={fade}
          transition={{delay: 0.15}}
          className="mt-4 text-base sm:text-lg text-muted-foreground"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={mounted ? "hidden" : false}
          animate={mounted ? "show" : false}
          variants={fade}
          transition={{delay: 0.3}}
          className="mt-8 flex items-center justify-center gap-3"
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
    </section>
  );
}
