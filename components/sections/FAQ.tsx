export default function FAQ({
  title,
  items,
}: {
  title: string;
  items: Array<{q: string; a: string}>;
}) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        <div className="space-y-3">
          {items.map((it, i) => (
            <details key={i} className="group rounded-md border p-4 bg-card text-card-foreground">
              <summary className="cursor-pointer list-none font-medium flex items-center justify-between">
                <span>{it.q}</span>
                <span
                  aria-hidden
                  className="transition-transform group-open:rotate-180 text-muted-foreground"
                >
                  ▾
                </span>
              </summary>
              <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

