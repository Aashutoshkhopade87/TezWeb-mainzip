import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sparkles, AlertCircle } from 'lucide-react';
import { getPublishedWebsite } from '@/lib/publishWebsite';
import { trackView, initializeAnalytics } from '@/lib/analytics';
import { WebsiteData } from '@/types/website';
import GeneratedWebsite from '@/components/features/GeneratedWebsite';

export default function PublishedSitePage() {
  const { slug } = useParams<{ slug: string }>();
  const [website, setWebsite] = useState<WebsiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    console.log('PublishedSitePage loading for slug:', slug);
    
    if (!slug) {
      console.log('No slug provided');
      setNotFound(true);
      setLoading(false);
      return;
    }

    const publishedSite = getPublishedWebsite(slug);
    console.log('Published site found:', publishedSite);
    
    if (!publishedSite) {
      console.log('Website not found for slug:', slug);
      setNotFound(true);
      setLoading(false);
      return;
    }

    // Initialize analytics and track view
    initializeAnalytics(publishedSite.id);
    trackView(publishedSite.id);

    setWebsite(publishedSite);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4 animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading website...</p>
        </div>
      </div>
    );
  }

  if (notFound || !website) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Website Not Found</h1>
          <p className="text-gray-600 mb-6">
            The website you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            Create Your Own Website
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Bar */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-700">
              Powered by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TezWeb</span>
            </span>
          </div>
        </div>
      </div>

      {/* Website Content */}
      <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen">
        <GeneratedWebsite website={website} isPreview={false} />
      </div>
    </div>
  );
}
