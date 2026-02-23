import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle, ChevronLeft, ChevronRight, Star, Edit3 } from 'lucide-react';
import { getWebsiteFromStorage, generateWhatsAppLink } from '@/lib/websiteGenerator';
import { trackProductView, trackWhatsAppClick } from '@/lib/analytics';
import { getProductRatingStats } from '@/lib/reviews';
import { WebsiteData, Product } from '@/types/website';
import StarRating from '@/components/features/StarRating';
import ReviewForm from '@/components/features/ReviewForm';
import ReviewList from '@/components/features/ReviewList';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [website, setWebsite] = useState<WebsiteData | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImageForZoom, setSelectedImageForZoom] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRefreshTrigger, setReviewRefreshTrigger] = useState(0);
  const [ratingStats, setRatingStats] = useState({ averageRating: 0, totalReviews: 0 });

  useEffect(() => {
    const savedWebsite = getWebsiteFromStorage();
    
    if (!savedWebsite) {
      navigate('/preview');
      return;
    }
    
    const foundProduct = savedWebsite.products.find(p => p.id === productId);
    
    if (!foundProduct) {
      navigate('/preview');
      return;
    }
    
    setWebsite(savedWebsite);
    setProduct(foundProduct);

    // Load rating stats
    const stats = getProductRatingStats(foundProduct.id);
    setRatingStats({
      averageRating: stats.averageRating,
      totalReviews: stats.totalReviews,
    });

    // Track product view
    trackProductView(savedWebsite.id, foundProduct.id, foundProduct.name);
  }, [productId, navigate, reviewRefreshTrigger]);

  if (!website || !product) {
    return null;
  }

  const productImages = product.images || [product.image];

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleWhatsAppOrder = () => {
    const link = generateWhatsAppLink(
      website.whatsappNumber,
      product.name,
      website.businessName
    );

    // Track WhatsApp click
    trackWhatsAppClick(website.id, product.id, product.name);
    
    window.open(link, '_blank');
  };

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    setReviewRefreshTrigger(prev => prev + 1);
    // Reload stats
    if (product) {
      const stats = getProductRatingStats(product.id);
      setRatingStats({
        averageRating: stats.averageRating,
        totalReviews: stats.totalReviews,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-gray-900 truncate">
              {product.name}
            </h1>
            <p className="text-xs text-gray-500">{website.businessName}</p>
          </div>
        </div>
      </div>

      {/* Main Image Gallery */}
      <div className="bg-white">
        <div className="relative">
          {/* Main Image */}
          <div 
            className="relative aspect-square bg-gray-100 cursor-zoom-in"
            onClick={() => setSelectedImageForZoom(productImages[currentImageIndex])}
          >
            <img
              src={productImages[currentImageIndex]}
              alt={`${product.name} - ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
            />
            
            {/* Image Counter */}
            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full">
              {currentImageIndex + 1} / {productImages.length}
            </div>

            {/* Navigation Arrows */}
            {productImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreviousImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {productImages.length > 1 && (
            <div className="px-4 py-3 overflow-x-auto">
              <div className="flex gap-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-blue-600 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="px-4 py-5 bg-white mt-2">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {product.name}
          </h2>
          <div className="flex items-baseline gap-2">
            <span 
              className="text-3xl font-bold"
              style={{ color: website.primaryColor }}
            >
              {product.price}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            {ratingStats.totalReviews > 0 ? (
              <>
                <StarRating rating={ratingStats.averageRating} size="md" />
                <span className="text-sm font-medium text-gray-900">
                  {ratingStats.averageRating.toFixed(1)}
                </span>
                <span className="text-sm text-gray-600">
                  ({ratingStats.totalReviews} {ratingStats.totalReviews === 1 ? 'review' : 'reviews'})
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-500">No reviews yet</span>
            )}
          </div>
          <Button
            onClick={() => setShowReviewForm(!showReviewForm)}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Write Review
          </Button>
        </div>

        {/* Product Description */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Product Description
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Product Details */}
      <div className="px-4 py-5 bg-white mt-2">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Product Details
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Category</span>
            <span className="text-sm font-medium text-gray-900 capitalize">
              {website.category}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Seller</span>
            <span className="text-sm font-medium text-gray-900">
              {website.businessName}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Available Images</span>
            <span className="text-sm font-medium text-gray-900">
              {productImages.length} photos
            </span>
          </div>
        </div>
      </div>

      {/* Seller Info */}
      <div className="px-4 py-5 bg-white mt-2">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Seller Information
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-700">
            <strong>{website.businessName}</strong>
          </p>
          <p className="text-sm text-gray-600">{website.shopAddress}</p>
          <p className="text-sm text-gray-600">
            Contact: {website.whatsappNumber}
          </p>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="px-4 py-5 bg-gray-50 mt-2">
          <ReviewForm
            productId={product.id}
            websiteId={website.id}
            productName={product.name}
            onReviewSubmitted={handleReviewSubmitted}
            onCancel={() => setShowReviewForm(false)}
          />
        </div>
      )}

      {/* Reviews List */}
      <div className="px-4 py-5 bg-white mt-2">
        <ReviewList productId={product.id} refreshTrigger={reviewRefreshTrigger} />
      </div>

      {/* Bottom Spacer for Fixed Button */}
      <div className="h-24"></div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-md mx-auto px-4 py-3 flex gap-3">
          <Button
            onClick={handleWhatsAppOrder}
            className="flex-1 h-12 bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2 text-base font-semibold shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Order on WhatsApp
          </Button>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {selectedImageForZoom && (
        <div 
          className="fixed inset-0 bg-black z-[200] flex items-center justify-center"
          onClick={() => setSelectedImageForZoom(null)}
        >
          <button
            onClick={() => setSelectedImageForZoom(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          
          <img
            src={selectedImageForZoom}
            alt={product.name}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
