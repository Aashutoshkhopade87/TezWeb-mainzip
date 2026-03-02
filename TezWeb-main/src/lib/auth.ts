import {
  RecaptchaVerifier,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPhoneNumber,
  type ConfirmationResult,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, hasFirebaseConfig } from './firebase';

export interface User {
  uid: string;
  phoneNumber?: string;
  email?: string;
  createdAt: string;
}

type LoginMethod = 'phone' | 'email';

interface OTPRequest {
  code: string;
  expiresAt: number;
  method: LoginMethod;
}

interface SendOTPOptions {
  recaptchaVerifier?: RecaptchaVerifier;
}

const OTP_STORAGE_KEY = 'pendingOtpRequests';
const EMAIL_FOR_SIGNIN_KEY = 'emailForSignIn';
const OTP_EXPIRY_MS = 5 * 60 * 1000;
const phoneConfirmations: Record<string, ConfirmationResult> = {};

const getPendingOTPRequests = (): Record<string, OTPRequest> => {
  const rawData = localStorage.getItem(OTP_STORAGE_KEY);
  if (!rawData) return {};

  try {
    return JSON.parse(rawData) as Record<string, OTPRequest>;
  } catch {
    return {};
  }
};

const savePendingOTPRequests = (requests: Record<string, OTPRequest>) => {
  localStorage.setItem(OTP_STORAGE_KEY, JSON.stringify(requests));
};

const buildUser = (uid: string, identifier: string, method: LoginMethod): User => ({
  uid,
  ...(method === 'phone' ? { phoneNumber: identifier } : { email: identifier.toLowerCase() }),
  createdAt: new Date().toISOString(),
});

const syncUserToFirebase = async (user: User) => {
  if (!hasFirebaseConfig || !db) return;

  try {
    await setDoc(
      doc(db, 'users', user.uid),
      {
        uid: user.uid,
        phoneNumber: user.phoneNumber || null,
        email: user.email || null,
        createdAt: user.createdAt,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Failed to sync user to Firebase:', error);
  }
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
};

// Save user to localStorage and Firebase
export const saveUser = (user: User): void => {
  localStorage.setItem('currentUser', JSON.stringify(user));
  void syncUserToFirebase(user);
};

// Clear user session
export const logout = (): void => {
  localStorage.removeItem('currentUser');
};

// Send OTP / login link by selected method.
export const sendOTP = async (
  identifier: string,
  method: LoginMethod = 'phone',
  options?: SendOTPOptions
): Promise<{ success: boolean; message: string; requiresOTP: boolean }> => {
  if (hasFirebaseConfig && auth) {
    if (method === 'phone') {
      if (!options?.recaptchaVerifier) {
        return { success: false, message: 'reCAPTCHA is not initialized.', requiresOTP: true };
      }

      const confirmation = await signInWithPhoneNumber(auth, identifier, options.recaptchaVerifier);
      phoneConfirmations[identifier] = confirmation;
      return { success: true, message: 'OTP sent successfully', requiresOTP: true };
    }

    const actionCodeSettings = {
      url: window.location.origin,
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, identifier, actionCodeSettings);
    localStorage.setItem(EMAIL_FOR_SIGNIN_KEY, identifier.toLowerCase());
    return {
      success: true,
      message: 'Login link sent to your email. Open it to complete sign in.',
      requiresOTP: false,
    };
  }

  // Fallback local OTP mode when Firebase config is missing.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const requests = getPendingOTPRequests();

  requests[identifier] = {
    code: otp,
    expiresAt: Date.now() + OTP_EXPIRY_MS,
    method,
  };

  savePendingOTPRequests(requests);
  console.log(`Fallback OTP for ${method} ${identifier}:`, otp);
  return { success: true, message: 'OTP sent successfully', requiresOTP: true };
};

// Verify OTP for phone login.
export const verifyOTP = async (
  identifier: string,
  otp: string,
  method: LoginMethod = 'phone'
): Promise<{ success: boolean; user?: User; message: string }> => {
  if (method === 'email' && hasFirebaseConfig && auth) {
    return { success: false, message: 'Use the email link sent to your inbox to login.' };
  }

  if (hasFirebaseConfig && auth && method === 'phone') {
    const confirmation = phoneConfirmations[identifier];
    if (!confirmation) {
      return { success: false, message: 'No OTP request found. Please resend OTP.' };
    }

    try {
      const credential = await confirmation.confirm(otp);
      const user = buildUser(credential.user.uid, identifier, 'phone');
      saveUser(user);
      delete phoneConfirmations[identifier];
      return { success: true, user, message: 'Login successful' };
    } catch {
      return { success: false, message: 'Invalid OTP' };
    }
  }

  // Fallback local OTP verification.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const requests = getPendingOTPRequests();
  const pendingRequest = requests[identifier];

  if (!pendingRequest || pendingRequest.method !== method) {
    return { success: false, message: 'No OTP request found. Please resend OTP.' };
  }

  if (Date.now() > pendingRequest.expiresAt) {
    delete requests[identifier];
    savePendingOTPRequests(requests);
    return { success: false, message: 'OTP expired. Please request a new OTP.' };
  }

  if (pendingRequest.code !== otp) {
    return { success: false, message: 'Invalid OTP' };
  }

  delete requests[identifier];
  savePendingOTPRequests(requests);
  const user = buildUser(`user-${identifier.toLowerCase().replace(/[^a-z0-9]/g, '')}`, identifier, method);
  saveUser(user);
  return { success: true, user, message: 'Login successful' };
};

// Complete Firebase email-link sign in, if current URL has a sign-in link.
export const completeEmailLinkLogin = async (): Promise<{ success: boolean; user?: User; message: string }> => {
  if (!hasFirebaseConfig || !auth) {
    return { success: false, message: 'Firebase config missing.' };
  }

  if (!isSignInWithEmailLink(auth, window.location.href)) {
    return { success: false, message: 'No email sign-in link in URL.' };
  }

  const email = localStorage.getItem(EMAIL_FOR_SIGNIN_KEY);
  if (!email) {
    return { success: false, message: 'Email not found. Please retry from same browser.' };
  }

  try {
    const credential = await signInWithEmailLink(auth, email, window.location.href);
    localStorage.removeItem(EMAIL_FOR_SIGNIN_KEY);
    const user = buildUser(credential.user.uid, email, 'email');
    saveUser(user);
    return { success: true, user, message: 'Email login successful' };
  } catch {
    return { success: false, message: 'Unable to verify email link.' };
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => getCurrentUser() !== null;
