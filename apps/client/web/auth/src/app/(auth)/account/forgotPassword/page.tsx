'use client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AccountField, ForgotForm, forgotSchema } from '../../authValidators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useToast } from '@shadcn/index';
import ReusableForm from '../../components/ReusableForm';
import Link from 'next/link';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import LoginButton from '../../components/LoginButton';

const forgotPasswordForm: AccountField[] = [
  {
    name: 'email',
    placeholder: 'eg. johndoe@email.com',
    fieldType: 'text',
    label: 'Email',
    type: 'email',
    className: 'col-span-2',
  },
];

const ForgotPassword = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoaded, signIn } = useSignIn();
  const form = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const forgotPassword: SubmitHandler<ForgotForm> = async (data) => {
    const { email } = data;
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then((_) => {
        toast({
          variant: 'default',
          title: 'Password reset request successful',
          description: 'Please check your email to reset your password',
        });
        router.push('/confirmNewPassword');
      })
      .catch((err) =>
        toast({
          title: 'Error logging you in',
          description: err.errors[0].longMessage as string,
          variant: 'destructive',
        })
      );
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(forgotPassword)}
        className="flex flex-col w-full space-y-4"
      >
        <ReusableForm accountFields={forgotPasswordForm} />
        <LoginButton isSubmitting={isSubmitting}>
          RESET YOUR PASSWORD
        </LoginButton>
        {/* To Do: Add theming font and colors */}
        <Link href="/signin" className="text-sm text-[#030C4F] font-normal">
          Back to login
        </Link>
      </form>
    </Form>
  );
};

export default ForgotPassword;
