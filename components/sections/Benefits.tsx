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
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        <p className="text-muted-foreground max-w-3xl mb-6">{subtitle}</p>
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
                className="rounded-lg border p-4 bg-card text-card-foreground hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h3 className="font-medium">{b.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{b.desc}</p>
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

