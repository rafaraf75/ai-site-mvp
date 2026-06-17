import ContactForm, {type ContactFormMessages} from "@/components/sections/ContactForm";

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const messages = (await import(`@/locales/${locale}.json`)).default as {
    contactPage: {
      title: string;
      description: string;
    };
    contactForm: ContactFormMessages;
  };

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
        </div>
      </div>
    </section>
  );
}

export const dynamic = 'force-dynamic';
