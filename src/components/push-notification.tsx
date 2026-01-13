'use client';

import { useEffect, useState } from 'react';
import * as Sentry from '@sentry/nextjs';
import { registerFcmToken } from '~/app/actions/register-fcm-token ';
import { LocalStorageKeys } from '~/constants/local-storage-keys';
import { getToken, onMessage } from 'firebase/messaging';
import { toast } from 'react-hot-toast';

import { env } from '~/env';

import NotificationPermissionPrompt from './notification-permission-prompt';

const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
const NOTIFICATION_TIMEOUT = 7; // Ask notification prompt every 7 days if permisson denied

export default function PushNotifications() {
  const [shouldShowPrompt, setShouldShowPrompt] = useState(false);
  const [requestingPermission, setRequestingPermission] = useState(false);

  useEffect(() => {
    initPushNotifications();
  }, []);

  function initPushNotifications() {
    if (!('Notification' in window)) {
      return;
    }

    if (Notification.permission === 'granted') {
      navigator.serviceWorker
        .getRegistration('/')
        .then(async (existingRegistration) => {
          if (!existingRegistration) {
            await navigator.serviceWorker.register(
              '/firebase-messaging-sw.js',
              {
                scope: '/',
              },
            );

            return;
          }

          return;
          // return existingRegistration.update();
        })
        .then(async () => {
          const { messaging } = await import('~/utils/fcm-messaging');

          onMessage(messaging, (payload) => {
            const title = payload.data?.title ?? 'Notification title';

            // eslint-disable-next-line no-console -- Wanted to check issue in firebase foreground notification handler
            console.info(
              'recived notification in foreground with payload',
              title,
            );

            const notificationOptions = {
              body: `${payload.data?.title ?? 'New Message'}....`,
              icon: 'https://anupama.co.in/favicon.ico', // small app icon
              badge: 'https://anupama.co.in/favicon-96x96.png', // Android badge
              image: payload.data?.imageUrl,
              tag: payload.messageId,
              requireInteraction: true,
              data: {
                clickAction: payload.data?.clickAction,
              },
            };

            // eslint-disable-next-line @typescript-eslint/no-unused-vars -- In future this variable is used to attach on click listener
            const notification = new Notification(title, notificationOptions);
          });
        })
        .catch((error) => {
          Sentry.captureException(error, {
            tags: { area: 'push-notifications' },
            extra: { context: 'Service worker registration failed' },
          });
        });

      return;
    }

    if (Notification.permission === 'denied') {
      return;
    }

    const lastNotificationShownOn = localStorage.getItem(
      LocalStorageKeys.LAST_NOTIFICATION_PROMPT_SHOWN_TIME,
    );
    const now = Date.now();
    const difference = now - Number(lastNotificationShownOn);
    const daysSinceLastNotification = Math.floor(
      difference / ONE_DAY_IN_MILLISECONDS,
    );

    if (daysSinceLastNotification < NOTIFICATION_TIMEOUT) {
      return;
    }

    setTimeout(() => {
      setShouldShowPrompt(true);
    }, 6000);
  }

  async function handleOnAllow() {
    const now = Date.now();

    localStorage.setItem(
      LocalStorageKeys.LAST_NOTIFICATION_PROMPT_SHOWN_TIME,
      String(now),
    );
    setRequestingPermission(true);

    const permission = await Notification.requestPermission();

    setRequestingPermission(false);
    setShouldShowPrompt(false);

    if (permission === 'denied' || permission === 'default') {
      toast.error(
        'You have denied notification permissions. You can enable them in your browser settings if you change your mind.',
        { position: 'bottom-right', removeDelay: 5000 },
      );

      return;
    }

    await (async () => {
      const existingRegistration =
        await navigator.serviceWorker.getRegistration('/');

      if (existingRegistration) return existingRegistration;

      const newRegistration = await navigator.serviceWorker.register(
        '/firebase-messaging-sw.js',
        {
          scope: '/',
        },
      );

      return newRegistration;
    })();

    await navigator.serviceWorker.ready;

    const { messaging } = await import('~/utils/fcm-messaging');

    const token = await getToken(messaging, {
      vapidKey: env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    await registerFcmToken(token);

    toast.success('You have successfully enabled notifications.', {
      position: 'bottom-right',
      removeDelay: 5000,
    });
  }

  function handleOnLaterClick() {
    const now = Date.now();

    localStorage.setItem(
      LocalStorageKeys.LAST_NOTIFICATION_PROMPT_SHOWN_TIME,
      String(now),
    );
    setRequestingPermission(false);
    setShouldShowPrompt(false);
  }

  return (
    <NotificationPermissionPrompt
      open={shouldShowPrompt}
      loading={requestingPermission}
      onAllow={handleOnAllow}
      onLater={handleOnLaterClick}
    />
  );
}
