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
  webpack: (config) => {
    // Required for react-pdf to work properly
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- webpack config is not typed
    config.resolve.alias.canvas = false;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- webpack config is not typed
    return config;
  },
};

export default nextConfig;
