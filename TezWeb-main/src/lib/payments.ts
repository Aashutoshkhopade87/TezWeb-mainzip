interface CreateOrderResponse {
  keyId: string;
  order: {
    id: string;
    amount: number;
    currency: string;
    receipt?: string;
  };
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Calls backend API to securely create Razorpay order.
export const createRazorpayOrder = async (amount: number): Promise<CreateOrderResponse> => {
  const response = await fetch(`${apiBaseUrl}/api/payments/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount,
      currency: 'INR',
      receipt: `tezweb_${Date.now()}`,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to create payment order');
  }

  return response.json() as Promise<CreateOrderResponse>;
};
