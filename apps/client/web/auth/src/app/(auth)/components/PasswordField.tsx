'use client';
import React, { useState } from 'react';
import { AccountField } from '../authValidators';
import ComposableFormField from './ComposableFormField';
import { Button, FormControl, Input } from '@shadcn/index';
import { Eye, EyeOff } from 'lucide-react';

const PasswordField: React.FC<AccountField> = (accountField) => {
  const [visible, setVisible] = useState(false);
  const { placeholder } = accountField;
  const type = visible ? 'text' : 'password';
  const Icon = visible ? Eye : EyeOff;

  const handleSetVisible = () => {
    setVisible((prev) => (prev = !prev));
  };
  return (
    <ComposableFormField {...accountField}>
      {({ field }) => (
        <FormControl>
          <div className="relative flex items-center">
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className="pr-8"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full h-5 w-5 absolute right-0 mr-2"
              onClick={handleSetVisible}
            >
              <Icon className="h-4 w-4" />
            </Button>
          </div>
        </FormControl>
      )}
    </ComposableFormField>
  );
};

export default PasswordField;
