import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import LandingPage from '@/pages/LandingPage';
import TemplateGalleryPage from '@/pages/TemplateGalleryPage';
import CreateWebsitePage from '@/pages/CreateWebsitePage';
import PreviewPage from '@/pages/PreviewPage';
import EditorPage from '@/pages/EditorPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import PublishedSitePage from '@/pages/PublishedSitePage';
import DashboardPage from '@/pages/DashboardPage';
import AboutPage from '@/pages/AboutPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/templates" element={<TemplateGalleryPage />} />
        <Route path="/create" element={<CreateWebsitePage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/site/:slug" element={<PublishedSitePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </Router>
  );
}

export default App;
