import { Card, CardContent, CardHeader, CardTitle } from '@shadcn/index';
import { PackageEntity } from '@sohnandsol/shared-modules';
import Image from 'next/image';
import React from 'react';

const PackageCard: React.FC<PackageEntity> = ({
  about,
  ammenities,
  startDate,
  endDate,
  photos,
  reviews,
  title,
  destinations,
}) => {
  // Calculate the duration in days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Check if there are more than 2 destinations
  const additionalDestinations =
    destinations.length > 2 ? ` and ${destinations.length - 2} more` : '';
  const displayedDestinations = destinations
    .slice(0, 2)
    .map((d) => d.name)
    .join(', ');
  return (
    <Card className="h-96 col-span-1">
      <div className="w-full h-2/5 relative">
        <Image
          src={photos[0]}
          alt={about}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-none space-y-1">
          <li>
            <p>
              <span className="font-bold">
                {destinations?.length > 0 ? 'Destinations: ' : 'Destination: '}
              </span>{' '}
              {displayedDestinations}
              {additionalDestinations}
            </p>
          </li>
          <li>
            <p>
              <span className="font-bold">Duration: </span>
              {duration} {`day${duration > 1 ? 's' : ''}`}
            </p>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
