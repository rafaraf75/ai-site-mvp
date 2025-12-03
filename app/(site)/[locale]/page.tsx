import LangSwitcher from "@/components/common/LangSwitcher";
import ThemeToggle from "@/components/common/ThemeToggle";
import Hero from "@/components/sections/Hero";
import Benefits from "@/components/sections/Benefits";
import ServicesPreview from "@/components/sections/ServicesPreview";
import Cases from "@/components/sections/Cases";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";

export default async function HomeLocale({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = (await import(`@/locales/${locale}.json`)).default as Record<string, unknown>;
  const getFrom = (obj: unknown, path: string): unknown => {
    return path.split('.').reduce<unknown>((acc, key) => {
      if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj);
  };
  const t = (key: string): string => {
    const v = getFrom(messages, key);
    return typeof v === 'string' ? v : String(v ?? '');
  };

  return (
    <main className="">
      <Hero
        title={t("home.heading")}
        subtitle={t("home.subheading")}
        ctaDemo={{label: (messages as any).home.ctaDemo, href: `/${locale}/services`}}
        ctaCall={{label: (messages as any).home.ctaCall, href: `/${locale}/contact`}}
      />

      <Benefits title={t("home.benefitsTitle") as string} items={(messages as any).home.benefits} />

      <ServicesPreview
        title={(messages as any).servicesPreview.title}
        ctaLabel={(messages as any).servicesPreview.cta}
        cards={[
          {
            title: (messages as any).servicesPreview.ai.title,
            desc: (messages as any).servicesPreview.ai.desc,
            href: `/${locale}/services#ai`,
            icon: "bot",
          },
          {
            title: (messages as any).servicesPreview.web.title,
            desc: (messages as any).servicesPreview.web.desc,
            href: `/${locale}/services#web`,
            icon: "web",
          },
        ]}
      />

      <Cases title={(messages as any).cases.title} items={(messages as any).cases.items} />
      <Testimonials
        title={(messages as any).testimonials.title}
        items={(messages as any).testimonials.items}
      />

      <Pricing title={(messages as any).pricing.title} plans={(messages as any).pricing.plans} locale={locale} />
      <FAQ title={(messages as any).faq.title} items={(messages as any).faq.items} />

      <section className="py-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-3">
          <div>
            <small>{t("home.changeLanguage") as string}:</small>
            <div className="mt-2">
              <LangSwitcher />
            </div>
          </div>
          <div>
            <small>Motyw:</small>
            <div className="mt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
