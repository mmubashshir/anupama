importScripts(
  'https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js',
);

// Immediately install this   service worker without waiting for old service worker to uninstall
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

// Immediately take control of page after installing
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});


(async () => {
  try {
    const response = await fetch('/api/firebase-config');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const firebaseConfig = await response.json();
    firebase.initializeApp(firebaseConfig);

    // Retrieve firebase messaging
    const messaging = firebase.messaging();

    // Handle background messages
    messaging.onBackgroundMessage((payload) => {
      console.log('Received background message: ', payload);

      const notificationTitle = payload?.data?.title || 'New Message';
      const notificationOptions = {
        body: `${payload?.data?.title}....` || 'New Message',
        icon: 'https://anupama.co.in/favicon.ico', // small app icon
        badge: 'https://anupama.co.in/favicon-96x96.png', // Android badge
        image: payload?.data?.imageUrl,
        tag: payload?.messageId ?? payload?.data?.title ?? 'New Message',
        requireInteraction: true,
        data: {
          clickAction: payload?.data?.clickAction,
        },

        actions: [
          {
            action: 'open',
            title: 'Open App',
          },
        ],
      };

      self.registration.showNotification(
        notificationTitle,
        notificationOptions,
      );
    });
  } catch (error) {
    console.error('Failed to load Firebase config:', error);
  }
})();

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked: ', event);

  event.notification.close();

  // Open the app when notification is clicked
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      const targetUrl = event.notification.data?.clickAction || '/';

      // Check if app is already open
      for (const client of clientList) {
        if (client.url.startsWith(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      // If app is not open, open it
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    }),
  );
});
