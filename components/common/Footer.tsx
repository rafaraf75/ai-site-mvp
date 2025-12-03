import Link from 'next/link';

type Labels = {
  rights: string;
  privacy: string;
  social: string;
};

export default function Footer({ labels, locale }: { labels: Labels; locale: string }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t mt-10" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          (c) {year} RafLab. {labels.rights}
        </p>
        <div className="flex items-center gap-4">
          <Link href={`/${locale}/privacy`} className="text-sm hover:underline">
            {labels.privacy}
          </Link>
          <nav aria-label={labels.social} className="flex items-center gap-3">
            <Link
              href="https://www.facebook.com/Rafal.webproexpert"
              aria-label="Facebook"
              className="text-sm hover:underline"
              target="_blank"
              rel="noreferrer noopener"
            >
              Facebook
            </Link>
            <Link
              href="https://github.com/rafaraf75"
              aria-label="GitHub"
              className="text-sm hover:underline"
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
