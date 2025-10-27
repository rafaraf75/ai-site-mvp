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
  params: Promise<{ locale: string }>;
}) {
  const {locale} = await params;
  const messages = (await import(`../../locales/${locale}.json`)).default as any;
  const t = (key: string) =>
    key.split(".").reduce((acc: any, k: string) => (acc ? acc[k] : undefined), messages);

  return (
    <main className="">
      <Hero
        title={t("home.heading")}
        subtitle={t("home.subheading")}
        ctaDemo={{label: messages.home.ctaDemo, href: `/${locale}/services`}}
        ctaCall={{label: messages.home.ctaCall, href: `/${locale}/contact`}}
      />

      <Benefits title={t("home.benefitsTitle") as string} items={messages.home.benefits} />

      <ServicesPreview
        title={messages.servicesPreview.title}
        ctaLabel={messages.servicesPreview.cta}
        cards={[
          {
            title: messages.servicesPreview.ai.title,
            desc: messages.servicesPreview.ai.desc,
            href: `/${locale}/services#ai`,
            icon: "bot",
          },
          {
            title: messages.servicesPreview.web.title,
            desc: messages.servicesPreview.web.desc,
            href: `/${locale}/services#web`,
            icon: "web",
          },
        ]}
      />

      <Cases title={messages.cases.title} items={messages.cases.items} />
      <Testimonials title={messages.testimonials.title} items={messages.testimonials.items} />

      <Pricing title={messages.pricing.title} plans={messages.pricing.plans} locale={locale} />
      <FAQ title={messages.faq.title} items={messages.faq.items} />

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
