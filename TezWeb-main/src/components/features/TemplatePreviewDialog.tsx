import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BusinessCategory, TemplateStyle, WebsiteData } from '@/types/website';
import { TEMPLATE_STYLES } from '@/constants/templateStyles';
import GeneratedWebsite from './GeneratedWebsite';

interface TemplatePreviewDialogProps {
  category: BusinessCategory;
  style: TemplateStyle;
  templateName: string;
  onClose: () => void;
  onSelectTemplate: () => void;
}

const SAMPLE_BUSINESS_NAMES: Record<BusinessCategory, string> = {
  shop: 'Sharma General Store',
  bakery: 'Royal Bakery',
  clothing: 'Fashion Point',
  electronics: 'Tech Plaza',
  restaurant: 'Spice Kitchen',
  salon: 'Glamour Salon',
  pharmacy: 'MediCare Pharmacy',
  other: 'My Business',
};

export default function TemplatePreviewDialog({
  category,
  style,
  templateName,
  onClose,
  onSelectTemplate,
}: TemplatePreviewDialogProps) {
  // Generate sample website data for preview
  const template = TEMPLATE_STYLES[category]?.[style];
  
  const sampleWebsite: WebsiteData = {
    id: 'preview',
    businessName: SAMPLE_BUSINESS_NAMES[category],
    category,
    whatsappNumber: '919876543210',
    bannerImage: template.bannerImage,
    tagline: template.tagline,
    primaryColor: template.primaryColor,
    templateStyle: style,
    products: template.products.map((product: any, index: number) => ({
      id: `preview-${index}`,
      ...product,
    })),
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b shadow-lg mb-4">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{templateName}</h2>
              <p className="text-sm text-gray-600 capitalize">
                {category} • {style} style
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={onSelectTemplate}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Use This Template
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-gray-200">
            {/* Mobile Frame Indicator */}
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-center gap-2">
              <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
              <span className="text-xs text-gray-400">Preview Mode</span>
            </div>
            
            {/* Website Preview */}
            <div className="bg-gray-50">
              <GeneratedWebsite website={sampleWebsite} isPreview={true} />
            </div>
          </div>

          {/* Info Banner */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-sm text-blue-800">
              <strong>📱 Live Preview:</strong> This is how your website will look. 
              All content can be customized after selection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
