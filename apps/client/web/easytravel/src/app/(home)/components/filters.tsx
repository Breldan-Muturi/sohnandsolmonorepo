import React from 'react';
import SingleFilter, { Filter } from './single-filter';
import { cn } from '@shadcn/lib/utils';

interface FilterBar extends React.HTMLAttributes<HTMLElement> {
  filters: Filter[];
}

const Filters: React.FC<FilterBar> = ({ filters, className }) => {
  return (
    <div className={cn('flex w-full', className)}>
      {filters.map((filter, i) => {
        const key = `${i}-${filter}`;
        let filterClassName = '';
        if (i === 0) {
          filterClassName = 'rounded-l-full';
        } else if (i === filters.length - 1) {
          filterClassName = 'rounded-r-full';
        }
        return (
          <SingleFilter key={key} className={filterClassName} filter={filter} />
        );
      })}
    </div>
  );
};

export default Filters;
