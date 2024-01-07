import { buttonVariants } from '@shadcn/index';
import { cn } from '@shadcn/lib/utils';
import Link from 'next/link';
import React from 'react';

export interface PageSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  buttonLabel?: string;
  href: string;
  children: React.ReactNode;
}

const PageSection: React.FC<PageSectionProps> = ({
  title,
  buttonLabel = 'VIEW ALL',
  href,
  className,
  children,
}) => {
  return (
    <div className="flex flex-col w-4/5 py-4">
      <div className={cn('flex items-center justify-between pb-4', className)}>
        <h2 className="text-[32px] font-bold">{title}</h2>
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'border-gray-700'
          )}
        >
          {buttonLabel}
        </Link>
      </div>
      {children}
    </div>
  );
};

export default PageSection;
