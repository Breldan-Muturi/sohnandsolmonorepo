'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
  buttonVariants,
} from '@shadcn/index';
import { cn } from '@shadcn/lib/utils';
import Link from 'next/link';

export interface CardHomeProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  footerLink?: {
    label: string;
    href: string;
  };
  icon?: React.ReactNode;
  cardContent?: React.ReactNode;
}

const CardHome: React.FC<CardHomeProps> = ({
  title,
  subtitle,
  footerLink,
  icon,
  cardContent,
  className,
}) => {
  return (
    <Card className={cn('flex flex-col col-span-1', className)}>
      <div className="flex justify-between">
        <CardHeader className="flex-row space-x-3">
          <div className="flex flex-col space-y-3">
            <CardTitle>{title}</CardTitle>
            {subtitle && <CardDescription>{subtitle}</CardDescription>}
          </div>
          {icon}
        </CardHeader>
      </div>
      {cardContent && <CardContent>{cardContent}</CardContent>}
      {footerLink && (
        <div className="flex flex-col mt-auto">
          <Separator className="mt-2" />
          <CardFooter className="py-2">
            <Link
              href={footerLink.href}
              className={cn(buttonVariants({ variant: 'link' }), 'p-0')}
            >
              {footerLink.label}
            </Link>
          </CardFooter>
        </div>
      )}
    </Card>
  );
};

export default CardHome;
