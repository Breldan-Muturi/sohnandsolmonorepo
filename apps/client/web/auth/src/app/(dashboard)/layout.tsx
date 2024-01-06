import React from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col h-screen">
      <Header className="sticky top-0 z-10" />
      <div className="grid w-full h-full pb-4 grid-cols-6 overflow-hidden">
        <Sidebar className="sticky top-20" />
        <div className="flex col-span-5 h-full justify-center overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
};

export default layout;
