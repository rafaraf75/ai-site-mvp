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
        // redirect każdy path bez prefiksu języka na /pl/...
        source: '/((?!pl|en|es).*)',
        destination: '/pl/$1',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
