'use client';
import { Star } from 'lucide-react';
import React from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  // Create an array representing each star (full, half, or empty)
  const stars = Array.from({ length: 5 }, (_, index) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = index === filledStars && rating % 1 > 0;
    if (index < filledStars) {
      return (
        <Star key={index} color="gold" fill="gold" className="text-gold" />
      );
    } else if (hasHalfStar) {
      return (
        <div key={index} className="relative w-6 h-6">
          <Star
            color="gold"
            fill="gold"
            className="absolute top-0 text-gold"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
          <Star
            color="gold"
            className="absolute top-0 text-gray-400"
            style={{ clipPath: 'inset(0 0 0 50%)' }}
          />
        </div>
      );
    }
    return <Star color="gold" />;
  });

  return (
    <div className="flex space-x-1">
      {stars.map((star, i) => (
        <span key={i}>{star}</span>
      ))}
    </div>
  );
};

export { StarRating };
