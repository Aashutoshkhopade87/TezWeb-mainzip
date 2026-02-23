import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Target, Users, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="px-4 py-4 flex items-center justify-between max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
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

      {/* Main Content */}
      <main className="px-4 py-12 max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About TezWeb
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering small businesses in India to build their online presence in minutes
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            At TezWeb, we believe every small business deserves a professional online presence. 
            Our AI-powered platform makes it incredibly easy for shop owners, entrepreneurs, 
            and small businesses across India to create beautiful, mobile-first websites 
            without any coding knowledge or technical expertise.
          </p>
        </div>

        {/* Why We Built This */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-orange-600 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Why We Built This</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            We noticed that millions of small businesses in India struggle to establish 
            their online presence due to:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>High costs of hiring web developers</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>Complex website builders requiring technical knowledge</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>Language barriers in existing platforms</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>Lack of mobile-first solutions for local businesses</span>
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed text-lg mt-4">
            TezWeb solves all these problems by providing an AI-powered, simple, 
            affordable platform that anyone can use to create stunning websites in minutes.
          </p>
        </div>

        {/* What We Offer */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">What We Offer</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Generation</h3>
              <p className="text-sm text-gray-700">
                Just fill in your business details and let AI create a beautiful website
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-2">Easy Editing</h3>
              <p className="text-sm text-gray-700">
                Click to edit any section - no coding required
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-gray-900 mb-2">WhatsApp Integration</h3>
              <p className="text-sm text-gray-700">
                Customers can order directly via WhatsApp with one tap
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-gray-900 mb-2">Mobile-First Design</h3>
              <p className="text-sm text-gray-700">
                Optimized for Indian customers who primarily use smartphones
              </p>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
              <h3 className="font-semibold text-gray-900 mb-2">Voice Input Support</h3>
              <p className="text-sm text-gray-700">
                Speak in Hindi or any regional language to create your site
              </p>
            </div>
            <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
              <h3 className="font-semibold text-gray-900 mb-2">Analytics & Reviews</h3>
              <p className="text-sm text-gray-700">
                Track views, orders, and customer reviews in one dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Who We Serve */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Who We Serve</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            TezWeb is built for small business owners across India including:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'Local Shops',
              'Bakeries',
              'Clothing Stores',
              'Electronics Shops',
              'Restaurants',
              'Salons',
              'Pharmacies',
              'Grocery Stores',
              'Sweet Shops',
              'Gift Shops',
              'Boutiques',
              'Home Services',
            ].map((business) => (
              <span
                key={business}
                className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 rounded-full text-sm font-medium"
              >
                {business}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Website?</h2>
          <p className="text-xl mb-6 text-blue-100">
            Join thousands of small businesses growing their online presence with TezWeb
          </p>
          <Button
            onClick={() => navigate('/')}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 h-12"
          >
            Get Started for Free
          </Button>
        </div>
      </main>
    </div>
  );
}
