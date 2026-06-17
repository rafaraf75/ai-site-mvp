"use client";

import Link from "next/link";
import {motion, useReducedMotion} from "framer-motion";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {fadeUp, stagger, viewportOnce} from "@/lib/motion";
import {ArrowRight, Check} from "lucide-react";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  checklist: string[];
  note: string;
  cta: {label: string; href: string};
};

export default function MiniAudit({
  eyebrow,
  title,
  description,
  checklist,
  note,
  cta,
}: Props) {
  const reduce = useReducedMotion();
  const container = stagger(Boolean(reduce));
  const item = fadeUp(Boolean(reduce), 8, 0.4);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Card className="mini-audit-card brand-shell">
          <CardHeader className="pb-4 text-white">
            <p className="eyebrow text-[hsl(189_88%_68%)]">
              {eyebrow}
            </p>
            <CardTitle className="section-heading max-w-3xl text-2xl sm:text-[2rem]">
              {title}
            </CardTitle>
            <p className="section-copy max-w-3xl text-[hsl(200_34%_84%)] dark:text-[hsl(var(--muted-foreground))]">
              {description}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.ul
              initial={false}
              whileInView="show"
              viewport={viewportOnce}
              variants={container}
              className="grid gap-3 sm:grid-cols-2"
            >
              {checklist.map((itemText, index) => (
                <motion.li
                  key={index}
                  variants={item}
                  className="mini-audit-item flex items-start gap-3 rounded-2xl border p-4"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,hsl(191_84%_42%)_0%,hsl(198_86%_46%)_100%)] text-white shadow-[0_10px_18px_-12px_hsl(var(--primary)/0.6)]"
                  >
                    <Check size={18} />
                  </span>
                  <span className="text-sm font-medium leading-6 text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))]">{itemText}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mini-audit-note flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground max-w-3xl leading-6 dark:text-[hsl(var(--muted-foreground))]">{note}</p>
              <Button asChild className="group w-full sm:w-auto">
                <Link href={cta.href} aria-label={cta.label}>
                  <span className="inline-flex items-center gap-2">
                    {cta.label}
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
