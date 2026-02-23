import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '@/lib/auth';
import LoginModal from '@/components/features/LoginModal';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, Save, Plus, Palette, Sparkles, MapPin, Instagram, Facebook, Twitter, AlertCircle, Images, Share2 } from 'lucide-react';
import { getWebsiteFromStorage, saveWebsiteToStorage } from '@/lib/websiteGenerator';
import { WebsiteData, Product, GalleryImage } from '@/types/website';
import { toast } from 'sonner';
import EditableSection from '@/components/features/EditableSection';
import ProductEditor from '@/components/features/ProductEditor';
import ColorPicker from '@/components/features/ColorPicker';
import AIAssistantDialog from '@/components/features/AIAssistantDialog';
import GalleryEditor from '@/components/features/GalleryEditor';
import PublishDialog from '@/components/features/PublishDialog';
import { Input } from '@/components/ui/input';
import { SocialLinks } from '@/types/website';

export default function EditorPage() {
  const navigate = useNavigate();
  const [website, setWebsite] = useState<WebsiteData | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [editingSocialLinks, setEditingSocialLinks] = useState(false);
  const [tempSocialLinks, setTempSocialLinks] = useState<SocialLinks>({
    instagram: '',
    facebook: '',
    twitter: '',
  });
  const [socialValidationErrors, setSocialValidationErrors] = useState<Partial<SocialLinks>>({});
  const [showLoginModal, setShowLoginModal] = useState(false);

  const validateSocialUrl = (url: string, platform: keyof SocialLinks): boolean => {
    if (!url.trim()) return true; // Empty is valid
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.toLowerCase();
      switch (platform) {
        case 'instagram':
          return hostname.includes('instagram.com');
        case 'facebook':
          return hostname.includes('facebook.com') || hostname.includes('fb.com');
        case 'twitter':
          return hostname.includes('twitter.com') || hostname.includes('x.com');
        default:
          return false;
      }
    } catch {
      return false;
    }
  };

  useEffect(() => {
    // Check authentication first
    if (!isAuthenticated()) {
      setShowLoginModal(true);
      return;
    }

    const savedWebsite = getWebsiteFromStorage();
    
    if (!savedWebsite) {
      navigate('/create');
      return;
    }
    
    setWebsite(savedWebsite);
  }, [navigate]);

  const handleSave = () => {
    if (website) {
      saveWebsiteToStorage(website);
      setHasChanges(false);
      toast.success('Website saved successfully!');
      console.log('Website saved:', website);
    }
  };

  const handleUpdateBusinessName = (value: string) => {
    if (website) {
      setWebsite({ ...website, businessName: value });
      setHasChanges(true);
    }
  };

  const handleUpdateTagline = (value: string) => {
    if (website) {
      setWebsite({ ...website, tagline: value });
      setHasChanges(true);
    }
  };

  const handleUpdateBanner = (file: File) => {
    if (website) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWebsite({ ...website, bannerImage: reader.result as string });
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProduct = (productId: string, updates: Partial<Product>) => {
    if (website) {
      const updatedProducts = website.products.map(p =>
        p.id === productId ? { ...p, ...updates } : p
      );
      setWebsite({ ...website, products: updatedProducts });
      setHasChanges(true);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (website) {
      const updatedProducts = website.products.filter(p => p.id !== productId);
      setWebsite({ ...website, products: updatedProducts });
      setHasChanges(true);
      toast.success('Product deleted');
    }
  };

  const handleAddProduct = () => {
    if (website) {
      const newProduct: Product = {
        id: `product-${Date.now()}`,
        name: 'New Product',
        description: 'Add product description here',
        price: '₹100',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&q=80',
      };
      // Add new product at the beginning of the array
      setWebsite({ ...website, products: [newProduct, ...website.products] });
      setHasChanges(true);
      toast.success('New product added at top');
    }
  };

  const handleMoveProduct = (productId: string, direction: 'up' | 'down') => {
    if (!website) return;
    
    const currentIndex = website.products.findIndex(p => p.id === productId);
    if (currentIndex === -1) return;
    
    const newProducts = [...website.products];
    
    if (direction === 'up' && currentIndex > 0) {
      // Swap with previous product
      [newProducts[currentIndex - 1], newProducts[currentIndex]] = 
      [newProducts[currentIndex], newProducts[currentIndex - 1]];
      setWebsite({ ...website, products: newProducts });
      setHasChanges(true);
      toast.success('Product moved up');
    } else if (direction === 'down' && currentIndex < newProducts.length - 1) {
      // Swap with next product
      [newProducts[currentIndex], newProducts[currentIndex + 1]] = 
      [newProducts[currentIndex + 1], newProducts[currentIndex]];
      setWebsite({ ...website, products: newProducts });
      setHasChanges(true);
      toast.success('Product moved down');
    }
  };

  const handleUpdateColor = (color: string) => {
    if (website) {
      setWebsite({ ...website, primaryColor: color });
      setHasChanges(true);
    }
  };

  const handleUpdateAddress = (address: string) => {
    if (website) {
      setWebsite({ ...website, shopAddress: address });
      setHasChanges(true);
    }
  };

  const handleUpdateGallery = (gallery: GalleryImage[]) => {
    if (website) {
      setWebsite({ ...website, gallery });
      setHasChanges(true);
    }
  };

  const handleSocialLinkChange = (platform: keyof SocialLinks, value: string) => {
    setTempSocialLinks(prev => ({ ...prev, [platform]: value }));
    
    if (value.trim() && !validateSocialUrl(value, platform)) {
      setSocialValidationErrors(prev => ({ 
        ...prev, 
        [platform]: `Invalid ${platform} URL` 
      }));
    } else {
      setSocialValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[platform];
        return newErrors;
      });
    }
  };

  const handleSaveSocialLinks = () => {
    if (!website) return;
    
    const errors: Partial<SocialLinks> = {};
    let hasError = false;

    (Object.keys(tempSocialLinks) as Array<keyof SocialLinks>).forEach(platform => {
      const url = tempSocialLinks[platform];
      if (url.trim() && !validateSocialUrl(url, platform)) {
        errors[platform] = `Invalid ${platform} URL`;
        hasError = true;
      }
    });

    if (hasError) {
      setSocialValidationErrors(errors);
      toast.error('Please fix invalid URLs');
      return;
    }

    setWebsite({ ...website, socialLinks: tempSocialLinks });
    setEditingSocialLinks(false);
    setSocialValidationErrors({});
    setHasChanges(true);
    toast.success('Social media links updated');
  };

  if (!website) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Editor Header */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/preview')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowColorPicker(true)}
              className="gap-2"
            >
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Colors</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAIAssistant(true)}
              className="gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">AI Help</span>
            </Button>

            <Button
              onClick={handleSave}
              disabled={!hasChanges}
              className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="sm"
            >
              <Save className="w-4 h-4" />
              Save
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleSave();
                navigate('/preview');
              }}
              className="gap-2"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Preview</span>
            </Button>

            <Button
              onClick={() => {
                handleSave();
                setShowPublishDialog(true);
              }}
              className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              size="sm"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Publish</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Your Website</h1>
          <p className="text-gray-600">Click on any section to edit. Changes save automatically.</p>
        </div>

        {/* Banner Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Banner & Header</h2>
          
          <div className="space-y-4">
            <EditableSection
              label="Business Name"
              value={website.businessName}
              onSave={handleUpdateBusinessName}
              type="text"
            />
            
            <EditableSection
              label="Tagline"
              value={website.tagline}
              onSave={handleUpdateTagline}
              type="text"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner Image
              </label>
              <div className="relative rounded-lg overflow-hidden mb-2">
                <img
                  src={website.bannerImage}
                  alt="Banner"
                  className="w-full h-40 object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpdateBanner(file);
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Products</h2>
            <Button
              onClick={handleAddProduct}
              size="sm"
              variant="outline"
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </div>

          <div className="space-y-4">
            {website.products.map((product, index) => (
              <ProductEditor
                key={product.id}
                product={product}
                onUpdate={(updates) => handleUpdateProduct(product.id, updates)}
                onDelete={() => handleDeleteProduct(product.id)}
                onMoveUp={index > 0 ? () => handleMoveProduct(product.id, 'up') : undefined}
                onMoveDown={index < website.products.length - 1 ? () => handleMoveProduct(product.id, 'down') : undefined}
              />
            ))}
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Social Media Links</h2>
            {!editingSocialLinks && (
              <Button
                onClick={() => {
                  setTempSocialLinks(website.socialLinks);
                  setEditingSocialLinks(true);
                }}
                size="sm"
                variant="outline"
              >
                Edit
              </Button>
            )}
          </div>

          {editingSocialLinks ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  Instagram URL
                </label>
                <Input
                  value={tempSocialLinks.instagram}
                  onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/yourprofile"
                  className={socialValidationErrors.instagram ? 'border-red-500' : ''}
                />
                {socialValidationErrors.instagram && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {socialValidationErrors.instagram}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Facebook className="w-4 h-4" />
                  Facebook URL
                </label>
                <Input
                  value={tempSocialLinks.facebook}
                  onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                  placeholder="https://facebook.com/yourprofile"
                  className={socialValidationErrors.facebook ? 'border-red-500' : ''}
                />
                {socialValidationErrors.facebook && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {socialValidationErrors.facebook}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter/X URL
                </label>
                <Input
                  value={tempSocialLinks.twitter}
                  onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                  placeholder="https://twitter.com/yourprofile"
                  className={socialValidationErrors.twitter ? 'border-red-500' : ''}
                />
                {socialValidationErrors.twitter && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {socialValidationErrors.twitter}
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={handleSaveSocialLinks} size="sm">
                  Save Links
                </Button>
                <Button
                  onClick={() => {
                    setEditingSocialLinks(false);
                    setSocialValidationErrors({});
                  }}
                  size="sm"
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              {website.socialLinks.instagram && (
                <a href={website.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                </a>
              )}
              {website.socialLinks.facebook && (
                <a href={website.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                  <div className="w-12 h-12 rounded-lg bg-[#1877F2] flex items-center justify-center">
                    <Facebook className="w-6 h-6 text-white" fill="currentColor" />
                  </div>
                </a>
              )}
              {website.socialLinks.twitter && (
                <a href={website.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center border border-gray-300">
                    <Twitter className="w-6 h-6 text-white" fill="currentColor" />
                  </div>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Photo Gallery Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Images className="w-5 h-5 text-gray-900" />
            <h2 className="text-lg font-semibold text-gray-900">Photo Gallery</h2>
          </div>
          <GalleryEditor
            gallery={website.gallery || []}
            onUpdate={handleUpdateGallery}
          />
        </div>

        {/* Shop Location Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Shop Location</h2>
          <EditableSection
            label="Address"
            value={website.shopAddress}
            onSave={handleUpdateAddress}
            type="text"
            icon={<MapPin className="w-4 h-4" />}
          />
        </div>

        {/* WhatsApp Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            <strong>WhatsApp Number:</strong> {website.whatsappNumber}
          </p>
          <p className="text-xs text-green-700 mt-1">
            To change WhatsApp number, create a new website
          </p>
        </div>
      </div>

      {/* Color Picker Dialog */}
      {showColorPicker && (
        <ColorPicker
          currentColor={website.primaryColor}
          onColorChange={handleUpdateColor}
          onClose={() => setShowColorPicker(false)}
        />
      )}

      {/* AI Assistant Dialog */}
      {showAIAssistant && (
        <AIAssistantDialog
          onClose={() => setShowAIAssistant(false)}
          onApplySuggestion={(text) => {
            // Apply AI suggestion (simplified for now)
            toast.success('AI suggestion applied!');
            setShowAIAssistant(false);
          }}
        />
      )}

      {/* Publish Dialog */}
      {showPublishDialog && (
        <PublishDialog
          website={website}
          onClose={() => setShowPublishDialog(false)}
        />
      )}

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
