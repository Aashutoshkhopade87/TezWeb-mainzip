import { ProductReview } from '@/types/website';

const REVIEWS_STORAGE_KEY = 'productReviews';

// Get all reviews
const getAllReviews = (): ProductReview[] => {
  const data = localStorage.getItem(REVIEWS_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Save all reviews
const saveAllReviews = (reviews: ProductReview[]): void => {
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
};

// Add a new review
export const addReview = (review: Omit<ProductReview, 'id' | 'timestamp'>): ProductReview => {
  const newReview: ProductReview = {
    ...review,
    id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
  };

  const allReviews = getAllReviews();
  allReviews.push(newReview);
  saveAllReviews(allReviews);

  return newReview;
};

// Get reviews for a specific product
export const getProductReviews = (productId: string): ProductReview[] => {
  const allReviews = getAllReviews();
  return allReviews
    .filter(review => review.productId === productId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Get reviews for a website
export const getWebsiteReviews = (websiteId: string): ProductReview[] => {
  const allReviews = getAllReviews();
  return allReviews
    .filter(review => review.websiteId === websiteId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Calculate product rating statistics
export const getProductRatingStats = (productId: string) => {
  const reviews = getProductReviews(productId);
  
  if (reviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    };
  }

  const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let totalRating = 0;

  reviews.forEach(review => {
    totalRating += review.rating;
    ratingDistribution[review.rating as keyof typeof ratingDistribution]++;
  });

  return {
    averageRating: totalRating / reviews.length,
    totalReviews: reviews.length,
    ratingDistribution,
  };
};

// Delete a review (optional, for moderation)
export const deleteReview = (reviewId: string): void => {
  const allReviews = getAllReviews();
  const filteredReviews = allReviews.filter(review => review.id !== reviewId);
  saveAllReviews(filteredReviews);
};
