import Hero from "@/components/sections/Hero";
import MiniAudit from "@/components/sections/MiniAudit";
import Benefits from "@/components/sections/Benefits";
import ServicesPreview from "@/components/sections/ServicesPreview";
import ProjectStatus from "@/components/sections/ProjectStatus";
import FAQ from "@/components/sections/FAQ";

type BenefitItem = { title: string; desc: string };
type ServicePreview = { title: string; desc: string };
type FaqItem = { q: string; a: string };
type ProjectStatusStep = { title: string; desc: string };

type Messages = {
  home: {
    heading: string;
    subheading: string;
    localLine: string;
    ctaPrimary: string;
    ctaSecondary: string;
    miniAudit: {
      eyebrow: string;
      title: string;
      description: string;
      checklist: string[];
      note: string;
      cta: string;
    };
    benefitsTitle: string;
    benefitsSubtitle: string;
    benefits: BenefitItem[];
    projectStatus: {
      eyebrow: string;
      title: string;
      description: string;
      steps: ProjectStatusStep[];
      note: string;
      cta: string;
    };
  };
  servicesPreview: {
    title: string;
    subtitle: string;
    cta: string;
    items: ServicePreview[];
  };
  faq: { title: string; items: FaqItem[] };
};

export default async function HomeLocale({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = (await import(`@/locales/${locale}.json`)).default as Messages;
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim();

  return (
    <main className="">
      <Hero
        title={messages.home.heading}
        subtitle={messages.home.subheading}
        localLine={messages.home.localLine}
        primaryCta={{label: messages.home.ctaPrimary, href: `/${locale}/contact?type=mini-audit`}}
        secondaryCta={
          whatsappUrl
            ? {
                label: messages.home.ctaSecondary,
                href: whatsappUrl,
                external: true,
              }
            : undefined
        }
      />

      <MiniAudit
        eyebrow={messages.home.miniAudit.eyebrow}
        title={messages.home.miniAudit.title}
        description={messages.home.miniAudit.description}
        checklist={messages.home.miniAudit.checklist}
        note={messages.home.miniAudit.note}
        cta={{label: messages.home.miniAudit.cta, href: `/${locale}/contact?type=mini-audit`}}
      />

      <Benefits
        title={messages.home.benefitsTitle}
        subtitle={messages.home.benefitsSubtitle}
        items={messages.home.benefits}
      />

      <ServicesPreview
        title={messages.servicesPreview.title}
        subtitle={messages.servicesPreview.subtitle}
        ctaLabel={messages.servicesPreview.cta}
        cards={messages.servicesPreview.items.map((item, index) => ({
          title: item.title,
          desc: item.desc,
          href: `/${locale}/contact?type=mini-audit`,
          icon: index % 2 === 0 ? "web" : "bot",
        }))}
      />

      <ProjectStatus
        eyebrow={messages.home.projectStatus.eyebrow}
        title={messages.home.projectStatus.title}
        description={messages.home.projectStatus.description}
        steps={messages.home.projectStatus.steps}
        note={messages.home.projectStatus.note}
        cta={{label: messages.home.projectStatus.cta, href: `/${locale}/contact?type=mini-audit`}}
      />
      <FAQ title={messages.faq.title} items={messages.faq.items} />
    </main>
  );
}
