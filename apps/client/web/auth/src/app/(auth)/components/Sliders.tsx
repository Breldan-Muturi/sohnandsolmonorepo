// import Image from 'next/image';
import React from 'react';
// import SnsSliders from '../../../public/SnSSliders.png';
import { Check } from 'lucide-react';

const SliderLabels = {
  heading: 'Introducing New and Easy to use Business Management Software',
  subheading:
    'Access user friendly dashboards, and data visualisation tools to help grow your business by providing useful insights at a glance',
  bulletsLeft: [
    'CRM Software',
    'Project Management',
    'Human Resource Management',
    'Social Media Management',
    'Workforce Monitoring',
  ],
  bulletsRight: [
    'Workflow Automation',
    'Farm Management Software',
    'Travel Agency',
    'E-commerce',
    'School Management Software',
  ],
};

const Sliders = () => {
  const { heading, subheading, bulletsLeft, bulletsRight } = SliderLabels;
  return (
    // To Do: Add a background image
    <div className="flex flex-col items-center justify-center col-span-1 h-screen px-20 py-6 bg-[url('/SnSSliders.png')]">
      <div className="flex flex-col items-center justify-center space-y-20">
        <div className="flex flex-col items-center justify-center space-y-6">
          <h1 className="font-semibold text-white text-3xl text-center">
            {heading}
          </h1>
          <h4 className="text-base text-white text-center">{subheading}</h4>
        </div>
        {/* Products */}
        <div className="grid grid-cols-2 w-full px-4 py-8 space-x-3 border-2 border-[#5EE5EB] bg-[#030C4F] rounded-lg">
          <div className="flex flex-col col-span-1 space-y-4">
            {bulletsLeft.map((bulletItem: string, i) => {
              const key = `${bulletItem}-${i}`;
              return (
                <div key={key} className="flex space-x-1 items-center">
                  <Check className="h-4 w-4 text-[#5EE5EB]" />
                  <p className="text-white text-xs">{bulletItem}</p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col col-span-1 space-y-4">
            {bulletsRight.map((bulletItem: string, i) => {
              const key = `${bulletItem}-${i}`;
              return (
                <div key={key} className="flex space-x-1 items-center">
                  <Check className="h-4 w-4 text-[#5EE5EB]" />
                  <p className="text-white text-xs">{bulletItem}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Toggle Sliders */}
    </div>
  );
};

export default Sliders;
