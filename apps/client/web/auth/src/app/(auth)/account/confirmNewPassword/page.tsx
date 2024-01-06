'use client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  AccountField,
  ConfirmPasswordForm,
  confirmPasswordSchema,
} from '../../authValidators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useToast } from '@shadcn/index';
import ReusableForm from '../../components/ReusableForm';
import Link from 'next/link';
import { APIAUTH } from '../../../../lib/constants';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoginButton from '../../components/LoginButton';

const confirmNewPasswordForm: AccountField[] = [
  {
    name: 'confirmationCode',
    fieldType: 'text',
    label: 'Confirmation Code',
    type: 'text',
    className: 'col-span-2',
    description: (
      <p className="flex items-center justify-start">
        <span className="text-muted-foreground text-sm">
          {/* Adding a non-breaking space to reliably separate the text and link */}
          Didn&apos;t receive a code?&nbsp;
        </span>
        {/* To Do: Add theming font and colors */}
        <Link
          href="/forgotPassword"
          className="text-sm text-[#030C4F] font-normal"
        >
          Resend one here.
        </Link>
      </p>
    ),
  },
  {
    name: 'newPassword',
    fieldType: 'password',
    label: 'Password',
    type: 'password',
  },
  {
    name: 'confirmPassword',
    fieldType: 'password',
    label: 'Confirm Password',
    type: 'password',
  },
];

const ConfirmNewPassword = () => {
  const { toast } = useToast();
  const router = useRouter();
  const emailFromSession = sessionStorage.getItem('userEmailForgot') || '';

  const form = useForm<ConfirmPasswordForm>({
    resolver: zodResolver(confirmPasswordSchema),
    defaultValues: {
      email: emailFromSession,
      confirmationCode: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const confirmNewPassword: SubmitHandler<ConfirmPasswordForm> = async (
    data
  ) => {
    const { email, confirmationCode, newPassword } = data;
    const res = await fetch(APIAUTH + '/confirm-password', {
      method: 'POST',
      body: JSON.stringify({
        email,
        confirmationCode,
        newPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      const error = (await res.json()) as { message: string };
      toast({
        variant: 'destructive',
        title: 'There was an error loggin you in',
        description: error.message,
      });
      return;
    }
    toast({
      variant: 'default',
      title: 'Password reset successful',
    });
    const signInResult = await signIn('credentials', {
      email,
      password: newPassword,
      redirect: false,
    });
    if (signInResult?.ok) {
      router.push('/dashboard');
      sessionStorage.removeItem('userEmailForgot');
      toast({
        variant: 'default',
        title: 'Logging you in ...',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'There was an error loggin you in',
        description: signInResult?.error,
      });
      return;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(confirmNewPassword)}
        className="flex flex-col w-full space-y-4"
      >
        <ReusableForm accountFields={confirmNewPasswordForm} />
        <LoginButton isSubmitting={form.formState.isSubmitting}>
          SET NEW PASSWORD
        </LoginButton>
        <p className="flex items-center justify-center col-span-2">
          <span className="text-muted-foreground text-sm">
            {/* Adding a non-breaking space to reliably separate the text and link */}
            Remeber your last password?&nbsp;
          </span>
          {/* To Do: Add theming font and colors */}
          <Link href="/signin" className="text-sm text-[#030C4F] font-normal">
            Login here
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default ConfirmNewPassword;
