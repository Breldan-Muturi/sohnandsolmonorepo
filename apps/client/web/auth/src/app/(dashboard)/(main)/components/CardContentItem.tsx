import { buttonVariants } from '@shadcn/index';
import { cn } from '@shadcn/lib/utils';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export interface CardContentItemProps
  extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description: string;
  href: string;
  cardContentIcon: React.JSX.Element;
  children?: React.ReactNode;
}

const CardContentItem: React.FC<CardContentItemProps> = ({
  title,
  description,
  href,
  cardContentIcon,
  children,
}) => {
  return (
    <div className="flex space-x-2">
      {cardContentIcon}
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-start w-full">
          <h4 className="text-base font-semibold">{title}</h4>
          {children}
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'rounded-full p-2 mt-1 ml-3'
          )}
        >
          <ExternalLink className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
};

export default CardContentItem;
