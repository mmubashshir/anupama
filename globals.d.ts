declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GOOGLE_ANALYTICS: string | undefined;
      NEXT_PUBLIC_CLARITY_PROJECT_ID: string | undefined;
      NEXT_PUBLIC_MODE: 'staging' | 'production' | undefined;
    }
  }
}

export {};
