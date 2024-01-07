import { cn } from '@shadcn/lib/utils';
import { ReadDestinationsDto } from '@sohnandsol/shared-modules';
import Image from 'next/image';
import React from 'react';

interface DestinationCardProps extends React.HTMLAttributes<HTMLElement> {
  destination: ReadDestinationsDto;
  aspectRatio?: 'portrait' | 'square';
  width?: number;
  height?: number;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  aspectRatio = 'portrait',
  width = 240,
  height = 330,
  className,
  ...props
}) => {
  const { image, name, packagesCount } = destination;
  return (
    <div className={cn('space-y-3', className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <Image
          src={image}
          alt={`${name}'s destination cover image`}
          width={width}
          height={height}
          className={cn(
            'h-auto w-auto object-cover transition-all hover:scale-105',
            aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
          )}
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{name}</h3>
        <p className="text-xs text-muted-foreground">{`${packagesCount} ${
          packagesCount - 1 > 1 ? 'packages' : 'package'
        }`}</p>
      </div>
    </div>
  );
};

export default DestinationCard;
