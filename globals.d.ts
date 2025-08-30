declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MODE: 'staging' | 'production' | undefined;
      NEXT_PUBLIC_WORDPRESS_BASE_URL: string | undefined;
      NEXT_PUBLIC_SITE_URL: string | undefined;
      NEXT_PUBLIC_GOOGLE_ANALYTICS: string | undefined;
      NEXT_PUBLIC_CLARITY_PROJECT_ID: string | undefined;
      NEXT_PUBLIC_FIREBASE_API_KEY: string | undefined;
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string | undefined;
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: string | undefined;
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string | undefined;
      NEXT_PUBLIC_FIREBASE_APP_ID: string | undefined;
      NEXT_PUBLIC_FIREBASE_VAPID_KEY: string | undefined;
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string | undefined;
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string | undefined;
    }
  }
}

export { };
