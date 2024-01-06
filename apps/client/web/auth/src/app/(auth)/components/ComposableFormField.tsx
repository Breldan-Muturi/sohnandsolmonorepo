import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import { AccountField } from '../authValidators';
import React from 'react';
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shadcn/index';

interface ComposableFormFieldProps extends AccountField {
  children: (props: {
    field: ControllerRenderProps<FieldValues, AccountField['name']>;
  }) => React.ReactNode;
}

const ComposableFormField: React.FC<ComposableFormFieldProps> = ({
  name,
  children,
  className,
  description,
  label,
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          {children({ field })}
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ComposableFormField;
