'use server';

import { NewsLetterSchemaType } from '../app/components/newsletter-form';

export default async function newsLetterSubscription(
  email: NewsLetterSchemaType['email']
): Promise<string> {
  return 'You are now subscribed to our Newsletter';
}
