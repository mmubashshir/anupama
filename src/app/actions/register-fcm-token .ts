'use server';

import { POST_CREATED_TOPIC } from '~/constants/fcm';
import { getMessaging } from 'firebase-admin/messaging';

export async function registerFcmToken(token: string): Promise<boolean> {
  console.log('token is', token);

  const subscriptionStatus = await getMessaging().subscribeToTopic(
    token,
    POST_CREATED_TOPIC,
  );

  if (subscriptionStatus.failureCount > 0) {
    console.error('Error subscribing to topic:', subscriptionStatus.errors);

    return false;
  }

  return true;
}
