import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
  },

  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [{ hostname: 'placehold.co' }, { hostname: 'localhost' }],
  },
};

export default nextConfig;
