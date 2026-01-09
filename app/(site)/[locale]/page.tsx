import LangSwitcher from "@/components/common/LangSwitcher";
import ThemeToggle from "@/components/common/ThemeToggle";
import Hero from "@/components/sections/Hero";
import Benefits from "@/components/sections/Benefits";
import ServicesPreview from "@/components/sections/ServicesPreview";
import Cases from "@/components/sections/Cases";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";

type BenefitItem = { title: string; desc: string };
type ServicePreview = { title: string; desc: string };
type CaseItem = { label: string; value: string; desc: string };
type TestimonialItem = { quote: string; author: string; role: string };
type PricingPlan = {
  name: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  highlight?: boolean;
};
type FaqItem = { q: string; a: string };

type Messages = {
  home: {
    heading: string;
    subheading: string;
    ctaDemo: string;
    ctaCall: string;
    benefitsTitle: string;
    benefits: BenefitItem[];
    changeLanguage: string;
  };
  servicesPreview: {
    title: string;
    cta: string;
    ai: ServicePreview;
    web: ServicePreview;
  };
  cases: { title: string; items: CaseItem[] };
  testimonials: { title: string; items: TestimonialItem[] };
  pricing: { title: string; plans: PricingPlan[] };
  faq: { title: string; items: FaqItem[] };
};

export default async function HomeLocale({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = (await import(`@/locales/${locale}.json`)).default as Messages;

  return (
    <main className="">
      <Hero
        title={messages.home.heading}
        subtitle={messages.home.subheading}
        ctaDemo={{label: messages.home.ctaDemo, href: `/${locale}/services`}}
        ctaCall={{label: messages.home.ctaCall, href: `/${locale}/contact`}}
      />

      <Benefits title={messages.home.benefitsTitle} items={messages.home.benefits} />

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
      <Testimonials
        title={messages.testimonials.title}
        items={messages.testimonials.items}
      />

      <Pricing title={messages.pricing.title} plans={messages.pricing.plans} locale={locale} />
      <FAQ title={messages.faq.title} items={messages.faq.items} />

      <section className="py-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-3">
          <div>
            <small>{messages.home.changeLanguage}:</small>
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
