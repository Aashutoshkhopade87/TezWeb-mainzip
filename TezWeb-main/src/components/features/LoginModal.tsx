import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecaptchaVerifier } from 'firebase/auth';
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
import { X, Smartphone, Shield, Loader2, Mail } from 'lucide-react';
import { sendOTP, verifyOTP } from '@/lib/auth';
import { auth, hasFirebaseConfig } from '@/lib/firebase';
import { toast } from 'sonner';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

type LoginStep = 'phone' | 'otp';
type LoginMethod = 'phone' | 'email';

export default function LoginModal({ onClose, onLoginSuccess }: LoginModalProps) {
  const navigate = useNavigate();
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  const [step, setStep] = useState<LoginStep>('phone');
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('phone');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [emailLinkSent, setEmailLinkSent] = useState(false);

  const countryCodes = [
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+1', country: 'USA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  ];

  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, []);

  const ensureRecaptcha = async () => {
    if (!hasFirebaseConfig || !auth) {
      return undefined;
    }

    if (recaptchaVerifierRef.current) {
      return recaptchaVerifierRef.current;
    }

    const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
    });

    await verifier.render();
    recaptchaVerifierRef.current = verifier;
    return verifier;
  };

  const handleSendOTP = async () => {
    if (loginMethod === 'phone') {
      if (phoneNumber.length < 10) {
        toast.error('Please enter a valid phone number');
        return;
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim().toLowerCase())) {
        toast.error('Please enter a valid email address');
        return;
      }
    }

    setIsLoading(true);
    const loginIdentifier =
      loginMethod === 'phone'
        ? `${countryCode}${phoneNumber}`
        : email.trim().toLowerCase();

    setIdentifier(loginIdentifier);

    try {
      const recaptchaVerifier = loginMethod === 'phone' ? await ensureRecaptcha() : undefined;
      const result = await sendOTP(loginIdentifier, loginMethod, { recaptchaVerifier });

      if (result.success) {
        if (result.requiresOTP) {
          toast.success(`OTP sent to your ${loginMethod === 'phone' ? 'mobile number' : 'email'}!`);
          setStep('otp');
          return;
        }

        toast.success(result.message);
        setEmailLinkSent(true);
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
      const result = await verifyOTP(identifier, otp, loginMethod);

      if (result.success && result.user) {
        toast.success('Login successful! 🎉');
        setTimeout(() => {
          onLoginSuccess();
          onClose();
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

  const handleMethodChange = (method: LoginMethod) => {
    setLoginMethod(method);
    setPhoneNumber('');
    setEmail('');
    setOtp('');
    setEmailLinkSent(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4">
            {step === 'phone' ? (
              loginMethod === 'phone' ? (
                <Smartphone className="w-8 h-8 text-white" />
              ) : (
                <Mail className="w-8 h-8 text-white" />
              )
            ) : (
              <Shield className="w-8 h-8 text-white" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {step === 'phone'
              ? loginMethod === 'phone'
                ? 'Login with Mobile'
                : 'Login with Email'
              : 'Verify OTP'}
          </h2>
          <p className="text-gray-600 text-sm">
            {step === 'phone'
              ? loginMethod === 'phone'
                ? 'Enter your mobile number to continue'
                : 'Enter your email to continue'
              : `We sent a code to ${identifier}`}
          </p>
        </div>

        {step === 'phone' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 bg-gray-100 p-1 rounded-lg">
              <Button
                type="button"
                variant={loginMethod === 'phone' ? 'default' : 'ghost'}
                className="h-10"
                onClick={() => handleMethodChange('phone')}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile
              </Button>
              <Button
                type="button"
                variant={loginMethod === 'email' ? 'default' : 'ghost'}
                className="h-10"
                onClick={() => handleMethodChange('email')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>

            {loginMethod === 'phone' ? (
              <>
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
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendOTP();
                    }
                  }}
                />
              </div>
            )}

            <Button
              onClick={handleSendOTP}
              disabled={
                isLoading ||
                (loginMethod === 'phone' ? phoneNumber.length < 10 : email.trim().length === 0)
              }
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {loginMethod === 'email' ? 'Sending link...' : 'Sending OTP...'}
                </>
              ) : loginMethod === 'email' ? (
                'Send Login Link'
              ) : (
                'Send OTP'
              )}
            </Button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs text-blue-800">
                <strong>🔒 Secure Login:</strong>{' '}
                {loginMethod === 'phone'
                  ? 'OTP verification uses Firebase Phone Auth.'
                  : 'Email login uses Firebase magic link sign-in.'}
              </p>
            </div>

            {emailLinkSent && (
              <p className="text-sm text-green-700 text-center">
                Login link sent. Please open your email and tap the link to complete sign-in.
              </p>
            )}
          </div>
        )}

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
                Enter the 6-digit code sent to your mobile number
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
                ← Change {loginMethod === 'phone' ? 'Number' : 'Email'}
              </button>
              <button
                onClick={handleSendOTP}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
              >
                Resend OTP
              </button>
            </div>
          </div>
        )}

        <div id="recaptcha-container" />
      </div>
    </div>
  );
}
