'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  useToast,
} from '@shadcn/index';
import newsLetterSubscription from '../../lib/newsletter.action';

export const newsLetterSchema = z.object({
  email: z.string().email('Enter a valid email'),
});

export type NewsLetterSchemaType = z.infer<typeof newsLetterSchema>;

export default function NewsletterFrom() {
  const { toast } = useToast();
  const form = useForm<NewsLetterSchemaType>({
    resolver: zodResolver(newsLetterSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: NewsLetterSchemaType) {
    const { email } = values;
    try {
      const newSubscription = await newsLetterSubscription(email);
      form.reset();
      toast({
        type: 'foreground',
        title: newSubscription,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Newsletter subscription unsuccessful',
        description: 'Please try again later',
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Enter your email</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input
                    placeholder="Your email"
                    className="rounded-r-none"
                    {...field}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="font-arimo font-bold rounded-l-none bg-[#0A7BBD]"
                  >
                    Subscribe
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
              <FormDescription className="text-white">
                By submitting this form, I agree to the easytravel T&Cs and
                privacy policy.
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
