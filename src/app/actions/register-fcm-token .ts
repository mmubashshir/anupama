'use server';

import 'server-only';

import {
  FCM_TOPIC_SUBSCRIPTION_COLLECTION,
  POST_CREATED_TOPIC,
} from '~/constants/firebase';
import { FieldValue } from 'firebase-admin/firestore';

import { firebaseMessaging, firestoreDb } from '~/utils/firebase-admin-utils';
import { tryCatch } from '~/utils/try-catch';

interface FirestoreDBNotificationData {
  fcmToken: string;
  topicsSubscribed: string[];
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export async function registerFcmToken(token: string): Promise<boolean> {
  if (!token) {
    console.error('firebase messaging token not found');

    return false;
  }

  const subscriptionStatus = await firebaseMessaging.subscribeToTopic(
    token,
    POST_CREATED_TOPIC,
  );

  if (subscriptionStatus.failureCount > 0) {
    console.error('Error subscribing to topic:', subscriptionStatus.errors);

    return false;
  }

  const dataToWrite = {
    fcmToken: token,
    topicsSubscribed: [POST_CREATED_TOPIC],
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  } as const satisfies FirestoreDBNotificationData;

  const { data: _data, error } = await tryCatch(
    firestoreDb
      .collection(FCM_TOPIC_SUBSCRIPTION_COLLECTION)
      .doc(token)
      .set(dataToWrite),
  );

  if (error) {
    console.error(
      'Failed to store user subscription status failed with errror',
      JSON.stringify(error),
    );

    return false;
  }

  // eslint-disable-next-line no-console -- needed log in server side to check if its storing in db or not
  console.info(
    `User notification subscription entry sucessfully written to firestore db with  token ${token}`,
  );

  return true;
}
