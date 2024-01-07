import { Card, CardContent, StarRating } from '@shadcn/index';
import { cn } from '@shadcn/lib/utils';
import { TourOperatorsEntity } from '@sohnandsol/shared-modules';
import Image from 'next/image';
import React from 'react';

interface TourOperatorsCardProps extends React.HTMLAttributes<HTMLElement> {
  tourOperator: TourOperatorsEntity;
  width?: number;
  height?: number;
}

const TourOperatorsCard: React.FC<TourOperatorsCardProps> = ({
  className,
  tourOperator,
  width = 50,
  height = 50,
}) => {
  const { name, reviews, image } = tourOperator;

  // Get the number of reviews
  const numberOfReviews = reviews.length;

  // Calculate average rating
  const averageRating =
    reviews.reduceRight((acc, review) => acc + review.rating, 0) /
    numberOfReviews;
  const roundedAverage = averageRating.toFixed(1);

  return (
    <Card
      className={cn('flex items-center space-x-2 p-2 rounded-none', className)}
    >
      <Image src={image} alt={`${name}'s logo`} width={width} height={height} />
      <CardContent className="w-full p-4">
        <h3 className="font-semibold">{name}</h3>
        <div className="flex w-full space-x-2 items-center">
          <p className="text-yellow-500">{roundedAverage}</p>
          <StarRating rating={+roundedAverage} />
          <p className="text-xs text-gray-500">{`${numberOfReviews} reviews`}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TourOperatorsCard;
