import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
  },
  devIndicators: false,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: 'placehold.co' },
      { hostname: 'localhost' },
      { hostname: '*.anupama.co.in' },
    ],
  },
};

export default nextConfig;
