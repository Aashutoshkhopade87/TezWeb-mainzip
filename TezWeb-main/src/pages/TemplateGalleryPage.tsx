import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Check, Eye } from 'lucide-react';
import { TEMPLATE_PREVIEWS } from '@/constants/templateStyles';
import { BusinessCategory, TemplateStyle } from '@/types/website';
import TemplatePreviewDialog from '@/components/features/TemplatePreviewDialog';
import { getCurrentUser, isAuthenticated } from '@/lib/auth';
import LoginModal from '@/components/features/LoginModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { canCreateWebsite, enforceExpiryForUser } from '@/lib/subscription';
import { getUserWebsites } from '@/lib/websiteGenerator';
import { toast } from 'sonner';

export default function TemplateGalleryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryFromState = location.state?.category as BusinessCategory | undefined;
  
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | 'all'>(
    categoryFromState || 'all'
  );
  const [selectedTemplate, setSelectedTemplate] = useState<{
    category: BusinessCategory;
    style: TemplateStyle;
  } | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<{
    category: BusinessCategory;
    style: TemplateStyle;
    name: string;
  } | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const filteredTemplates = TEMPLATE_PREVIEWS.filter(
    (template) => selectedCategory === 'all' || template.category === selectedCategory
  );

  const handleSelectTemplate = (category: BusinessCategory, style: TemplateStyle) => {
    setSelectedTemplate({ category, style });
  };

  const handleContinue = async () => {
    if (!selectedTemplate) return;

    if (!isAuthenticated()) {
      setShowLoginModal(true);
      return;
    }

    const user = getCurrentUser();
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const subscription = await enforceExpiryForUser(user.uid);
    const userWebsites = getUserWebsites(user.uid);

    if (!canCreateWebsite(subscription, userWebsites.length)) {
      toast.error('Website limit reached. Upgrade your plan to create more websites.');
      navigate('/dashboard');
      return;
    }

    navigate('/create', {
      state: {
        selectedCategory: selectedTemplate.category,
        selectedStyle: selectedTemplate.style,
      },
    });
  };

  const handleLoginSuccess = () => {
    if (selectedTemplate) {
      navigate('/create', {
        state: {
          selectedCategory: selectedTemplate.category,
          selectedStyle: selectedTemplate.style,
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-40 px-4 py-4 sm:px-6 lg:px-8 border-b bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
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

      {/* Content */}
      <main className="px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Choose Your Template
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Select a design style that matches your business personality
            </p>

            {/* Category Filter */}
            <div className="max-w-xs mx-auto">
              <Select
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value as BusinessCategory | 'all')}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
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
            </div>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredTemplates.map((template) => {
              const isSelected =
                selectedTemplate?.category === template.category &&
                selectedTemplate?.style === template.style;

              return (
                <div
                  key={`${template.category}-${template.style}`}
                  onClick={() => handleSelectTemplate(template.category, template.style)}
                  className={`relative group cursor-pointer rounded-xl overflow-hidden border-4 transition-all ${
                    isSelected
                      ? 'border-blue-600 shadow-2xl scale-[1.02]'
                      : 'border-transparent hover:border-gray-300 hover:shadow-xl'
                  }`}
                >
                  {/* Template Preview Image */}
                  <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
                    <img
                      src={template.previewImage}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Selected Indicator */}
                    {isSelected && (
                      <div className="absolute top-4 right-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    )}

                    {/* Style Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold text-white capitalize shadow-lg"
                        style={{ backgroundColor: template.primaryColor }}
                      >
                        {template.style}
                      </span>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-5 bg-white">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border-2 border-white shadow"
                          style={{ backgroundColor: template.primaryColor }}
                        />
                        <span className="text-xs text-gray-500 capitalize">
                          {template.category}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewTemplate({
                            category: template.category,
                            style: template.style,
                            name: template.name,
                          });
                        }}
                        className="gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-xs font-medium">Preview</span>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continue Button */}
          {selectedTemplate && (
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-2xl z-50">
              <div className="max-w-md mx-auto">
                <Button
                  onClick={handleContinue}
                  className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Continue with This Template
                </Button>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> Choose a template that matches your business vibe. 
              You can customize colors, text, and images after selecting a template.
            </p>
          </div>
        </div>
      </main>

      {/* Preview Dialog */}
      {previewTemplate && (
        <TemplatePreviewDialog
          category={previewTemplate.category}
          style={previewTemplate.style}
          templateName={previewTemplate.name}
          onClose={() => setPreviewTemplate(null)}
          onSelectTemplate={() => {
            setSelectedTemplate({
              category: previewTemplate.category,
              style: previewTemplate.style,
            });
            setPreviewTemplate(null);
            // Auto-scroll to continue button
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }}
        />
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}
