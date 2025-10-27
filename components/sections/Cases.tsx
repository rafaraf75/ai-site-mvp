"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {motion} from "framer-motion";

type CaseItem = {
  label: string;
  value: string;
  desc: string;
};

export default function Cases({title, items}: {title: string; items: CaseItem[]}) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {items.map((c, i) => (
            <motion.div key={i} whileHover={{y: -2}} transition={{type: "spring", stiffness: 300}}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold tracking-tight">{c.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{c.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

