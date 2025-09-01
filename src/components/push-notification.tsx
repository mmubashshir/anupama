'use client';

import { useEffect, useState } from 'react';
import { registerFcmToken } from '~/app/actions/register-fcm-token ';
import { LocalStorageKeys } from '~/constants/local-storage-keys';
import { getToken } from 'firebase/messaging';
import { toast } from 'react-hot-toast';

import { env } from '~/env';

import NotificationPermissionPrompt from './notification-permission-prompt';

const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
const NOTIFICATION_TIMEOUT = 1;

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

  return (
    <NotificationPermissionPrompt
      open={shouldShowPrompt}
      loading={requestingPermission}
      onAllow={handleOnAllow}
      onLater={() => {
        setShouldShowPrompt(false);
      }}
    />
  );
}
