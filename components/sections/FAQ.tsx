export default function FAQ({
  title,
  items,
}: {
  title: string;
  items: Array<{q: string; a: string}>;
}) {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="section-heading mb-6 text-2xl sm:text-[2rem]">{title}</h2>
        </div>
        <div className="space-y-3">
          {items.map((it, i) => (
            <details
              key={i}
              className="faq-item group rounded-2xl border border-l-[3px] border-l-[hsl(var(--primary)/0.48)] p-4 text-card-foreground"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1.02rem] font-semibold leading-6">
                <span>{it.q}</span>
                <span
                  aria-hidden
                  className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.12)] text-primary transition-transform group-open:rotate-180"
                >
                  ▾
                </span>
              </summary>
              <div className="mt-3 text-sm leading-7 text-muted-foreground dark:text-[hsl(var(--muted-foreground))]">{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
