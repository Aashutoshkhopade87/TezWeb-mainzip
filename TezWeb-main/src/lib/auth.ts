// Authentication utility functions
// This is structured for Firebase Phone Auth integration

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

const OTP_STORAGE_KEY = 'pendingOtpRequests';
const OTP_EXPIRY_MS = 5 * 60 * 1000;

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

// Get current user from localStorage (mock for now)
export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
};

// Save user to localStorage
export const saveUser = (user: User): void => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// Clear user session
export const logout = (): void => {
  localStorage.removeItem('currentUser');
};

// OTP generation helper for phone/email login.
export const sendOTP = async (
  identifier: string,
  method: LoginMethod = 'phone'
): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const requests = getPendingOTPRequests();

  requests[identifier] = {
    code: otp,
    expiresAt: Date.now() + OTP_EXPIRY_MS,
    method,
  };

  savePendingOTPRequests(requests);

  console.log(`OTP for ${method} ${identifier}:`, otp);
  return { success: true, message: 'OTP sent successfully' };
};

// OTP verification for phone/email login.
export const verifyOTP = async (
  identifier: string,
  otp: string,
  method: LoginMethod = 'phone'
): Promise<{ success: boolean; user?: User; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

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

  if (pendingRequest.code === otp) {
    delete requests[identifier];
    savePendingOTPRequests(requests);

    const user: User = {
      uid: `user-${identifier.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      ...(method === 'phone' ? { phoneNumber: identifier } : { email: identifier.toLowerCase() }),
      createdAt: new Date().toISOString(),
    };

    saveUser(user);
    return { success: true, user, message: 'Login successful' };
  }
  
  return { success: false, message: 'Invalid OTP' };
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
