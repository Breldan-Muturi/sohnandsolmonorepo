import React from 'react';
import { AccountField } from '../../(auth)/authValidators';
import TextField from './TextField';
import CheckField from './CheckField';
import PasswordField from './PasswordField';
// import { Button } from '@shadcn/index';
// import Link from 'next/link';

const ReusableForm: React.FC<{ accountFields: AccountField[] }> = ({
  accountFields,
}) => {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      {accountFields.map((field, i) => {
        const { fieldType, name } = field;
        const key = `${name}-${i}`;
        switch (fieldType) {
          case 'check':
            return <CheckField key={key} {...field} />;
          case 'password':
            return <PasswordField key={key} {...field} />;
          default:
            return <TextField key={key} {...field} />;
        }
      })}
      {/* To Do: Consider a Composable Component with the button and links */}
    </div>
  );
};

export default ReusableForm;
