import Script from 'next/script';

export default function ThemeScript() {
  const noFlash = `(() => {
    try {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = stored ? stored : (prefersDark ? 'dark' : 'light');
      const root = document.documentElement;
      if (theme === 'dark') root.classList.add('dark');
      else root.classList.remove('dark');
      root.style.colorScheme = theme;
    } catch (_) {}
  })();`;
  return (
    <Script id="theme-noflash" strategy="beforeInteractive">
      {noFlash}
    </Script>
  );
}

