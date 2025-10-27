import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Bot, MonitorSmartphone, Compass, Palette, Code2, Rocket, ArrowRight} from "lucide-react";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const {locale} = await params;
  const m = (await import(`../../../locales/${locale}.json`)).default as any;

  return (
    <div className="py-10 space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{m.services.title}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">{m.services.intro}</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Bot size={18} />
              </span>
              {m.services.ai.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc list-inside">
              {m.services.ai.points.map((p: string, i: number) => (
                <li key={i} className="text-sm">{p}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                <MonitorSmartphone size={18} />
              </span>
              {m.services.web.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc list-inside">
              {m.services.web.points.map((p: string, i: number) => (
                <li key={i} className="text-sm">{p}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{m.services.process.title}</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {m.services.process.steps.map(
            (s: {name: string; desc: string}, i: number) => (
              <Card key={i} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                      {i === 0 && <Compass size={18} />} {i === 1 && <Palette size={18} />} {i === 2 && (
                        <Code2 size={18} />
                      )} {i === 3 && <Rocket size={18} />}
                    </span>
                    {s.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </section>

      <div>
        <Button asChild size="lg" className="group">
          <a href={`/${locale}/contact`}>
            <span className="inline-flex items-center gap-2">
              {m.services.cta}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </Button>
      </div>
    </div>
  );
}
