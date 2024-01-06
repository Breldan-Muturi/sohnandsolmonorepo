import React from 'react';
import Sliders from './components/Sliders';
import SocialLogin from './components/social/SocialLogin';
import Image from 'next/image';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <Sliders />
      <div className="flex flex-col col-span-1 p-20 items-center justify-center space-y-6">
        <Image
          src="/MonorepoLogo.png"
          alt="Company Logo"
          width={80}
          height={72}
          style={{ objectFit: 'cover' }}
        />
        <SocialLogin />
        {children}
      </div>
    </div>
  );
};

export default layout;
