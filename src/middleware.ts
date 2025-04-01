import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProtectedPath = path === '/addmentors';
  const isAuthPath = path === '/auth/signin' || path === '/auth/signup';

  const token = await getToken({ req: request });

  if (isProtectedPath) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/addmentors', '/auth/signin', '/auth/signup'],
};
