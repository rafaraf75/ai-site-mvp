import ContactForm from "@/components/sections/ContactForm";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const {locale} = await params;
  const messages = (await import(`../../../locales/${locale}.json`)).default as { nav: { contact: string } };
  return (
    <section className="py-8">
      <h1 className="text-2xl font-semibold">{messages.nav.contact}</h1>
      <p className="text-muted-foreground mt-2 max-w-2xl">
        Napisz do nas, a wrócimy z odpowiedzią.
      </p>
      <div className="mt-6">
        <ContactForm locale={locale} />
      </div>
    </section>
  );
}

export const dynamic = 'force-dynamic';

