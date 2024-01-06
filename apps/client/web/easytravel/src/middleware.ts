import { authMiddleware, redirectToSignIn } from '@clerk/nextjs/server';

export default authMiddleware({
  publicRoutes: ['/'],
  afterAuth(auth) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({
        returnBackUrl: 'http://localhost:3002/dashboard',
      });
    }
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
