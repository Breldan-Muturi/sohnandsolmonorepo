'use client';
import React from 'react';
import { useUser } from '@clerk/nextjs';

const DashboardPage = () => {
  const { user } = useUser();
  if (!user) {
    return <div>No Found user</div>;
  } else {
    return <div>{`User logged in with email: ${user.id}`}</div>;
  }
};

export default DashboardPage;
