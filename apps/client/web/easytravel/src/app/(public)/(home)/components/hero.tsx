import { buttonVariants } from '@shadcn/index';
import { cn } from '@shadcn/lib/utils';
import { LucideUserCircle2 } from 'lucide-react';
import Link from 'next/link';
import easytravelbg from '@shadcn/sohnandsolIcons/easytravelbg.png';
import React from 'react';
import Image from 'next/image';
import Filters from './filters';
import { Filter } from './single-filter';

interface NavLinks {
  label: string;
  href: string;
}

const navigationLinks: NavLinks[] = [
  {
    label: 'Destinations',
    href: '/destinations',
  },
  {
    label: 'Adventure styles',
    href: '/adventures',
  },
  {
    label: 'Deals',
    href: '/deals',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

const filterBarFilters: Filter[] = [
  {
    label: 'Destination',
    options: ['Tokyo', 'Dubai', 'CapeTown', 'Mombasa', 'Naivasha', 'Monaco'],
    placeholder: 'Search destinations',
  },
  {
    label: 'Duration',
    options: ['2 days', '4 days', '10 days'],
    placeholder: 'Search durations',
  },
  {
    label: 'Meals',
    options: ['Full board', 'Half Board', 'Breakfast only'],
    placeholder: 'Search meals',
  },
  {
    label: 'Accomodation',
    options: [
      'Voyager Hotel',
      'Marriot Hotel',
      'Hilton Hotel',
      'Sarova Stanley',
    ],
  },
  {
    label: 'Transport',
    options: ['Flights', 'Trains', 'Buses'],
  },
  {
    label: 'Sort',
    options: [
      'Price ascending',
      'Price descending',
      'Start date',
      'Destinations count',
    ],
  },
];

const Hero = () => {
  return (
    <div className="relative w-full">
      <Image
        src={easytravelbg}
        alt="Easy travel bg image"
        quality={100}
        className="w-full"
      />
      <div className="flex justify-between absolute top-6 w-full left-1/2 transform -translate-x-1/2 px-4">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'link' }),
            'font-caveat font-bold text-[40px]'
          )}
        >
          Easy Travel
        </Link>
        <nav className="flex space-x-2">
          {navigationLinks.map((navLink, i) => {
            const { label, href } = navLink;
            return (
              <Link
                key={`${i}-${label}-${href}`}
                href={href}
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'font-arimo text-white'
                )}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="http://localhost:3000/dashboard"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'font-arimo rounded-3xl border-2 border-white text-white'
            )}
          >
            <LucideUserCircle2 className="mr-2" />
            Login/Register
          </Link>
        </nav>
      </div>
      <div className="flex flex-col space-y-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center w-full px-4 text-white">
        <h1 className="text-6xl font-caveat font-bold">Travel Made Easy</h1>
        <h2 className="whitespace-nowrap font-semibold">
          Compare thousands of tours around the world, read in-depth trip
          reviews and enjoy exclusive online savings
        </h2>
      </div>
      <Filters
        filters={filterBarFilters}
        className="absolute bottom-12 w-full px-8"
      />
    </div>
  );
};

export default Hero;
