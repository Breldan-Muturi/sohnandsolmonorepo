import { Avatar, AvatarFallback, AvatarImage } from '@shadcn/index';
import { cn } from '@shadcn/lib/utils';
import React from 'react';

interface AvatarCustomProps extends React.HTMLAttributes<HTMLElement> {
  imageSrc: string;
  alt?: string;
  fallBack: React.ReactNode;
}

const AvatarCustom: React.FC<AvatarCustomProps> = ({
  imageSrc,
  alt,
  fallBack,
  className,
}) => {
  return (
    <Avatar
      className={cn('ring-2 ring-[#5EE5EB] p-0.5 w-[52px] h-[52px]', className)}
    >
      <AvatarImage src={imageSrc} alt={alt} className="rounded-full" />
      <AvatarFallback>{fallBack}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarCustom;
