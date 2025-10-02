import 'server-only';

import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';

import { env } from '~/env';

import type { ServiceAccount } from 'firebase-admin/app';

/**
 * Singelton firebase instance
 */
const serviceAccount: ServiceAccount = {
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
  privateKey: env.FIREBASE_PRIVATE_KEY,
} as const;

const firebaseApp = (() => {
  if (!getApps().length) {
    const app = initializeApp({
      credential: cert(serviceAccount),
    });

    return app;
  }

  return getApp();
})();

const firestoreDb = getFirestore(firebaseApp);
const firebaseMessaging = getMessaging(firebaseApp);

export { firebaseMessaging, firestoreDb };
