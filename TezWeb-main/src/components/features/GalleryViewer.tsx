import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '@/types/website';
import { Button } from '@/components/ui/button';

interface GalleryViewerProps {
  images: GalleryImage[];
}

export default function GalleryViewer({ images }: GalleryViewerProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) return null;

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-2">
        {images.slice(0, 4).map((image, index) => (
          <button
            key={image.id}
            onClick={() => openLightbox(index)}
            className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group"
          >
            <img
              src={image.url}
              alt={image.caption || `Gallery image ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {index === 3 && images.length > 4 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  +{images.length - 4}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* View All Button */}
      {images.length > 4 && (
        <Button
          variant="outline"
          className="w-full mt-2"
          onClick={() => openLightbox(0)}
        >
          View All Photos ({images.length})
        </Button>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black z-[200] flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-7 h-7 text-white" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-7 h-7 text-white" />
              </button>
            </>
          )}

          {/* Image */}
          <div className="relative max-w-6xl max-h-[90vh] mx-auto px-16">
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].caption || `Gallery image ${currentIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
            {images[currentIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-center text-lg">
                  {images[currentIndex].caption}
                </p>
              </div>
            )}
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-white text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
