import {Button} from "@/components/ui/button";
import ContactForm, {type ContactFormMessages} from "@/components/sections/ContactForm";
import {buildWhatsAppHref, getWhatsAppBaseUrl} from "@/lib/whatsapp";

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const messages = (await import(`@/locales/${locale}.json`)).default as {
    contactPage: {
      title: string;
      description: string;
    };
    contactForm: ContactFormMessages;
    whatsapp: {
      ariaLabel: string;
      contactIntro: string;
      contactText: string;
      contactCta: string;
      prefilledMessage: string;
    };
  };
  const whatsappHref = buildWhatsAppHref(
    getWhatsAppBaseUrl(),
    messages.whatsapp.prefilledMessage,
  );

  return (
    <section className="space-y-8 py-8">
      <header className="contact-hero brand-shell">
        <div className="max-w-3xl">
          <p className="services-eyebrow">RafLab</p>
          <h1 className="page-heading mt-3 text-2xl text-white md:text-3xl">
            {messages.contactPage.title}
          </h1>
          <p className="services-hero-copy mt-3 max-w-2xl">{messages.contactPage.description}</p>
        </div>
      </header>

      <div className="contact-shell max-w-4xl">
        <div className="contact-form-panel">
          <ContactForm locale={locale} messages={messages.contactForm} />
          {whatsappHref ? (
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-sm font-semibold text-white">{messages.whatsapp.contactIntro}</p>
              <p className="contact-form-hint mt-2 text-sm">{messages.whatsapp.contactText}</p>
              <div className="mt-4">
                <Button asChild size="lg" variant="secondary" className="group min-w-[15rem]">
                  <a
                    href={whatsappHref}
                    aria-label={messages.whatsapp.ariaLabel}
                    title={messages.whatsapp.ariaLabel}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{messages.whatsapp.contactCta}</span>
                  </a>
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export const dynamic = 'force-dynamic';
