import { HTMLInputTypeAttribute } from 'react';
import * as z from 'zod';

const VALID_EMAIL = 'Enter a valid email';
const ALLOWED_CHARACTERS = 'Only 3-16 characters allowed';
const ALLOWED_CODE_CHARACTERS = 'Only 6 characters allowed';
const REQUIRED_FIELD = 'This field is required';
const VALID_PASSWORD = 'Enter a valid password';
const VALID_CONFIRMATION = 'Passwords do not match';
const ACCEPTANCE_TERMS_CONDITIONS =
  'You must accept the terms and conditions to proceed';

const nameField = z
  .string()
  .min(3, { message: ALLOWED_CHARACTERS })
  .max(16, { message: ALLOWED_CHARACTERS });

const email = z.string().email(VALID_EMAIL);
const requiredField = z.string().min(1, { message: REQUIRED_FIELD });
const confirmationCode = z
  .string()
  .min(6, { message: ALLOWED_CODE_CHARACTERS })
  .max(6, { message: ALLOWED_CODE_CHARACTERS });
const newPassword = z.string().min(6, { message: VALID_PASSWORD });

export const newAccountSchema = z
  .object({
    firstName: nameField,
    lastName: nameField,
    email,
    password: newPassword,
    confirmPassword: requiredField,
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, { message: ACCEPTANCE_TERMS_CONDITIONS }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: VALID_CONFIRMATION,
    path: ['confirmPassword'],
  });

export type NewAccountForm = z.infer<typeof newAccountSchema>;

export const confirmSchema = z.object({
  confirmationCode,
});

export type ConfirmForm = z.infer<typeof confirmSchema>;

export const loginSchema = z.object({
  email,
  password: requiredField,
});

export type LoginForm = z.infer<typeof loginSchema>;

// Also used in Resend Verification Code
export const forgotSchema = z.object({ email });

export type ForgotForm = z.infer<typeof forgotSchema>;

export const confirmPasswordSchema = z
  .object({
    email,
    confirmationCode,
    newPassword,
    confirmPassword: requiredField,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: VALID_CONFIRMATION,
    path: ['confirmPassword'],
  });

export type ConfirmPasswordForm = z.infer<typeof confirmPasswordSchema>;

export type AccountField = {
  name: keyof NewAccountForm | keyof ConfirmPasswordForm;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  description?: React.ReactNode;
  fieldType?: 'text' | 'password' | 'check';
  className?: string;
};
