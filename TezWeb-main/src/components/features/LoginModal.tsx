import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Smartphone, Shield, Loader2 } from 'lucide-react';
import { sendOTP, verifyOTP } from '@/lib/auth';
import { toast } from 'sonner';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

type LoginStep = 'phone' | 'otp';

export default function LoginModal({ onClose, onLoginSuccess }: LoginModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<LoginStep>('phone');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fullPhoneNumber, setFullPhoneNumber] = useState('');

  const countryCodes = [
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+1', country: 'USA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  ];

  const handleSendOTP = async () => {
    // Validate phone number
    if (phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    const fullPhone = `${countryCode}${phoneNumber}`;
    setFullPhoneNumber(fullPhone);

    try {
      const result = await sendOTP(fullPhone);
      
      if (result.success) {
        toast.success('OTP sent to your phone!');
        setStep('otp');
      } else {
        toast.error(result.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);

    try {
      const result = await verifyOTP(fullPhoneNumber, otp);
      
      if (result.success && result.user) {
        toast.success('Login successful! 🎉');
        setTimeout(() => {
          onLoginSuccess();
          onClose();
          // Redirect to dashboard after successful login
          navigate('/dashboard');
        }, 500);
      } else {
        toast.error(result.message || 'Invalid OTP');
        setOtp('');
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp('');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4">
            {step === 'phone' ? (
              <Smartphone className="w-8 h-8 text-white" />
            ) : (
              <Shield className="w-8 h-8 text-white" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {step === 'phone' ? 'Login with Mobile' : 'Verify OTP'}
          </h2>
          <p className="text-gray-600 text-sm">
            {step === 'phone' 
              ? 'Enter your mobile number to continue'
              : `We sent a code to ${fullPhoneNumber}`
            }
          </p>
        </div>

        {/* Phone Number Step */}
        {step === 'phone' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-sm font-semibold text-gray-700">
                Country
              </Label>
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((item) => (
                    <SelectItem key={item.code} value={item.code}>
                      <span className="flex items-center gap-2">
                        <span>{item.flag}</span>
                        <span>{item.country}</span>
                        <span className="text-gray-500">({item.code})</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                Mobile Number
              </Label>
              <div className="flex gap-2">
                <div className="flex items-center justify-center px-4 h-12 bg-gray-100 rounded-lg border border-gray-200 font-semibold text-gray-700">
                  {countryCode}
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  maxLength={10}
                  className="h-12 text-base flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendOTP();
                    }
                  }}
                />
              </div>
            </div>

            <Button
              onClick={handleSendOTP}
              disabled={isLoading || phoneNumber.length < 10}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                'Send OTP'
              )}
            </Button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs text-blue-800">
                <strong>🔒 Secure Login:</strong> We'll send a 6-digit OTP to verify your number. 
                Standard SMS rates may apply.
              </p>
            </div>
          </div>
        )}

        {/* OTP Verification Step */}
        {step === 'otp' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-semibold text-gray-700">
                Enter OTP
              </Label>
              <Input
                id="otp"
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                maxLength={6}
                className="h-14 text-center text-2xl font-bold tracking-widest"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && otp.length === 6) {
                    handleVerifyOTP();
                  }
                }}
                autoFocus
              />
              <p className="text-xs text-gray-500 text-center">
                Enter the 6-digit code sent to your phone
              </p>
            </div>

            <Button
              onClick={handleVerifyOTP}
              disabled={isLoading || otp.length !== 6}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify & Continue'
              )}
            </Button>

            <div className="flex items-center justify-between text-sm">
              <button
                onClick={handleBackToPhone}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Change Number
              </button>
              <button
                onClick={handleSendOTP}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
              >
                Resend OTP
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-xs text-yellow-800">
                <strong>💡 Demo Mode:</strong> Enter any 6-digit code to verify (e.g., 123456)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
