import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Check} from "lucide-react";
import Link from "next/link";

type Plan = {
  name: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  highlight?: boolean;
};

export default function Pricing({
  title,
  plans,
  locale,
}: {
  title: string;
  plans: Plan[];
  locale: string;
}) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p, idx) => (
            <Card
              key={idx}
              className={p.highlight ? "border-border shadow-sm" : undefined}
            >
              <CardHeader>
                <CardTitle className="flex items-baseline justify-between">
                  <span>{p.name}</span>
                  <span className="text-xl font-bold">
                    {p.price}
                    {p.period ? <span className="text-sm font-normal text-muted-foreground"> / {p.period}</span> : null}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={18} className="mt-0.5 text-primary" aria-hidden />
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/${locale}/contact`}>{p.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
