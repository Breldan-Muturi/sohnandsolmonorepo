import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col p-4">
      <p className="text-lg text-blue-500">This is a protected route</p>
      {children}
    </div>
  );
};

export default DashboardLayout;
