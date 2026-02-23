import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Sparkles } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <p className="text-gray-700 leading-relaxed text-lg">
            At TezWeb, we take your privacy seriously. This Privacy Policy explains how we 
            collect, use, disclose, and safeguard your information when you use our website 
            builder platform. Please read this privacy policy carefully.
          </p>
        </div>

        {/* Information We Collect */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
              <p className="text-gray-700 mb-2">When you create an account or website, we may collect:</p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• Mobile phone number (for authentication)</li>
                <li>• Business name and category</li>
                <li>• WhatsApp contact number</li>
                <li>• Business address and location</li>
                <li>• Social media profile links (if provided)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Website Content</h3>
              <p className="text-gray-700 mb-2">Content you create on TezWeb including:</p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• Product information (names, descriptions, prices)</li>
                <li>• Images uploaded for products and gallery</li>
                <li>• Custom text and taglines</li>
                <li>• Voice inputs (converted to text)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Usage Data</h3>
              <p className="text-gray-700 mb-2">We automatically collect certain information including:</p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• Website analytics (views, clicks, interactions)</li>
                <li>• Device information and browser type</li>
                <li>• IP address and location data</li>
                <li>• Time and date of access</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Use Your Information */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
          </div>
          
          <p className="text-gray-700 mb-4">We use the collected information for:</p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">1.</span>
              <span><strong>Providing Services:</strong> To create, host, and manage your business website</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">2.</span>
              <span><strong>Authentication:</strong> To verify your identity and secure your account</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">3.</span>
              <span><strong>Analytics:</strong> To provide you with insights about your website performance</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">4.</span>
              <span><strong>Communication:</strong> To send important updates about your account and services</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">5.</span>
              <span><strong>Improvement:</strong> To enhance our platform and user experience</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">6.</span>
              <span><strong>Support:</strong> To respond to your queries and provide customer support</span>
            </li>
          </ul>
        </div>

        {/* Data Security */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
          </div>
          
          <p className="text-gray-700 leading-relaxed text-lg">
            We implement appropriate technical and organizational security measures to protect 
            your personal information. However, please note that no method of transmission over 
            the Internet or electronic storage is 100% secure. Your data is stored locally in 
            your browser for the current version of TezWeb.
          </p>
        </div>

        {/* Data Sharing */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Data Sharing</h2>
          </div>
          
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            We do NOT sell or rent your personal information to third parties. We may share 
            information only in these circumstances:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li>• <strong>With your consent:</strong> When you explicitly authorize us</li>
            <li>• <strong>Public websites:</strong> Information you choose to display publicly on your published website</li>
            <li>• <strong>Legal requirements:</strong> When required by law or to protect rights</li>
            <li>• <strong>Service providers:</strong> Trusted partners who help us operate our platform (under strict confidentiality)</li>
          </ul>
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
          
          <p className="text-gray-700 mb-4">You have the right to:</p>
          <ul className="space-y-3 text-gray-700">
            <li>• Access your personal data stored in our platform</li>
            <li>• Update or correct your information</li>
            <li>• Delete your account and associated data</li>
            <li>• Export your website data</li>
            <li>• Opt-out of marketing communications</li>
            <li>• Request information about how your data is used</li>
          </ul>
        </div>

        {/* Cookies */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies & Local Storage</h2>
          
          <p className="text-gray-700 leading-relaxed text-lg">
            TezWeb uses browser local storage to save your website data and preferences on your 
            device. This allows you to continue editing your website across sessions. You can 
            clear this data anytime through your browser settings.
          </p>
        </div>

        {/* Children's Privacy */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
          
          <p className="text-gray-700 leading-relaxed text-lg">
            TezWeb is intended for business owners and is not directed at children under 18. 
            We do not knowingly collect personal information from children. If you believe we 
            have collected data from a child, please contact us immediately.
          </p>
        </div>

        {/* Changes to Policy */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
          
          <p className="text-gray-700 leading-relaxed text-lg">
            We may update this Privacy Policy from time to time. We will notify you of any 
            changes by updating the "Last updated" date at the top of this policy. We encourage 
            you to review this policy periodically.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Questions About Privacy?</h2>
          <p className="text-xl mb-6 text-blue-100">
            If you have questions or concerns about this Privacy Policy or our data practices
          </p>
          <p className="text-lg">
            Contact us at: <strong className="text-white">contact@tezweb.in</strong>
          </p>
        </div>
      </main>
    </div>
  );
}
