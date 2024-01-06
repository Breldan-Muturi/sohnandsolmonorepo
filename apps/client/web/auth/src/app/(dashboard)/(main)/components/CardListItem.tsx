import { ChevronRight } from 'lucide-react';
import React from 'react';

export interface CardListItemProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  icon: React.ReactNode;
  handleClick?: () => void;
  href?: string;
}

const CardListItem: React.FC<CardListItemProps> = ({
  title,
  icon,
  handleClick,
  href,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        {icon}
        <p className="text-gray-600">{title}</p>
      </div>
      <ChevronRight className="w-6 h-6" />
    </div>
  );
};

export default CardListItem;
