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
    <section className="py-8">
      <h1 className="text-2xl font-semibold">{messages.contactPage.title}</h1>
      <p className="text-muted-foreground mt-2 max-w-2xl">{messages.contactPage.description}</p>
      <div className="mt-6">
        <ContactForm locale={locale} messages={messages.contactForm} />
      </div>
    </section>
  );
}

export const dynamic = 'force-dynamic';
