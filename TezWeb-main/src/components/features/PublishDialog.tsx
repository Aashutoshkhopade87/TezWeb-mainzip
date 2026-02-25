import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Share2, Copy, Check, ExternalLink, AlertTriangle } from 'lucide-react';
import { WebsiteData, UserSubscription } from '@/types/website';
import { publishWebsite, copyLinkToClipboard } from '@/lib/publishWebsite';
import { canPublishWebsite } from '@/lib/subscription';
import { toast } from 'sonner';

interface PublishDialogProps {
  website: WebsiteData;
  subscription: UserSubscription | null;
  onRequireUpgrade: () => void;
  onClose: () => void;
}

export default function PublishDialog({ website, subscription, onRequireUpgrade, onClose }: PublishDialogProps) {
  const [published, setPublished] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const publishAllowed = subscription ? canPublishWebsite(subscription) : false;

  const handlePublish = () => {
    if (!publishAllowed) {
      toast.error('Plan expired. Upgrade to publish websites.');
      onRequireUpgrade();
      return;
    }

    setIsPublishing(true);

    setTimeout(() => {
      const { url } = publishWebsite(website);
      setPublishedUrl(url);
      setPublished(true);
      setIsPublishing(false);
      toast.success('Website published successfully! 🎉');
    }, 1500);
  };

  const handleCopyLink = async () => {
    const success = await copyLinkToClipboard(publishedUrl);
    if (success) {
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy link');
    }
  };

  const handleOpenSite = () => {
    window.open(publishedUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {!published ? (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4">
                <Share2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Publish Your Website</h2>
              <p className="text-gray-600">Your website will be live and accessible to anyone with the link</p>
            </div>

            {!publishAllowed && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-sm text-red-800">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5" />
                  <div>
                    <p className="font-semibold">Publish blocked</p>
                    <p>Your trial or subscription has expired. Upgrade to continue publishing.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">{website.businessName}</h3>
              <p className="text-sm text-gray-600 mb-1">Category: <span className="capitalize">{website.category}</span></p>
              <p className="text-sm text-gray-600">Products: {website.products.length}</p>
            </div>

            <Button
              onClick={handlePublish}
              disabled={isPublishing}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white gap-2 text-base font-semibold"
            >
              {isPublishing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Share2 className="w-5 h-5" />
                  Publish Website
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">🎉 Website Published!</h2>
              <p className="text-gray-600">Your website is now live and ready to share</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Website Link:</label>
              <div className="flex gap-2">
                <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 overflow-x-auto">
                  {publishedUrl}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleCopyLink}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Link
                  </>
                )}
              </Button>

              <Button onClick={handleOpenSite} variant="outline" className="w-full h-12 gap-2">
                <ExternalLink className="w-5 h-5" />
                Open Website
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
