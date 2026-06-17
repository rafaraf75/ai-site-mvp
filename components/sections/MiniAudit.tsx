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
        <Card>
          <CardHeader className="pb-4">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              {eyebrow}
            </p>
            <CardTitle className="text-2xl sm:text-3xl leading-tight max-w-3xl">
              {title}
            </CardTitle>
            <p className="text-muted-foreground max-w-3xl leading-7">
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
                  className="flex items-start gap-3 rounded-lg border bg-background/70 p-4"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
                  >
                    <Check size={18} />
                  </span>
                  <span className="text-sm leading-6">{itemText}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="flex flex-col gap-4 rounded-lg border bg-background/60 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground max-w-3xl">{note}</p>
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
