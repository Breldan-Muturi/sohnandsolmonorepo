import { getServerSession } from 'next-auth';
import React from 'react';
import Link from 'next/link';
import { options } from '../../../api/auth/[...nextauth]/options';
// import { authOptions } from '../../../api/auth/[...nextauth]/authOptions';

const IsLoggedIn = async () => {
  // const session = await getServerSession(authOptions);
  const session = await getServerSession(options);
  const isLoggedIn = session && session.user;
  return (
    <div className="flex flex-col">
      {isLoggedIn ? (
        <>
          <p>
            {`User logged in is userId: ${session.userId} from ${session.lastOrganizationId}`}
          </p>
          <Link href="/api/auth/signout">Sign out</Link>
        </>
      ) : (
        'No Found User'
      )}
    </div>
  );
};

export default IsLoggedIn;
