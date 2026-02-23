import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send, X } from 'lucide-react';
import StarRating from './StarRating';
import { addReview } from '@/lib/reviews';
import { toast } from 'sonner';

interface ReviewFormProps {
  productId: string;
  websiteId: string;
  productName: string;
  onReviewSubmitted: () => void;
  onCancel?: () => void;
}

export default function ReviewForm({
  productId,
  websiteId,
  productName,
  onReviewSubmitted,
  onCancel,
}: ReviewFormProps) {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a review');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate submission delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      addReview({
        productId,
        websiteId,
        userName: userName.trim(),
        rating,
        comment: comment.trim(),
      });

      toast.success('Thank you for your review! 🌟');
      
      // Reset form
      setUserName('');
      setRating(0);
      setComment('');
      
      onReviewSubmitted();
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
      console.error('Review submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-900">Write a Review</h3>
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Name Input */}
      <div className="space-y-2">
        <Label htmlFor="userName" className="text-sm font-semibold text-gray-700">
          Your Name *
        </Label>
        <Input
          id="userName"
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          maxLength={50}
          className="h-11"
          required
        />
      </div>

      {/* Rating Input */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-gray-700">
          Your Rating *
        </Label>
        <div className="flex items-center gap-2">
          <StarRating
            rating={rating}
            interactive={true}
            onRatingChange={setRating}
            size="lg"
          />
          {rating > 0 && (
            <span className="text-sm font-medium text-gray-700">
              {rating} out of 5
            </span>
          )}
        </div>
      </div>

      {/* Comment Textarea */}
      <div className="space-y-2">
        <Label htmlFor="comment" className="text-sm font-semibold text-gray-700">
          Your Review *
        </Label>
        <Textarea
          id="comment"
          placeholder={`Share your experience with ${productName}...`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          maxLength={500}
          className="resize-none"
          required
        />
        <p className="text-xs text-gray-500 text-right">
          {comment.length}/500 characters
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting || !userName || rating === 0 || !comment}
        className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
      >
        {isSubmitting ? (
          <>Submitting...</>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Review
          </>
        )}
      </Button>
    </form>
  );
}
