import React from 'react';
import { AccountField } from '../authValidators';
import ComposableFormField from './ComposableFormField';
import { FormControl, Input } from '@shadcn/index';

const TextField: React.FC<AccountField> = (accountField) => {
  const { type, placeholder } = accountField;
  return (
    <ComposableFormField {...accountField}>
      {({ field }) => (
        <FormControl>
          <Input type={type} placeholder={placeholder} {...field} />
        </FormControl>
      )}
    </ComposableFormField>
  );
};

export default TextField;
