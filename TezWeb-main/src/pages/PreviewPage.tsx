import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Edit, ArrowLeft, ExternalLink, Share2 } from 'lucide-react';
import { getWebsiteFromStorage } from '@/lib/websiteGenerator';
import { WebsiteData } from '@/types/website';
import GeneratedWebsite from '@/components/features/GeneratedWebsite';
import PublishDialog from '@/components/features/PublishDialog';


export default function PreviewPage() {
  const navigate = useNavigate();
  const [website, setWebsite] = useState<WebsiteData | null>(null);
  const [showPublishDialog, setShowPublishDialog] = useState(false);

  useEffect(() => {
    const savedWebsite = getWebsiteFromStorage();
    console.log('Loaded website from storage:', savedWebsite);
    
    if (!savedWebsite) {
      navigate('/create');
      return;
    }
    
    setWebsite(savedWebsite);
  }, [navigate]);

  if (!website) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Control Bar */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Preview Mode</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowPublishDialog(true)}
              className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              size="sm"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Publish</span>
            </Button>
            
            <Button
              onClick={() => navigate('/editor')}
              variant="outline"
              className="gap-2"
              size="sm"
            >
              <Edit className="w-4 h-4" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Website Preview */}
      <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen">
        <GeneratedWebsite website={website} />
      </div>

      {/* Publish Dialog */}
      {showPublishDialog && (
        <PublishDialog
          website={website}
          onClose={() => setShowPublishDialog(false)}
        />
      )}
    </div>
  );
}
