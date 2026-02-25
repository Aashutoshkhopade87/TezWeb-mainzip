// Authentication utility functions
// This is structured for Firebase Phone Auth integration

export interface User {
  uid: string;
  phoneNumber: string;
  createdAt: string;
}

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

// Mock OTP verification (replace with Firebase later)
export const sendOTP = async (phoneNumber: string): Promise<{ success: boolean; message: string }> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  console.log('OTP sent to:', phoneNumber);
  return { success: true, message: 'OTP sent successfully' };
};

// Mock OTP verification (replace with Firebase later)
export const verifyOTP = async (phoneNumber: string, otp: string): Promise<{ success: boolean; user?: User; message: string }> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For mock: accept any 6-digit OTP
  if (otp.length === 6) {
    const user: User = {
      uid: `user-${phoneNumber.replace(/[^0-9]/g, '')}`,
      phoneNumber,
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
