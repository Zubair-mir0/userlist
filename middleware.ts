import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthenticated, isAllowed } from './lib/auth';
const publicPaths = ['/', '/login', '/signup'];
const protectedPaths = ['/users', '/user-details']; 
function isPathProtected(pathname: string) {
  return protectedPaths.some(path => pathname.startsWith(path));
}
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  const authToken = request.cookies.get('authToken')?.value;
  let isUserAuthenticated = false;
  let isUserAllowed = false;
  if (authToken) {
    try {
      const authData = JSON.parse(authToken);
      isUserAuthenticated = authData.isAuthenticated === true;
      isUserAllowed = authData.allowed === true;
    } catch (e) {
      console.error('Invalid auth token format');
    }
  }
  if (!isUserAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (isUserAuthenticated && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if (isUserAuthenticated && isPathProtected(pathname) && !isUserAllowed) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
