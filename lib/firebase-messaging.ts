/**
 * Firebase Cloud Messaging — web push subscription logic.
 *
 * Usage: call `subscribeToNotifications()` after successful user auth.
 * Requires the `firebase` package: npm install firebase
 */

let messagingInstance: import('firebase/messaging').Messaging | null = null;

/**
 * Lazily initialise the Firebase app + Messaging module.
 * Runs only in the browser (not during SSR).
 */
async function getMessaging() {
  if (typeof window === 'undefined') return null;
  if (messagingInstance) return messagingInstance;

  const { initializeApp, getApps } = await import('firebase/app');
  const { getMessaging: fbGetMessaging } = await import('firebase/messaging');

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  };

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  messagingInstance = fbGetMessaging(app);
  return messagingInstance;
}

/**
 * Request notification permission and return the FCM token.
 * Call this after the user opts in or after successful auth.
 *
 * Returns the FCM token string, or null if permission was denied
 * or the browser doesn't support push.
 */
export async function subscribeToNotifications(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  if (!('Notification' in window)) return null;
  if (!('serviceWorker' in navigator)) return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return null;

    const messaging = await getMessaging();
    if (!messaging) return null;

    const { getToken } = await import('firebase/messaging');

    const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

    if (!vapidKey) {
      console.warn('[FCM] VAPID key not configured.');
      return null;
    }

    const swReg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: swReg,
    });

    return token || null;
  } catch (err) {
    console.error('[FCM] Failed to get push token:', err);
    return null;
  }
}

/**
 * Listen for foreground messages (when the app is open).
 * Pass a callback to handle incoming payloads.
 */
export async function onForegroundMessage(
  callback: (payload: import('firebase/messaging').MessagePayload) => void
): Promise<() => void> {
  const messaging = await getMessaging();
  if (!messaging) return () => {};

  const { onMessage } = await import('firebase/messaging');
  return onMessage(messaging, callback);
}
