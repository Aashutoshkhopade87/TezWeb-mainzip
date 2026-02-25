import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '@/lib/auth';
import LoginModal from '@/components/features/LoginModal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Loader2, Sparkles, ArrowLeft, Lightbulb } from 'lucide-react';
import { generateWebsite, saveWebsiteToStorage, getUserWebsites } from '@/lib/websiteGenerator';
import { GeneratorFormData } from '@/types/website';
import VoiceInput from '@/components/features/VoiceInput';
import { getCurrentUser } from '@/lib/auth';
import { canCreateWebsite, enforceExpiryForUser, getOrCreateSubscription, getPlanWebsiteLimit } from '@/lib/subscription';
import { UserSubscription } from '@/types/website';
import { toast } from 'sonner';

const formSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  category: z.string().min(1, 'Please select a category'),
  whatsappNumber: z.string()
    .min(10, 'WhatsApp number must be at least 10 digits')
    .regex(/^[0-9]+$/, 'Please enter a valid phone number'),
  whatsappCountryCode: z.string().optional(),
  customPrompt: z.string().optional(),
});

export default function CreateWebsitePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Check authentication on mount
  useEffect(() => {
    const bootstrap = async () => {
      if (!isAuthenticated()) {
        setShowLoginModal(true);
        return;
      }

      const user = getCurrentUser();
      if (!user) return;

      const activeSubscription = await enforceExpiryForUser(user.uid);
      setSubscription(activeSubscription);

      const userWebsites = getUserWebsites(user.uid);
      setLimitReached(!canCreateWebsite(activeSubscription, userWebsites.length));
    };

    void bootstrap();
  }, []);
  
  // Get selected template from navigation state
  const selectedCategory = location.state?.selectedCategory;
  const selectedStyle = location.state?.selectedStyle;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GeneratorFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      category: selectedCategory || '',
      whatsappNumber: '',
      whatsappCountryCode: '+91',
      templateStyle: selectedStyle || 'modern',
      customPrompt: '',
    },
  });

  const category = watch('category');
  const whatsappCountryCode = watch('whatsappCountryCode');

  const handleVoiceTranscript = (transcript: string) => {
    const currentValue = watch('customPrompt') || '';
    const newValue = currentValue ? `${currentValue} ${transcript}` : transcript;
    setValue('customPrompt', newValue);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const onSubmit = async (data: GeneratorFormData) => {
    console.log('Form submitted:', data);

    const user = getCurrentUser();
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const latestSubscription = await getOrCreateSubscription(user.uid);
    setSubscription(latestSubscription);

    const userWebsites = getUserWebsites(user.uid);
    if (!canCreateWebsite(latestSubscription, userWebsites.length)) {
      toast.error('Website limit reached for your current plan. Please upgrade.');
      setLimitReached(true);
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Include template style and custom prompt in generation
    const website = generateWebsite({
      ...data,
      templateStyle: selectedStyle || 'modern',
      customPrompt: data.customPrompt,
    });
    
    // Log custom prompt if provided
    if (data.customPrompt) {
      console.log('User custom instructions:', data.customPrompt);
    }
    console.log('Generated website:', website);
    
    saveWebsiteToStorage(website);
    setIsGenerating(false);
    
    navigate('/preview');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="px-4 py-4 sm:px-6 lg:px-8 border-b bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TezWeb
            </span>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Form Section */}
      <main className="px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Create Your Website
            </h1>
            <p className="text-lg text-gray-600">
              Fill in your business details and let AI do the rest
            </p>
            {selectedStyle && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Using <span className="capitalize">{selectedStyle}</span> template style
                </span>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
            {subscription && (
              <div className="mb-4 p-3 rounded-lg border bg-blue-50 border-blue-200 text-sm text-blue-900">
                Plan: <strong className="capitalize">{subscription.plan}</strong> • Website limit: <strong>{getPlanWebsiteLimit(subscription)}</strong>
                {limitReached && (
                  <span className="block mt-1 text-red-600">Limit reached. Upgrade to continue creating websites.</span>
                )}
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Business Name */}
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-base font-semibold">
                  Business Name *
                </Label>
                <Input
                  id="businessName"
                  placeholder="e.g., Sharma Bakery, Royal Electronics"
                  {...register('businessName')}
                  className="h-12 text-base"
                />
                {errors.businessName && (
                  <p className="text-sm text-red-600">{errors.businessName.message}</p>
                )}
              </div>

              {/* Business Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-base font-semibold">
                  Business Category *
                </Label>
                <Select
                  value={category}
                  onValueChange={(value) => setValue('category', value)}
                >
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shop">General Shop</SelectItem>
                    <SelectItem value="bakery">Bakery</SelectItem>
                    <SelectItem value="clothing">Clothing Store</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="salon">Salon/Beauty</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>

              {/* WhatsApp Number with Country Code */}
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber" className="text-base font-semibold">
                  WhatsApp Number *
                </Label>
                <div className="flex gap-2">
                  <Select
                    value={whatsappCountryCode}
                    onValueChange={(value) => setValue('whatsappCountryCode', value)}
                  >
                    <SelectTrigger className="w-[140px] h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+91">🇮🇳 +91</SelectItem>
                      <SelectItem value="+1">🇺🇸 +1</SelectItem>
                      <SelectItem value="+44">🇬🇧 +44</SelectItem>
                      <SelectItem value="+971">🇦🇪 +971</SelectItem>
                      <SelectItem value="+65">🇸🇬 +65</SelectItem>
                      <SelectItem value="+92">🇵🇰 +92</SelectItem>
                      <SelectItem value="+880">🇧🇩 +880</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="whatsappNumber"
                    type="tel"
                    placeholder="9876543210"
                    {...register('whatsappNumber')}
                    className="h-12 text-base flex-1"
                  />
                </div>
                {errors.whatsappNumber && (
                  <p className="text-sm text-red-600">{errors.whatsappNumber.message}</p>
                )}
                <p className="text-sm text-gray-500">
                  Customers will contact you on this number via WhatsApp
                </p>
              </div>

              {/* Optional Custom Prompt */}
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <Label htmlFor="customPrompt" className="text-base font-semibold flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-600" />
                  Additional Instructions (Optional)
                </Label>
                
                <textarea
                  ref={textareaRef}
                  id="customPrompt"
                  placeholder="e.g., Add eco-friendly products, focus on traditional Indian designs, include home delivery options..."
                  {...register('customPrompt')}
                  className="w-full h-24 px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                
                {/* Voice Input Component */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <p className="text-sm text-gray-500">
                    💡 Type or speak your preferences in any language
                  </p>
                  <VoiceInput onTranscript={handleVoiceTranscript} />
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-800">
                    <strong>🎤 Voice Input:</strong> Click "Speak" and tell us your requirements in Hindi, English, or any Indian regional language. The system will automatically convert your speech to text.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isGenerating || limitReached}
                className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Your Website...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Website with AI
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>What happens next?</strong> AI will create a professional website 
              with your business details, product cards, and WhatsApp order buttons. 
              You can edit everything after generation.
            </p>
          </div>
        </div>
      </main>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => {
            setShowLoginModal(false);
            navigate('/');
          }}
          onLoginSuccess={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
}
