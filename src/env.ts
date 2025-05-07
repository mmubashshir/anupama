import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS: z.string().optional(),
    NEXT_PUBLIC_CLARITY_PROJECT_ID: z.string().optional(),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    NEXT_PUBLIC_CLARITY_PROJECT_ID: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
  },
});
