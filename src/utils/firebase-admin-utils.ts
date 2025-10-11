import 'server-only';

import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';

import { env } from '~/env';

import type { ServiceAccount } from 'firebase-admin/app';

/**
 * Singelton firebase instance
 */
const hasValidPrivateKey =
  Boolean(env.FIREBASE_PRIVATE_KEY) &&
  !env.FIREBASE_PRIVATE_KEY.includes('LOCAL_DEV_PRIVATE_KEY');

const isFirebaseConfigured =
  Boolean(env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) &&
  Boolean(env.FIREBASE_CLIENT_EMAIL) &&
  hasValidPrivateKey;

const firebaseApp = (() => {
  if (!isFirebaseConfigured) {
    return undefined;
  }

  if (!getApps().length) {
    const app = initializeApp({
      credential: cert({
        projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: env.FIREBASE_PRIVATE_KEY,
      } satisfies ServiceAccount),
    });

    return app;
  }

  return getApp();
})();

const firestoreDb = firebaseApp ? getFirestore(firebaseApp) : undefined;
const firebaseMessaging = firebaseApp ? getMessaging(firebaseApp) : undefined;

export { firebaseMessaging, firestoreDb, isFirebaseConfigured };
