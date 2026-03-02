import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Prefer values from env, fallback to provided Firebase project config.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCxguLep-pwr7orZ_-RvwF4k08KhwdDbQs',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'aashutosh-ai-builder-123.firebaseapp.com',
  databaseURL:
    import.meta.env.VITE_FIREBASE_DATABASE_URL ||
    'https://aashutosh-ai-builder-123-default-rtdb.firebaseio.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'aashutosh-ai-builder-123',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'aashutosh-ai-builder-123.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '865169890427',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:865169890427:web:923e5746de6a1c248ed6de',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-0LHKTS76TR',
};

const hasFirebaseConfig = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);

export const firebaseApp = hasFirebaseConfig
  ? (getApps()[0] ?? initializeApp(firebaseConfig))
  : null;

export const auth = firebaseApp ? getAuth(firebaseApp) : null;
export const db = firebaseApp ? getFirestore(firebaseApp) : null;

export let analytics: ReturnType<typeof getAnalytics> | null = null;

if (firebaseApp && typeof window !== 'undefined') {
  void isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(firebaseApp);
    }
  });
}

export { hasFirebaseConfig };
