import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.cosrx.com' },
      { protocol: 'https', hostname: '**.laroche-posay.us' },
      { protocol: 'https', hostname: '**.anua.com' },
      { protocol: 'https', hostname: '**.sephora.com' },
      { protocol: 'https', hostname: '**.neutrogena.com' },
      { protocol: 'https', hostname: '**.paulaschoice.com' },
      { protocol: 'https', hostname: '**.cetaphil.com' },
      { protocol: 'https', hostname: '**.skin1004.com' },
      { protocol: 'https', hostname: '**.dr-g.com' },
      { protocol: 'https', hostname: '**.junoco.com' },
      { protocol: 'https', hostname: '**.theordinary.com' },
      { protocol: 'https', hostname: '**.differin.com' },
      { protocol: 'https', hostname: '**.dlclabs.com' },
      { protocol: 'https', hostname: '**.beautyofjoseon.com' },
      { protocol: 'https', hostname: '**.shopify.com' },
      { protocol: 'https', hostname: '**.amazon.com' },
    ],
  },
};

export default nextConfig;