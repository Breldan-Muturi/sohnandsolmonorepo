'use client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AccountField, ConfirmForm, confirmSchema } from '../../authValidators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, useToast } from '@shadcn/index';
import { ClerkErrorResponse } from '@sohnandsol/common-utils';
import ReusableForm from '../../components/ReusableForm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoginButton from '../../components/LoginButton';
import { useSignUp } from '@clerk/nextjs';
import ComposableDescription from '../../components/ComposableDescription';

const ConfirmUser = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoaded, signUp, setActive } = useSignUp();

  const form = useForm<ConfirmForm>({
    resolver: zodResolver(confirmSchema),
    defaultValues: {
      confirmationCode: '',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const confirmUser: SubmitHandler<ConfirmForm> = async (data) => {
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.confirmationCode,
      });
      if (completeSignUp.status !== 'complete') {
        console.log(JSON.stringify(completeSignUp, null, 2));
      } else {
        await setActive({ session: completeSignUp.createdSessionId });
        toast({
          variant: 'default',
          title: 'Account confirmation successful',
          description: 'You can now login and access your account',
        });
        router.push('/');
      }
    } catch (err: unknown) {
      const error = (err as ClerkErrorResponse).errors[0];
      toast({
        variant: 'destructive',
        title:
          error.message === 'expired'
            ? 'Verification code expired'
            : 'Error verifying your account',
        description: error.longMessage,
      });
    }
  };

  const resendVerification = async () => {
    if (!isLoaded) return;
    try {
      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });
      toast({
        variant: 'default',
        title: 'Confirmation email sent',
        description: 'Please check your email and try again',
      });
    } catch (err: unknown) {
      const error = (err as ClerkErrorResponse).errors[0];
      toast({
        variant: 'destructive',
        title: error.message ?? 'Verification code expired',
        description: error.longMessage,
      });
    }
  };

  const confirmUserForm: AccountField[] = [
    {
      name: 'confirmationCode',
      fieldType: 'text',
      label: 'Confirmation Code',
      type: 'text',
      className: 'col-span-2',
      description: (
        <ComposableDescription label="Forgot your password?">
          <Button
            variant="link"
            type="button"
            className="text-sm text-[#030C4F] font-normal p-0"
            onClick={resendVerification}
          >
            Resend one here.
          </Button>
        </ComposableDescription>
      ),
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(confirmUser)}
        className="flex flex-col w-full space-y-4"
      >
        <ReusableForm accountFields={confirmUserForm} />
        <LoginButton isSubmitting={isSubmitting}>
          LOG IN TO YOUR ACCOUNT
        </LoginButton>
        <p className="flex items-center justify-center col-span-2">
          <span className="text-muted-foreground text-sm">
            {/* Adding a non-breaking space to reliably separate the text and link */}
            Don&apos;t have an account?&nbsp;
          </span>
          {/* To Do: Add theming font and colors */}
          <Link href="/signup" className="text-sm text-[#030C4F] font-normal">
            Register one here
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default ConfirmUser;
