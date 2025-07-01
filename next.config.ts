import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
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
