import { withPayload } from '@payloadcms/next/withPayload';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
  },
};

export default withPayload(nextConfig);
