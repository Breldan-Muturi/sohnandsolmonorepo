'use client';
import { Facebook, Google, LinkedIn, Microsoft } from '@shadcn/index';
import React from 'react';

const SocialLogin = () => {
  return (
    <div className="flex flex-col w-full items-center space-y-6">
      <div className="flex space-x-6 items-center">
        {/* To Do: Add theming font and color */}
        <h4 className="font-semibold text-xl">Continue with</h4>
        <div className="flex items-center space-x-4">
          <Google />
          <LinkedIn />
          <Facebook />
          <Microsoft />
        </div>
      </div>
      <div className="relative w-full flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">OR</span>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
