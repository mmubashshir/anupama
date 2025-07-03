import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: 'placehold.co' },
      { hostname: 'localhost' },
      { hostname: 'wordpress.anupama.co.in' },
    ],
  },
};

export default nextConfig;
