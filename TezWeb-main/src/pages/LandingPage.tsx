import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { completeEmailLinkLogin, isAuthenticated } from '@/lib/auth';
import LoginModal from '@/components/features/LoginModal';
import PublicDashboard from '@/components/features/PublicDashboard';

export default function LandingPage() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const completeLogin = async () => {
      const result = await completeEmailLinkLogin();
      if (result.success) {
        navigate('/dashboard');
      }
    };

    void completeLogin();
  }, [navigate]);

  const handleBuildWebsite = () => {
    if (isAuthenticated()) {
      navigate('/create');
      return;
    }

    setShowLoginModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <header className="sticky top-0 z-30 border-b border-white/50 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900">TezWeb</p>
              <p className="text-[11px] text-slate-500">Website in under 30 seconds</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated() && (
              <Button onClick={() => navigate('/dashboard')} variant="outline" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            )}
            <Button onClick={handleBuildWebsite} className="bg-gradient-to-r from-blue-600 to-purple-600">
              Build Website
            </Button>
          </div>
        </div>
      </header>

      <PublicDashboard
        onBrowseTemplates={() => navigate('/templates')}
        onBuildWebsite={handleBuildWebsite}
      />

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => navigate('/create')}
        />
      )}
    </div>
  );
}
