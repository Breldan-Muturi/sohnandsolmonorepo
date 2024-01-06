'use client';
import {
  Button,
  Command,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@shadcn/index';
import { cn } from '@shadcn/lib/utils';
import { CommandEmpty } from 'cmdk';
import { ChevronDown } from 'lucide-react';
import React from 'react';

export interface Filter {
  label: string;
  placeholder?: string;
  options: string[];
}

interface SingleFilter extends React.HTMLAttributes<HTMLElement> {
  filter: Filter;
}

const SingleFilter: React.FC<SingleFilter> = ({ filter, className }) => {
  const { label, options, placeholder } = filter;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className={cn(
            'flex flex-1 py-6 px-4 justify-between items-center rounded-none',
            className
          )}
        >
          {label}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={placeholder ?? `Search ${label}`} />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup>
              {options.map((option, i) => {
                const key = `${i}-${option}`;
                return (
                  <CommandItem key={key} value={option}>
                    {option}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SingleFilter;
