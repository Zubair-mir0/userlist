import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthenticated, isAllowed } from './lib/auth';
const publicPaths = ['/', '/login', '/signup'];
const adminOnlyPaths = ['/users', '/user-details'];

function isAdminPath(pathname: string) {
  return adminOnlyPaths.some(path => pathname.startsWith(path));
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
      console.log('isUserAuthenticated', isUserAuthenticated);
      console.log('isUserAllowed', isUserAllowed);
    } catch (e) {
      console.error('Invalid auth token format');
    }
  }

  // Redirect to login if not authenticated and not on a public path
  if (!isUserAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to dashboard if already logged in and trying to access auth pages
  if (isUserAuthenticated && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect to dashboard if trying to access admin-only paths without permission
  if (isUserAuthenticated && isAdminPath(pathname) && !isUserAllowed) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
