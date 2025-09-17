import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().optional(),
    NEXT_PUBLIC_WORDPRESS_BASE_URL: z.string().optional(),
    NEXT_PUBLIC_MODE: z.enum(['staging', 'production']).optional(),
    NEXT_PUBLIC_GOOGLE_ANALYTICS: z.string().optional(),
    NEXT_PUBLIC_CLARITY_PROJECT_ID: z.string().optional(),
    NEXT_PUBLIC_FIREBASE_API_KEY: z.string().optional(),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().optional(),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().optional(),
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().optional(),
    NEXT_PUBLIC_FIREBASE_APP_ID: z.string().optional(),
    NEXT_PUBLIC_FIREBASE_VAPID_KEY: z.string().optional(),
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().optional(),
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().optional(),
  },
  server: {
    FIREBASE_CLIENT_EMAIL: z.string().email(),
    FIREBASE_PRIVATE_KEY: z
      .string()
      .regex(
        /^-----BEGIN PRIVATE KEY-----[\s\S]+-----END PRIVATE KEY-----\s*$/,
        'Invalid Firebase private key format',
      )
      .transform((key) => key.replace(/\\n/g, '\n')),
    // Replaces `\n` literal which is in string format from env file with actual \n (break line)
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_WORDPRESS_BASE_URL: process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL,
    NEXT_PUBLIC_MODE: process.env.NEXT_PUBLIC_MODE,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    NEXT_PUBLIC_CLARITY_PROJECT_ID: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_VAPID_KEY: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
});
