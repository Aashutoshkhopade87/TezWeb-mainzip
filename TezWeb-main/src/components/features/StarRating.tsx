import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showCount?: boolean;
  count?: number;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
  showCount = false,
  count = 0,
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const handleClick = (value: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= Math.round(rating);
          const isPartiallyFilled = starValue > rating && starValue - 1 < rating;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(starValue)}
              disabled={!interactive}
              className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            >
              <Star
                className={`${sizeClasses[size]} ${
                  isFilled
                    ? 'fill-yellow-400 text-yellow-400'
                    : isPartiallyFilled
                    ? 'fill-yellow-200 text-yellow-400'
                    : 'fill-gray-200 text-gray-300'
                }`}
              />
            </button>
          );
        })}
      </div>
      
      {showCount && count > 0 && (
        <span className="text-sm text-gray-600 ml-1">
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
