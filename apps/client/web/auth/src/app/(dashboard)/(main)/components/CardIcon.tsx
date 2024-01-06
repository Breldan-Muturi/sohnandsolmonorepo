import { cn } from '@shadcn/lib/utils';
import React from 'react';

export interface CardIconProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const CardIcon: React.FC<CardIconProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'rounded-full ring-2 ring-[#030C4F] text-[#030C4F] w-12 h-12 p-2 mt-3',
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardIcon;
