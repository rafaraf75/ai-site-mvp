"use client";

import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Bot, MonitorSmartphone, ArrowRight} from "lucide-react";
import {motion} from "framer-motion";
import {fadeUp, viewportOnce} from "@/lib/motion";

type ServiceCard = {
  title: string;
  desc: string;
  href: string;
  icon: "bot" | "web";
};

export default function ServicesPreview({
  title,
  subtitle,
  cards,
  ctaLabel,
}: {
  title: string;
  subtitle: string;
  cards: ServiceCard[];
  ctaLabel: string;
}) {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="service-band brand-shell rounded-[1.75rem] px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl text-white">
              <h2 className="section-heading text-2xl sm:text-[2rem]">{title}</h2>
              <p className="section-copy mt-3 text-[hsl(200_35%_86%)] dark:text-[hsl(var(--muted-foreground))]">{subtitle}</p>
            </div>
            <Button asChild variant="secondary" size="sm" className="group">
              <Link href={cards[0]?.href ?? "/contact"}>
                <span className="inline-flex items-center gap-2">
                  {ctaLabel}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {cards.map((c, i) => {
              const Icon = c.icon === "bot" ? Bot : MonitorSmartphone;
              return (
                <motion.div
                  key={i}
                  whileHover={{y: -2}}
                  initial={false}
                  whileInView="show"
                  viewport={viewportOnce}
                  variants={fadeUp(false, 10, 0.4)}
                  transition={{type: "spring", stiffness: 300, damping: 20}}
                >
                  <Card className="service-card h-full border-0">
                    <CardHeader>
                      <div className="mb-4 h-1.5 w-20 rounded-full bg-[linear-gradient(90deg,hsl(191_84%_42%)_0%,hsl(36_98%_70%)_100%)]" />
                      <CardTitle className="flex items-center gap-2 text-[1.05rem] leading-6">
                        <span aria-hidden className="section-icon inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,hsl(191_84%_42%/0.18)_0%,hsl(36_98%_70%/0.16)_100%)] text-primary">
                          <Icon size={18} />
                        </span>
                        {c.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-6 text-muted-foreground dark:text-[hsl(var(--muted-foreground))]">{c.desc}</p>
                      <div className="mt-4">
                        <Button asChild size="sm" className="group">
                          <Link href={c.href} aria-label={c.title}>
                            <span className="inline-flex items-center gap-2">
                              {ctaLabel}
                              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                            </span>
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

