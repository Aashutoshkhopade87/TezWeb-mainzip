import { useState, useEffect } from 'react';
import { X, MapPin, Instagram, Facebook, Twitter, Edit2, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface BusinessProfileOverlayProps {
  onClose: () => void;
}

interface SocialMediaLinks {
  instagram: string;
  facebook: string;
  twitter: string;
}

const DEFAULT_LINKS: SocialMediaLinks = {
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com',
};

const validateSocialMediaUrl = (url: string, platform: 'instagram' | 'facebook' | 'twitter'): boolean => {
  if (!url.trim()) return false;
  
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

export default function BusinessProfileOverlay({ onClose }: BusinessProfileOverlayProps) {
  const [ownerName, setOwnerName] = useState('Aashutosh Khopade');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(ownerName);

  const [socialLinks, setSocialLinks] = useState<SocialMediaLinks>(DEFAULT_LINKS);
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [tempLinks, setTempLinks] = useState<SocialMediaLinks>(DEFAULT_LINKS);
  const [validationErrors, setValidationErrors] = useState<Partial<SocialMediaLinks>>({});

  const address = 'Main Market, Barad, Maharashtra';
  const mapsUrl = 'https://maps.google.com';

  // Load saved data from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('businessProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        if (profile.ownerName) {
          setOwnerName(profile.ownerName);
          setTempName(profile.ownerName);
        }
        if (profile.socialLinks) {
          setSocialLinks(profile.socialLinks);
          setTempLinks(profile.socialLinks);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    }
  }, []);

  const saveToLocalStorage = (data: { ownerName?: string; socialLinks?: SocialMediaLinks }) => {
    const savedProfile = localStorage.getItem('businessProfile');
    let profile = {};
    
    if (savedProfile) {
      try {
        profile = JSON.parse(savedProfile);
      } catch (error) {
        console.error('Error parsing profile:', error);
      }
    }

    const updatedProfile = { ...profile, ...data };
    localStorage.setItem('businessProfile', JSON.stringify(updatedProfile));
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setOwnerName(tempName);
      setIsEditingName(false);
      saveToLocalStorage({ ownerName: tempName });
      toast.success('Name updated successfully');
    }
  };

  const handleSocialLinkChange = (platform: keyof SocialMediaLinks, value: string) => {
    setTempLinks(prev => ({ ...prev, [platform]: value }));
    
    // Real-time validation
    if (value.trim() && !validateSocialMediaUrl(value, platform)) {
      setValidationErrors(prev => ({ 
        ...prev, 
        [platform]: `Invalid ${platform} URL` 
      }));
    } else {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[platform];
        return newErrors;
      });
    }
  };

  const handleSaveSocialLinks = () => {
    // Validate all links
    const errors: Partial<SocialMediaLinks> = {};
    let hasError = false;

    (Object.keys(tempLinks) as Array<keyof SocialMediaLinks>).forEach(platform => {
      const url = tempLinks[platform];
      if (url.trim() && !validateSocialMediaUrl(url, platform)) {
        errors[platform] = `Invalid ${platform} URL`;
        hasError = true;
      }
    });

    if (hasError) {
      setValidationErrors(errors);
      toast.error('Please fix the invalid URLs');
      return;
    }

    setSocialLinks(tempLinks);
    setIsEditingSocial(false);
    setValidationErrors({});
    saveToLocalStorage({ socialLinks: tempLinks });
    toast.success('Social media links updated');
  };

  const handleCancelSocialEdit = () => {
    setTempLinks(socialLinks);
    setIsEditingSocial(false);
    setValidationErrors({});
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Overlay Card */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors group z-10"
        >
          <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-1">Caller Identity</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8">
            {/* Avatar */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {ownerName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-900"></div>
            </div>

            {/* Name */}
            {isEditingName ? (
              <div className="w-full space-y-2">
                <Input
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="text-center bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  autoFocus
                />
                <div className="flex gap-2 justify-center">
                  <Button
                    size="sm"
                    onClick={handleSaveName}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setTempName(ownerName);
                      setIsEditingName(false);
                    }}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                className="text-xl font-semibold text-white hover:text-blue-400 transition-colors"
              >
                {ownerName}
              </button>
            )}
            <p className="text-sm text-gray-400 mt-1">Business Owner</p>
          </div>

          {/* Social Media Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Connect With Us
              </h3>
              {!isEditingSocial && (
                <button
                  onClick={() => setIsEditingSocial(true)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-white" />
                </button>
              )}
            </div>

            {isEditingSocial ? (
              <div className="space-y-4">
                {/* Instagram URL */}
                <div>
                  <label className="block text-xs text-gray-400 mb-2 flex items-center gap-2">
                    <Instagram className="w-4 h-4" />
                    Instagram Profile URL
                  </label>
                  <Input
                    value={tempLinks.instagram}
                    onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                    placeholder="https://instagram.com/yourprofile"
                    className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 ${
                      validationErrors.instagram ? 'border-red-500' : ''
                    }`}
                  />
                  {validationErrors.instagram && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.instagram}
                    </p>
                  )}
                </div>

                {/* Facebook URL */}
                <div>
                  <label className="block text-xs text-gray-400 mb-2 flex items-center gap-2">
                    <Facebook className="w-4 h-4" />
                    Facebook Profile URL
                  </label>
                  <Input
                    value={tempLinks.facebook}
                    onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                    placeholder="https://facebook.com/yourprofile"
                    className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 ${
                      validationErrors.facebook ? 'border-red-500' : ''
                    }`}
                  />
                  {validationErrors.facebook && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.facebook}
                    </p>
                  )}
                </div>

                {/* Twitter URL */}
                <div>
                  <label className="block text-xs text-gray-400 mb-2 flex items-center gap-2">
                    <Twitter className="w-4 h-4" />
                    Twitter/X Profile URL
                  </label>
                  <Input
                    value={tempLinks.twitter}
                    onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                    placeholder="https://twitter.com/yourprofile"
                    className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 ${
                      validationErrors.twitter ? 'border-red-500' : ''
                    }`}
                  />
                  {validationErrors.twitter && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.twitter}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleSaveSocialLinks}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Save Links
                  </Button>
                  <Button
                    onClick={handleCancelSocialEdit}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                </div>

                {/* Preview Section */}
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-xs text-gray-400 mb-2">Preview:</p>
                  <div className="flex gap-3 justify-center">
                    {tempLinks.instagram && validateSocialMediaUrl(tempLinks.instagram, 'instagram') && (
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center">
                        <Instagram className="w-5 h-5 text-white" />
                      </div>
                    )}
                    {tempLinks.facebook && validateSocialMediaUrl(tempLinks.facebook, 'facebook') && (
                      <div className="w-10 h-10 rounded-lg bg-[#1877F2] flex items-center justify-center">
                        <Facebook className="w-5 h-5 text-white" fill="currentColor" />
                      </div>
                    )}
                    {tempLinks.twitter && validateSocialMediaUrl(tempLinks.twitter, 'twitter') && (
                      <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center border border-white/20">
                        <Twitter className="w-5 h-5 text-white" fill="currentColor" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-4 justify-center">
                {/* Instagram */}
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                    <Instagram className="w-7 h-7 text-white" />
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Instagram
                  </span>
                </a>

                {/* Facebook */}
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#1877F2] flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                    <Facebook className="w-7 h-7 text-white" fill="currentColor" />
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Facebook
                  </span>
                </a>

                {/* Twitter/X */}
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border border-white/20">
                    <Twitter className="w-7 h-7 text-white" fill="currentColor" />
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Twitter
                  </span>
                </a>
              </div>
            )}
          </div>

          {/* Location Section */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white mb-1">Shop Location</h3>
                <p className="text-sm text-gray-300">{address}</p>
              </div>
            </div>
            
            <Button
              onClick={() => window.open(mapsUrl, '_blank')}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white gap-2 shadow-lg"
            >
              <MapPin className="w-4 h-4" />
              View on Maps
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  );
}
