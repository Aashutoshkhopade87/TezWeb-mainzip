import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Plus,
  Edit,
  Trash2,
  Eye,
  Share2,
  LogOut,
  User,
  Globe,
  Calendar,
  BarChart3,
  Crown,
  AlertTriangle,
} from 'lucide-react';
import { getCurrentUser, logout } from '@/lib/auth';
import { getUserWebsites, deleteWebsite, saveWebsiteToStorage } from '@/lib/websiteGenerator';
import { initializeAnalytics } from '@/lib/analytics';
import { UserSubscription, WebsiteData } from '@/types/website';
import { toast } from 'sonner';
import LoginModal from '@/components/features/LoginModal';
import PublishDialog from '@/components/features/PublishDialog';
import AnalyticsView from '@/components/features/AnalyticsView';
import UpgradePlanDialog from '@/components/features/UpgradePlanDialog';
import { canCreateWebsite, enforceExpiryForUser, getPlanWebsiteLimit } from '@/lib/subscription';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [websites, setWebsites] = useState<WebsiteData[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [publishWebsite, setPublishWebsite] = useState<WebsiteData | null>(null);
  const [analyticsWebsite, setAnalyticsWebsite] = useState<WebsiteData | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const refreshData = async () => {
    if (!user) return;

    const activeSubscription = await enforceExpiryForUser(user.uid);
    setSubscription(activeSubscription);

    const userWebsites = getUserWebsites(user.uid);
    setWebsites(userWebsites.sort((a, b) =>
      new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime()
    ));

    userWebsites.forEach((website) => {
      initializeAnalytics(website.id);
    });
  };

  useEffect(() => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    void refreshData();
  }, [user]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleEdit = (website: WebsiteData) => {
    saveWebsiteToStorage(website);
    navigate('/editor');
  };

  const handlePreview = (website: WebsiteData) => {
    saveWebsiteToStorage(website);
    navigate('/preview');
  };

  const handleDelete = (websiteId: string, businessName: string) => {
    if (confirm(`Are you sure you want to delete "${businessName}"? This action cannot be undone.`)) {
      deleteWebsite(websiteId);
      setWebsites((prev) => prev.filter((w) => w.id !== websiteId));
      toast.success('Website deleted successfully');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (!user) {
    return (
      <LoginModal
        onClose={() => navigate('/')}
        onLoginSuccess={() => {
          setUser(getCurrentUser());
          setShowLoginModal(false);
        }}
      />
    );
  }

  const planLimit = subscription ? getPlanWebsiteLimit(subscription) : 0;
  const createAllowed = subscription ? canCreateWebsite(subscription, websites.length) : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TezWeb Dashboard
                </h1>
                <p className="text-xs text-gray-500">Manage your websites</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={() => setShowUpgrade(true)} variant="outline" className="gap-2 border-amber-300 text-amber-700">
                <Crown className="w-4 h-4" /> Upgrade
              </Button>
              <Button
                onClick={() => (createAllowed ? navigate('/templates') : setShowUpgrade(true))}
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Create New</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Welcome Back!</h2>
                <p className="text-gray-600">{user.phoneNumber || user.email}</p>
                <p className="text-sm text-gray-500">Member since {formatDate(user.createdAt)}</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {subscription && (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-8">
            <p className="text-sm text-gray-700">
              Plan: <strong className="capitalize">{subscription.plan}</strong> • Status: <strong className="capitalize">{subscription.status}</strong> •
              Website limit: <strong>{planLimit}</strong>
            </p>
            {subscription.status === 'expired' && (
              <div className="mt-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm flex items-center justify-between">
                <span className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Subscription expired. Websites were auto-unpublished.</span>
                <Button size="sm" onClick={() => setShowUpgrade(true)}>Renew</Button>
              </div>
            )}
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Websites</h2>
            <p className="text-gray-600">{websites.length} {websites.length === 1 ? 'website' : 'websites'} created</p>
          </div>
        </div>

        {websites.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Websites Yet</h3>
              <p className="text-gray-600 mb-6">Create your first website in just 2 minutes with AI</p>
              <Button onClick={() => (createAllowed ? navigate('/templates') : setShowUpgrade(true))} className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-5 h-5" />
                Create Your First Website
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((website) => (
              <div key={website.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-40 overflow-hidden bg-gray-100">
                  <img src={website.bannerImage} alt={website.businessName} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold text-lg truncate">{website.businessName}</h3>
                    <p className="text-white/90 text-sm truncate">{website.tagline}</p>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-white capitalize shadow-lg" style={{ backgroundColor: website.primaryColor }}>
                      {website.category}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /><span>{formatDate(website.updatedAt || website.createdAt)}</span></div>
                    <span className="text-gray-500">{website.products.length} products</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={() => handleEdit(website)} variant="outline" size="sm" className="gap-2"><Edit className="w-4 h-4" />Edit</Button>
                    <Button onClick={() => handlePreview(website)} variant="outline" size="sm" className="gap-2"><Eye className="w-4 h-4" />Preview</Button>
                    <Button onClick={() => setAnalyticsWebsite(website)} variant="outline" size="sm" className="gap-2 text-purple-600 hover:bg-purple-50 border-purple-200"><BarChart3 className="w-4 h-4" />Analytics</Button>
                    <Button onClick={() => setPublishWebsite(website)} variant="outline" size="sm" className="gap-2 text-green-600 hover:bg-green-50 border-green-200"><Share2 className="w-4 h-4" />Publish</Button>
                  </div>

                  <Button onClick={() => handleDelete(website.id, website.businessName)} variant="outline" size="sm" className="gap-2 text-red-600 hover:bg-red-50 border-red-200 w-full mt-2">
                    <Trash2 className="w-4 h-4" />Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {publishWebsite && (
        <PublishDialog
          website={publishWebsite}
          subscription={subscription}
          onRequireUpgrade={() => setShowUpgrade(true)}
          onClose={() => setPublishWebsite(null)}
        />
      )}

      {analyticsWebsite && <AnalyticsView website={analyticsWebsite} onClose={() => setAnalyticsWebsite(null)} />}

      {showUpgrade && user && (
        <UpgradePlanDialog
          userId={user.uid}
          onClose={() => setShowUpgrade(false)}
          onUpgraded={() => void refreshData()}
        />
      )}

      {showLoginModal && (
        <LoginModal
          onClose={() => navigate('/')}
          onLoginSuccess={() => {
            setUser(getCurrentUser());
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
}
