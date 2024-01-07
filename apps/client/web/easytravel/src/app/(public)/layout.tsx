import React from 'react';
import Footer from '../components/footer';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center overflow-y-auto">
      {children}
      <Footer />
    </div>
  );
};

export default PublicLayout;
