'use client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AccountField, LoginForm, loginSchema } from '../../authValidators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useToast } from '@shadcn/index';
import ReusableForm from '../../components/ReusableForm';
import Link from 'next/link';
import { useSignIn } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginButton from '../../components/LoginButton';
import ComposableDescription from '../../components/ComposableDescription';
import { ClerkErrorResponse } from '@sohnandsol/common-utils';

const loginForm: AccountField[] = [
  {
    name: 'email',
    placeholder: 'eg. johndoe@email.com',
    fieldType: 'text',
    label: 'Email',
    type: 'email',
    className: 'col-span-2',
  },
  {
    name: 'password',
    fieldType: 'password',
    label: 'Password',
    type: 'password',
    className: 'col-span-2',
    description: (
      <ComposableDescription label="Forgot your password?">
        <Link
          href="/account/forgotPassword"
          className="text-sm text-[#030C4F] font-normal"
        >
          Reset it here
        </Link>
      </ComposableDescription>
    ),
  },
];

const LoginPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const redirectUrl = useSearchParams().get('redirect_url');
  console.log(redirectUrl);
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const loginUser: SubmitHandler<LoginForm> = async (data) => {
    if (!isLoaded) return null;
    const { email, password } = data;
    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });
      if (completeSignIn.status !== 'complete') {
        console.log(JSON.stringify(completeSignIn, null, 2));
      } else {
        await setActive({ session: completeSignIn.createdSessionId });
        toast({
          title: 'Login successful',
        });
        // Redirect the user to a post sign-in route
        router.push(redirectUrl ?? '/');
      }
    } catch (err) {
      const error = (err as ClerkErrorResponse).errors[0];
      toast({
        title: error.message ?? 'Error Logging you in',
        description: error.longMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(loginUser)}
        className="flex flex-col w-full space-y-4"
      >
        <ReusableForm accountFields={loginForm} />
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

export default LoginPage;
