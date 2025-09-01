importScripts(
  'https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js',
);

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

      const notificationTitle = payload.notification?.title || 'New Message';
      const notificationOptions = {
        body: payload.notification?.body || 'You have a new message',
        icon: payload.notification?.icon || '/favicon.ico',
        badge: '/favicon-96x96.png',
        tag: 'notification-tag',
        requireInteraction: true,
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
    // Fallback configuration or throw error
    throw new Error('Unable to load Firebase configuration');
  }
})();

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked: ', event);

  event.notification.close();

  // Open the app when notification is clicked
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Check if app is already open
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      // If app is not open, open it
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    }),
  );
});
