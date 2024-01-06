'use client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  AccountField,
  NewAccountForm,
  newAccountSchema,
} from '../../authValidators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useToast } from '@shadcn/index';
import ReusableForm from '../../components/ReusableForm';
import Link from 'next/link';
import { useSignUp } from '@clerk/nextjs';
import LoginButton from '../../components/LoginButton';
import { useRouter } from 'next/navigation';

const registerForm: AccountField[] = [
  {
    name: 'firstName',
    placeholder: 'eg. John',
    fieldType: 'text',
    label: 'First Name',
    type: 'text',
  },
  {
    name: 'lastName',
    placeholder: 'eg. Doe',
    fieldType: 'text',
    label: 'Last Name',
    type: 'text',
  },
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
  },
  {
    name: 'confirmPassword',
    fieldType: 'password',
    label: 'Confirm Password',
    type: 'password',
  },
  {
    name: 'termsAccepted',
    fieldType: 'check',
    label:
      'I agree to the Sohn and Sol Technologies Limited Terms of Service and Privacy Policy',
    type: 'checkbox',
  },
];

const RegisterPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();
  const form = useForm<NewAccountForm>({
    resolver: zodResolver(newAccountSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const handleRegister: SubmitHandler<NewAccountForm> = async (data) => {
    if (!isLoaded) return;
    const { email, password } = data;
    try {
      // Start the signup process using the email and password provided
      await signUp.create({
        emailAddress: email,
        password,
      });
      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      toast({
        title: 'Registration successful',
        description: 'Kindly check your email to activate your account',
      });
      // Send the user to the account verification page
      router.push('/account/confirmUser');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({
        title: err.errors[0].message ?? 'Error setting up your account',
        description: err.errors[0].longMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col w-full space-y-4"
      >
        <ReusableForm accountFields={registerForm} />
        <LoginButton isSubmitting={isSubmitting}>
          CREATE A NEW ACCOUNT
        </LoginButton>
        <p className="flex items-center justify-center col-span-2">
          <span className="text-muted-foreground text-sm">
            {/* Adding a non-breaking space to reliably separate the text and link */}
            Already have an account?&nbsp;
          </span>
          {/* To Do: Add theming font and colors */}
          <Link href="/auth" className="text-sm text-[#030C4F] font-normal">
            Login here
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default RegisterPage;
