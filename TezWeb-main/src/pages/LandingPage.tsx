import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Smartphone, Zap, Edit, Share2, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '@/lib/auth';
import LoginModal from '@/components/features/LoginModal';

export default function LandingPage() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCreateWebsite = () => {
    if (isAuthenticated()) {
      navigate('/create');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    navigate('/create');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TezWeb
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated() && (
              <Button 
                onClick={() => navigate('/dashboard')}
                variant="outline"
                className="gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            )}
            <Button 
              onClick={() => navigate('/templates')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Browse Templates
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-12 sm:py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Create Your Business Website
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              in Just 2 Minutes
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            No coding needed. Perfect for small Indian businesses. Mobile-first design with WhatsApp integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/templates')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6"
            >
              <Zap className="mr-2 h-5 w-5" />
              Browse Templates
            </Button>
            <Button 
              size="lg"
              onClick={handleCreateWebsite}
              variant="outline"
              className="text-lg px-8 py-6 border-2"
            >
              Quick Start
            </Button>
          </div>
        </div>

        {/* Preview Image */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-8 border-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&q=80" 
              alt="Website Preview"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Everything You Need to Go Online
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="AI-Powered"
              description="Generate beautiful websites instantly with AI"
              color="from-blue-500 to-blue-600"
            />
            <FeatureCard
              icon={<Smartphone className="w-8 h-8" />}
              title="Mobile-First"
              description="Looks perfect on every device, especially mobile"
              color="from-purple-500 to-purple-600"
            />
            <FeatureCard
              icon={<Edit className="w-8 h-8" />}
              title="Easy Editing"
              description="Edit text and images directly, no coding required"
              color="from-green-500 to-green-600"
            />
            <FeatureCard
              icon={<Share2 className="w-8 h-8" />}
              title="WhatsApp Orders"
              description="Customers order directly via WhatsApp"
              color="from-orange-500 to-orange-600"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          <div className="space-y-8">
            <StepCard
              number="1"
              title="Enter Business Details"
              description="Just your business name, category, and WhatsApp number"
            />
            <StepCard
              number="2"
              title="AI Generates Website"
              description="Get a beautiful, mobile-ready website in seconds"
            />
            <StepCard
              number="3"
              title="Edit & Customize"
              description="Change text, images, colors with simple editing tools"
            />
            <StepCard
              number="4"
              title="Share & Go Live"
              description="Share your website link and start receiving orders"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Take Your Business Online?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of Indian businesses growing with TezWeb
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/templates')}
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
          >
            Browse Templates Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 sm:px-6 lg:px-8 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto text-center">
          <p>© 2026 TezWeb. Built for small Indian businesses.</p>
        </div>
      </footer>

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

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
