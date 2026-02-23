import { useEffect, useState } from 'react';
import { MessageSquare, User } from 'lucide-react';
import StarRating from './StarRating';
import { getProductReviews, getProductRatingStats } from '@/lib/reviews';
import { ProductReview } from '@/types/website';

interface ReviewListProps {
  productId: string;
  refreshTrigger?: number;
}

export default function ReviewList({ productId, refreshTrigger }: ReviewListProps) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });

  useEffect(() => {
    loadReviews();
  }, [productId, refreshTrigger]);

  const loadReviews = () => {
    const productReviews = getProductReviews(productId);
    const productStats = getProductRatingStats(productId);
    
    setReviews(productReviews);
    setStats(productStats);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (reviews.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <MessageSquare className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">No Reviews Yet</h3>
        <p className="text-sm text-gray-600">
          Be the first to review this product!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-4xl font-bold text-gray-900 mb-1">
              {stats.averageRating.toFixed(1)}
            </div>
            <StarRating rating={stats.averageRating} size="md" />
            <p className="text-sm text-gray-600 mt-1">
              Based on {stats.totalReviews} {stats.totalReviews === 1 ? 'review' : 'reviews'}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-1 flex-1 max-w-xs ml-8">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution];
              const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;

              return (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-700 w-6">{rating}★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900">Customer Reviews</h3>
        
        {reviews.map(review => (
          <div
            key={review.id}
            className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              {/* User Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>

              {/* Review Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                    <p className="text-xs text-gray-500">{formatDate(review.timestamp)}</p>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                </div>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {review.comment}
                </p>

                {review.verified && (
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    ✓ Verified Purchase
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
