const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export interface GenerateWebsitePayload {
  prompt: string;
}

export function generateWebsite(payload: GenerateWebsitePayload) {
  return request<{ success: boolean; etaSeconds: number; website: { pages: string[]; prompt: string; status: string } }>(
    '/api/generate',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
}

export function requestOtp(phoneNumber: string) {
  return request<{ success: boolean; otpSessionId: string; phoneNumber: string }>('/api/auth/request-otp', {
    method: 'POST',
    body: JSON.stringify({ phoneNumber }),
  });
}
