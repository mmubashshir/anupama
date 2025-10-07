/**
 * Firebase Cloud Messaging Service Worker
 *
 * This script handles background push notifications.
 *
 * @version 2.0.0
 * @author Your Name
 */

// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js');

// --- Service Worker Lifecycle ---

/**
 * Forces the waiting service worker to become the active service worker.
 */
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(self.skipWaiting());
});

/**
 * Takes control of all open pages (clients) immediately upon activation.
 */
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(self.clients.claim());
});

// --- Firebase Initialization ---

/**
 * Creates a promise that resolves with the Firebase Messaging instance
 * after fetching the configuration and initializing the app.
 * This allows us to handle push events while the app is initializing.
 */
const firebaseReadyPromise = fetch('/api/firebase-config')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((firebaseConfig) => {
    firebase.initializeApp(firebaseConfig);
    console.log('Service Worker: Firebase app initialized.');
    return firebase.messaging();
  })
  .catch((error) => {
    console.error('Service Worker: Failed to initialize Firebase.', error);
    return null; // Ensure the promise chain doesn't break
  });

// --- Push Notification Handling ---

/**
 * Handles incoming push events. This listener is registered at the top level
 * to comply with browser requirements. It waits for Firebase to be ready
 * before processing the notification.
 */
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push event received.');

  // The Firebase SDK's onBackgroundMessage handler needs to be triggered.
  // We use `waitUntil` to keep the service worker alive until the async
  // operations are complete.
  event.waitUntil(
    firebaseReadyPromise.then(messaging => {
      if (!messaging) {
        return console.error("Firebase not initialized. Can't handle push.");
      }

      // The FCM SDK for web automatically handles displaying the notification
      // based on the payload. If you need custom logic, you can use
      // `messaging.onBackgroundMessage` but it's often not needed inside a
      // manual 'push' listener.
      // For full control, we can construct the notification from the push data.
      const payload = event.data ? event.data.json() : {};
      const notificationData = payload.data || {};

      const notificationTitle = notificationData.title || 'New Message';
      const notificationOptions = {
        body: notificationData.body || 'You have a new message.',
        icon: 'https://anupama.co.in/favicon.ico',
        badge: 'https://anupama.co.in/favicon-96x96.png',
        image: notificationData.imageUrl,
        tag: notificationData.tag || 'new-message',
        requireInteraction: true,
        data: {
          clickAction: notificationData.clickAction || '/',
        },
        actions: [{
          action: 'open',
          title: 'Open App',
        }, ],
      };

      return self.registration.showNotification(notificationTitle, notificationOptions);
    })
  );
});


// --- Notification Interaction Handling ---

/**
 * Handles clicks on notifications.
 */
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked.', event.notification.tag);

  event.notification.close();

  const targetUrl = event.notification.data?.clickAction || '/';

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((clientList) => {
      // Check if a window is already open and focus it.
      for (const client of clientList) {
        if (new URL(client.url).pathname === new URL(targetUrl, self.location.origin).pathname) {
          return client.focus();
        }
      }
      // Otherwise, open a new window.
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    }),
  );
});
