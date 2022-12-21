import {NextResponse} from 'next/server'
import type { NextRequest } from 'next/server'
import {getToken} from 'next-auth/jwt'
export { default } from "next-auth/middleware"
import * as jose from 'jose'
import { getSession } from 'next-auth/react';

export async function middleware(req: NextRequest){

  const cookie = req.headers.get('cookie');

  const session: any = await getSession({ req: {headers: {cookie}} as any});
    console.log(session)

  if (!session) {    
    
    if(req.nextUrl.pathname.startsWith('/api/admin')){
      return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url))
      
    }

    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.search = `p=${requestedPage}`;

    // return NextResponse.redirect(url);
    // const requestedPage = req.nextUrl.pathname;
    // return NextResponse.redirect(new URL(`/auth/login?p=${requestedPage}`, req.url))

  }

    const validRoles = ['admin', 'super-user', 'CEO'];

    if(req.nextUrl.pathname.startsWith('/admin')){
      if(!validRoles.includes(session?.user.role)){
        return NextResponse.redirect(new URL("/", req.url))
      }
    }

    if(req.nextUrl.pathname.startsWith('/api/admin')){
      if(!validRoles.includes(session?.user.role)){
        return NextResponse.redirect(new URL(`/api/auth/unauthorized`, req.url))
      }
    }

  return NextResponse.next();
}

export const config = {
    matcher: ['/checkout/address', '/checkout/summary', '/admin/:path*', '/api/admin/:path*']
}