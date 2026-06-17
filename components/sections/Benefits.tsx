"use client";

import {motion, useReducedMotion} from "framer-motion";
import {stagger, fadeUp, viewportOnce} from "@/lib/motion";
import {Zap, Languages, Moon, Accessibility} from "lucide-react";

type Benefit = {title: string; desc: string};

export default function Benefits({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: Benefit[];
}) {
  const reduce = useReducedMotion();
  const container = stagger(Boolean(reduce));
  const item = fadeUp(Boolean(reduce), 8, 0.4);

  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="section-heading mb-4 text-2xl sm:text-[2rem]">{title}</h2>
          <p className="section-copy mb-8 dark:text-[hsl(var(--muted-foreground))]">{subtitle}</p>
        </div>
        <motion.div
          initial={false}
          whileInView="show"
          viewport={viewportOnce}
          variants={container}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((b, i) => {
            const Icon = [Zap, Languages, Moon, Accessibility][i % 4];
            return (
              <motion.div
                variants={item}
                key={i}
                className="section-item rounded-2xl border p-5 text-card-foreground"
              >
                <div className="mb-4 h-1.5 w-16 rounded-full bg-[linear-gradient(90deg,hsl(191_84%_42%)_0%,hsl(36_98%_70%)_100%)]" />
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className="section-icon inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,hsl(191_84%_42%/0.18)_0%,hsl(36_98%_70%/0.18)_100%)] text-primary">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h3 className="text-[1.02rem] font-semibold leading-6">{b.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-[hsl(var(--muted-foreground))]">{b.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

