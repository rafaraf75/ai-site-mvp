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
  cards,
  ctaLabel,
}: {
  title: string;
  cards: ServiceCard[];
  ctaLabel: string;
}) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <Button asChild variant="outline" size="sm" className="group">
            <Link href={cards[0]?.href ?? "/services"}>
              <span className="inline-flex items-center gap-2">
                {ctaLabel}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 mt-6">
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
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon size={18} />
                      </span>
                      {c.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{c.desc}</p>
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
    </section>
  );
}

