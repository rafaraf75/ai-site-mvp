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
    <section className="py-20 sm:py-28 text-center">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.h1
          initial={mounted ? "hidden" : false}
          animate={mounted ? "show" : false}
          variants={fade}
          className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.06] md:leading-[0.95]"
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
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
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

