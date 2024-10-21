import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE } from './app/(auth)/constant';

const protectedRoute = ['/'];
const authRoutes = ['/sign-in', '/sign-up'];

export function middleware(req: NextRequest) {
  const { nextUrl } = req;

  const currentPathName = nextUrl.pathname;
  const isAuthRoute = authRoutes.some((prefix) => currentPathName.startsWith(prefix));
  const isProtectedRoute = protectedRoute.some((prefix) => currentPathName.startsWith(prefix) && !isAuthRoute);
  const session = req.cookies.get(AUTH_COOKIE);

  if (isProtectedRoute) {
    if (!session) {
      return NextResponse.redirect(new URL('/sign-in', nextUrl));
    }
    return null;
  }
  if (isAuthRoute) {
    if (session) {
      return NextResponse.redirect(new URL('/', nextUrl));
    }
    return null;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/sign-in', '/sign-up', '/'],
};
