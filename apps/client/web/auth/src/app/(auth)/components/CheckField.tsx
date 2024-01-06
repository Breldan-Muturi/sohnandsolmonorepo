import React from 'react';
import { AccountField } from '../authValidators';
import {
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@shadcn/index';
import { useFormContext } from 'react-hook-form';
import { cn } from '@shadcn/lib/utils';
import Link from 'next/link';

const CheckField: React.FC<AccountField> = (accountField) => {
  const { name, className } = accountField;
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const { value, onChange } = field;

        return (
          <FormItem
            className={cn(
              'flex space-y-0 items-center justify-center space-x-2 col-span-2',
              className
            )}
          >
            <FormControl>
              <Checkbox
                className="p-0"
                checked={value}
                onCheckedChange={onChange}
              />
            </FormControl>
            <FormLabel>
              <span className="text-sm text-gray-500 font-normal">
                I agree to the Sohn and Sol&nbsp;
              </span>
              {/* To Do: Add theming font and color  */}
              <Link
                href="./termsOfService"
                className="text-sm text-[#030C4F] underline font-normal"
              >
                Terms of Service&nbsp;
              </Link>
              <span className="text-sm text-gray-500 font-normal">&&nbsp;</span>
              {/* To Do: Add theming font and color  */}
              <Link
                href="./privacyPolicy"
                className="text-sm text-[#030C4F] underline font-normal"
              >
                Privacy Policy
              </Link>
            </FormLabel>
          </FormItem>
        );
      }}
    />
  );
};

export default CheckField;
