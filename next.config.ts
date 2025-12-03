import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pl',
        permanent: false,
      },
      {
        source: '/services',
        destination: '/pl/services',
        permanent: false,
      },
      {
        source: '/contact',
        destination: '/pl/contact',
        permanent: false,
      },
      {
        // redirect kazdy path bez prefiksu jezyka na /pl/... z wylaczeniem API i zasobow Next
        source:
          '/((?!api|_next/static|_next/image|_next/data|_next|pl|en|es|favicon.ico|robots.txt|sitemap.xml).*)',
        destination: '/pl/$1',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
