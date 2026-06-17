import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  ArrowRight,
  CalendarDays,
  Globe2,
  Languages,
  MapPinned,
  MessageCircle,
  Search,
  Target,
  Workflow,
  Wrench,
} from "lucide-react";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const m = (await import(`@/locales/${locale}.json`)).default as {
    services: {
      hero: {
        title: string;
        description: string;
        cta: string;
      };
      areas: {
        title: string;
        items: {title: string; description: string}[];
      };
      start: {
        title: string;
        steps: {title: string; description: string}[];
      };
      finalCta: {
        title: string;
        description: string;
        cta: string;
      };
    };
  };

  const areaIcons = [Globe2, MapPinned, MessageCircle, CalendarDays, Workflow, Languages];
  const startIcons = [Search, Target, Wrench];

  return (
    <div className="space-y-10 py-10">
      <header className="services-hero brand-shell">
        <div className="relative max-w-3xl">
          <p className="services-eyebrow">RafLab</p>
          <h1 className="page-heading mt-3 text-3xl text-white md:text-4xl">
            {m.services.hero.title}
          </h1>
          <p className="services-hero-copy mt-3 max-w-3xl">{m.services.hero.description}</p>
        </div>
        <div className="mt-6">
          <Button asChild size="lg" className="group">
            <a href={`/${locale}/contact?type=mini-audit`}>
              <span className="inline-flex items-center gap-2">
                {m.services.hero.cta}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </a>
          </Button>
        </div>
      </header>

      <section className="service-band brand-shell rounded-[1.75rem] px-5 py-6 sm:px-6 sm:py-7">
        <div className="mb-5 max-w-2xl">
          <h2 className="section-heading text-2xl text-white sm:text-[2rem]">{m.services.areas.title}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {m.services.areas.items.map((item, i) => {
            const Icon = areaIcons[i] ?? Globe2;
            return (
              <Card key={item.title} className="section-item services-grid-card h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[1.05rem] leading-6">
                    <span
                      aria-hidden
                      className="section-icon inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/12 text-primary"
                    >
                      <Icon size={18} />
                    </span>
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <div className="max-w-2xl">
          <h2 className="section-heading mb-2 text-2xl sm:text-[2rem]">{m.services.start.title}</h2>
        </div>
        <div className="process-timeline mt-6 grid gap-4 md:grid-cols-3">
          {m.services.start.steps.map((step, i) => {
            const Icon = startIcons[i] ?? Search;
            return (
              <Card key={step.title} className="process-step services-process-step h-full">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="services-step-badge inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <CardTitle className="flex items-center gap-2 text-[1.05rem] leading-6">
                        <span
                          aria-hidden
                          className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary"
                        >
                          <Icon size={18} />
                        </span>
                        {step.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="services-cta-panel brand-shell">
        <div className="max-w-2xl">
          <p className="services-eyebrow">Mini-audyt</p>
          <h2 className="section-heading mt-3 text-2xl text-white sm:text-[2rem]">
            {m.services.finalCta.title}
          </h2>
          <p className="services-hero-copy mt-3">{m.services.finalCta.description}</p>
        </div>
        <div className="mt-6">
          <Button asChild size="lg" className="group">
            <a href={`/${locale}/contact?type=mini-audit`}>
              <span className="inline-flex items-center gap-2">
                {m.services.finalCta.cta}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
