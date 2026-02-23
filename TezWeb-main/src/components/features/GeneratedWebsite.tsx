import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, MapPin, Instagram, Facebook, Twitter, Images, Phone, Map, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WebsiteData } from '@/types/website';
import { generateWhatsAppLink } from '@/lib/websiteGenerator';
import { getProductRatingStats } from '@/lib/reviews';
import { trackWhatsAppClick, trackCallClick, trackDirectionsClick } from '@/lib/analytics';
import GalleryViewer from './GalleryViewer';
import StarRating from './StarRating';

interface GeneratedWebsiteProps {
  website: WebsiteData;
  isPreview?: boolean;
}

export default function GeneratedWebsite({ website, isPreview = false }: GeneratedWebsiteProps) {
  const navigate = useNavigate();
  const [productRatings, setProductRatings] = useState<Record<string, { averageRating: number; totalReviews: number }>>({});

  useEffect(() => {
    // Load ratings for all products
    const ratings: Record<string, { averageRating: number; totalReviews: number }> = {};
    website.products.forEach(product => {
      const stats = getProductRatingStats(product.id);
      ratings[product.id] = {
        averageRating: stats.averageRating,
        totalReviews: stats.totalReviews,
      };
    });
    setProductRatings(ratings);
  }, [website.products]);

  const handleWhatsAppOrder = (productName: string, productId: string) => {
    const link = generateWhatsAppLink(
      website.whatsappNumber,
      productName,
      website.businessName
    );
    
    // Track WhatsApp click if not in preview mode
    if (!isPreview) {
      trackWhatsAppClick(website.id, productId, productName);
    }
    
    window.open(link, '_blank');
  };

  const handleCallClick = () => {
    // Track call click if not in preview mode
    if (!isPreview) {
      trackCallClick(website.id);
    }
    
    // Open phone dialer
    const phoneNumber = website.whatsappNumber.replace(/\D/g, '');
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleDirectionsClick = () => {
    // Track directions click if not in preview mode
    if (!isPreview) {
      trackDirectionsClick(website.id);
    }
    
    // Open Google Maps with address
    const encodedAddress = encodeURIComponent(website.shopAddress);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={website.bannerImage}
          alt={website.businessName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-2xl font-bold mb-1">{website.businessName}</h1>
          <div className="flex items-start gap-2 mb-2">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-200">{website.shopAddress}</p>
          </div>
          <p className="text-sm text-gray-200">{website.tagline}</p>
        </div>
      </div>

      {/* Social Media - Top Section */}
      <div className="px-4 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-center gap-4">
          {website.socialLinks.instagram && (
            <a
              href={website.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300">
                <Instagram className="w-6 h-6 text-white" />
              </div>
            </a>
          )}
          {website.socialLinks.facebook && (
            <a
              href={website.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1877F2] flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300">
                <Facebook className="w-6 h-6 text-white" fill="currentColor" />
              </div>
            </a>
          )}
          {website.socialLinks.twitter && (
            <a
              href={website.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 border border-gray-300">
                <Twitter className="w-6 h-6 text-white" fill="currentColor" />
              </div>
            </a>
          )}
        </div>
      </div>

      {/* Products Section */}
      <div className="px-4 py-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Our Products</h2>
        <div className="space-y-4">
          {website.products.map((product) => {
            const productImages = product.images || [product.image];
            const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
            
            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="p-4">
                  {/* Product Images */}
                  <div className="relative mb-3">
                    <img
                      src={productImages[currentImageIndex]}
                      alt={`${product.name} - ${currentImageIndex + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    
                    {/* Image Counter */}
                    {productImages.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                        {currentImageIndex + 1} / {productImages.length}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {productImages.length > 1 && (
                    <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                      {productImages.map((img, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(index);
                          }}
                          className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
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
                  )}

                  {/* Product Details */}
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      {product.name}
                    </h3>
                    
                    {/* Rating */}
                    {productRatings[product.id]?.totalReviews > 0 && (
                      <div className="mb-2">
                        <StarRating
                          rating={productRatings[product.id].averageRating}
                          size="sm"
                          showCount={true}
                          count={productRatings[product.id].totalReviews}
                        />
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {product.description}
                    </p>
                    <p 
                      className="text-xl font-bold mb-3"
                      style={{ color: website.primaryColor }}
                    >
                      {product.price}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${product.id}`);
                        }}
                        variant="outline"
                        className="flex-1"
                        size="sm"
                      >
                        View Details
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsAppOrder(product.name, product.id);
                        }}
                        className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2"
                        size="sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Order
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Photo Gallery Section */}
      {website.gallery && website.gallery.length > 0 && (
        <div className="px-4 pb-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Images className="w-5 h-5" style={{ color: website.primaryColor }} />
              <h2 className="text-lg font-bold text-gray-900">Our Gallery</h2>
            </div>
            <GalleryViewer images={website.gallery} />
          </div>
        </div>
      )}

      {/* Location Map Section */}
      <div className="px-4 pb-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Map className="w-5 h-5" style={{ color: website.primaryColor }} />
              <h2 className="text-lg font-bold text-gray-900">Our Location</h2>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>{website.shopAddress}</p>
            </div>
          </div>
          
          {/* Google Maps Embed */}
          <div className="relative w-full h-64 bg-gray-100">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(website.shopAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
          
          {/* Get Directions Button */}
          <div className="p-4">
            <Button
              onClick={handleDirectionsClick}
              className="w-full gap-2 h-12"
              style={{ backgroundColor: website.primaryColor }}
            >
              <Navigation className="w-5 h-5" />
              Get Directions
            </Button>
          </div>
        </div>
      </div>



      {/* Contact Section */}
      <div className="px-4 pb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Us</h2>
          <div className="space-y-3">
            <Button
              onClick={handleCallClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2 h-12"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </Button>
            <Button
              onClick={() => {
                const link = `https://wa.me/${website.whatsappNumber.replace(/\D/g, '')}`;
                if (!isPreview) {
                  trackCallClick(website.id);
                }
                window.open(link, '_blank');
              }}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2 h-12"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-4 text-sm">
              <button
                onClick={() => navigate('/about')}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                About Us
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => navigate('/privacy')}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Privacy Policy
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Powered by TezWeb
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
