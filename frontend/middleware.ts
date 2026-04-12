// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './app/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all paths except static files, api routes, and images
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};