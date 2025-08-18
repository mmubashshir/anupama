'use client';

import { useEffect } from 'react';
import OneSignal from 'react-onesignal';

import { env } from '~/env';

export default function PushNotifications() {
  useEffect(() => {
    const initOneSignal = async () => {
      const appId = env.NEXT_PUBLIC_ONESIGNAL_APP_ID;

      if (!appId) {
        console.warn('OneSignal App ID not found');

        return;
      }

      try {
        await OneSignal.init({
          appId,
          allowLocalhostAsSecureOrigin: true,
          notifyButton: {
            enable: true,
            prenotify: true,
            showCredit: false,
            text: {
              'tip.state.unsubscribed': 'ಸೂಚನೆಗಳಿಗೆ ಸಬ್‌ಸ್ಕ್ರೈಬ್',
              'tip.state.subscribed': 'ನೀವು ಸಬ್‌ಸ್ಕ್ರೈಬ್ ಮಾಡಿದ್ದೀರಿ',
              'tip.state.blocked': 'ನೀವು ಸೂಚನೆಗಳನ್ನು ಬ್ಲಾಕ್ ಮಾಡಿದ್ದೀರಿ',
              'message.prenotify': 'ಸೂಚನೆಗಳಿಗೆ ಸಬ್‌ಸ್ಕ್ರೈಬ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
              'message.action.subscribed': 'ಸಬ್‌ಸ್ಕ್ರೈಬ್ ಮಾಡಿದಕ್ಕೆ ಧನ್ಯವಾದ',
              'message.action.subscribing': 'ಸಬ್‌ಸ್ಕ್ರೈಬ್ ಆಗುತ್ತಿದೆ...',
              'message.action.resubscribed':
                'ಮತ್ತೆ ಸಬ್‌ಸ್ಕ್ರೈಬ್ ಮಾಡಿದಕ್ಕೆ ಧನ್ಯವಾದ',
              'message.action.unsubscribed': 'ಅನ್‌ಸಬ್‌ಸ್ಕ್ರೈಬ್ ಮಾಡಲಾಗಿದೆ',
              'dialog.main.title': 'ಸೂಚನೆ ಆಯ್ಕೆಗಳು',
              'dialog.main.button.subscribe': 'ಸಬ್‌ಸ್ಕ್ರೈಬ್',
              'dialog.main.button.unsubscribe': 'ಅನ್‌ಸಬ್‌ಸ್ಕ್ರೈಬ್',
              'dialog.blocked.title': 'ಸೂಚನೆ ಬ್ಲಾಕ್ ತೆಗೆದುಹಾಕಿ',
              'dialog.blocked.message':
                'ಸೂಚನೆಗಳನ್ನು ಅನುಮತಿಸಲು ಈ ಹಂತಗಳನ್ನು ಮಾಡಿ:',
            },
          },
          autoRegister: true,
        });
      } catch (error) {
        console.error('Failed to initialize OneSignal:', error);
      }
    };

    void initOneSignal();
  }, []);

  return null;
}
