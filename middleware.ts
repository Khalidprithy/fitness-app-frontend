import NextAuth from 'next-auth';
import authConfig from './auth.config';
import {
  adminRoutePrefix,
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT_USER,
  publicRoutes
} from './routes/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // console.log('User Here:', req?.auth?.user);

  const role = req?.auth?.user?.role;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutePrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  // If logged In user visits login routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_USER, nextUrl));
    }
    return;
  }

  // If user visited admin routes
  if (isAdminRoute) {
    if (role !== 'admin') {
      return Response.redirect(new URL('/', nextUrl));
    }
    return;
  }

  // If not logged In user visits any private routes
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/user-login', nextUrl));
  }
  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};
