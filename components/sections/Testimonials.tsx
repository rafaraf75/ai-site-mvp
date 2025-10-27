"use client";

import {Card, CardContent} from "@/components/ui/card";
import {motion} from "framer-motion";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export default function Testimonials({
  title,
  items,
}: {
  title: string;
  items: Testimonial[];
}) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {items.map((t, i) => (
            <motion.div key={i} initial={{opacity: 0, y: 8}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.4, delay: i * 0.05}}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <blockquote className="text-sm leading-relaxed">
                    “{t.quote}”
                  </blockquote>
                  <div className="mt-3">
                    <div className="font-medium">{t.author}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

