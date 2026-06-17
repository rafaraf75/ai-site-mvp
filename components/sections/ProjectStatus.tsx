"use client";

import Link from "next/link";
import {motion, useReducedMotion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {fadeUp, stagger, viewportOnce} from "@/lib/motion";
import {ArrowRight} from "lucide-react";

type Step = {
  title: string;
  desc: string;
};

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  steps: Step[];
  note: string;
  cta: {label: string; href: string};
};

export default function ProjectStatus({
  eyebrow,
  title,
  description,
  steps,
  note,
  cta,
}: Props) {
  const reduce = useReducedMotion();
  const container = stagger(Boolean(reduce));
  const item = fadeUp(Boolean(reduce), 8, 0.4);

  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">
            {eyebrow}
          </p>
          <h2 className="section-heading mt-2 max-w-3xl text-2xl sm:text-[2rem]">
            {title}
          </h2>
          <p className="section-copy mt-4 max-w-3xl dark:text-[hsl(var(--muted-foreground))]">
            {description}
          </p>
        </div>

        <motion.div
          initial={false}
          whileInView="show"
          viewport={viewportOnce}
          variants={container}
          className="process-timeline mt-8 grid gap-5 md:grid-cols-3"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={item}
              className="process-step rounded-2xl border p-5"
            >
              <div className="section-icon inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,hsl(191_84%_42%)_0%,hsl(198_86%_46%)_100%)] text-sm font-semibold text-white shadow-[0_10px_18px_-12px_hsl(var(--primary)/0.6)]">
                {index + 1}
              </div>
              <h3 className="mt-4 text-[1.02rem] font-semibold leading-6">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground dark:text-[hsl(var(--muted-foreground))]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="section-note mt-6 flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground dark:text-[hsl(var(--muted-foreground))]">{note}</p>
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
      </div>
    </section>
  );
}
