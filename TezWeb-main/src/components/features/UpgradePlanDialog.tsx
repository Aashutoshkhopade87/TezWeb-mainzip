import { useState } from 'react';
import { X, Crown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { upgradeToPro } from '@/lib/subscription';
import { createRazorpayOrder } from '@/lib/payments';

interface UpgradePlanDialogProps {
  userId: string;
  onClose: () => void;
  onUpgraded: () => void;
}

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

const loadRazorpayScript = async (): Promise<boolean> => {
  if (window.Razorpay) return true;

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function UpgradePlanDialog({ userId, onClose, onUpgraded }: UpgradePlanDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        toast.error('Razorpay SDK failed to load');
        return;
      }

      // Create order on secure backend. Secret key stays only on server.
      const { keyId, order } = await createRazorpayOrder(19900);

      const paymentObject = new window.Razorpay({
        key: keyId,
        name: 'TezWeb',
        description: 'TezWeb Pro - ₹199 / Month',
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        recurring: true,
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          // Payment success callback: log Razorpay payment id.
          console.log('Razorpay payment success:', response.razorpay_payment_id);
          await upgradeToPro(userId);
          toast.success('Payment successful. Pro plan activated!');
          onUpgraded();
          onClose();
        },
        theme: { color: '#2563eb' },
      });

      paymentObject.open();
    } catch (error) {
      console.error(error);
      toast.error('Upgrade failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[110] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-full mb-3">
            <Crown className="w-7 h-7 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Upgrade to Pro</h2>
          <p className="text-gray-600">₹199 / month • Razorpay auto-renewal</p>
        </div>

        <div className="grid gap-4 text-sm mb-6">
          <div className="p-4 rounded-lg border bg-green-50 border-green-200">
            <h3 className="font-semibold mb-2">Free Trial (7 days)</h3>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              <li>1 website</li>
              <li>Publish + WhatsApp orders</li>
              <li>TezWeb branding visible</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg border bg-blue-50 border-blue-200">
            <h3 className="font-semibold mb-2">Pro Plan</h3>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              <li>2 websites</li>
              <li>Websites stay live while subscription is active</li>
              <li>Remove TezWeb branding</li>
              <li>Basic analytics + priority templates</li>
            </ul>
          </div>
        </div>

        <Button
          onClick={handleUpgrade}
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
          ) : (
            'Pay ₹199 and Activate Pro'
          )}
        </Button>
      </div>
    </div>
  );
}
