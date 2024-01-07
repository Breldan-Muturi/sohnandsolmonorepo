import React from 'react';
import NewsletterFrom from './newsletter-form';

const Footer = () => {
  return (
    <div className="flex w-full items-center bg-[#2C3E50] justify-between py-6 px-12 mt-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl text-white font-semibold">
          Sign up for Our Newsletter
        </h2>
        <p className="text-white font-normal">
          Save up to 50% on tours! Get exclusive deals on members only deals by
          email
        </p>
      </div>
      <NewsletterFrom />
    </div>
  );
};

export default Footer;
