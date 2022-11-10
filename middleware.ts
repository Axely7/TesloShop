import {NextResponse} from 'next/server'
import type { NextRequest } from 'next/server'
import {getToken} from 'next-auth/jwt'
export { default } from "next-auth/middleware"
import * as jose from 'jose'

export async function middleware(req: NextRequest){
    // if(request.nextUrl.pathname.startsWith('/checkout')){
    //     const response = NextResponse.next()

    //     const token = request.cookies.get('token');
    //     let isValidToken = false;

    //     try {
    //         await jose.jwtVerify(token || '', new TextEncoder().encode(process.env.JWT_SECRET_SEED));
    //         isValidToken = true;
    //         return NextResponse.next()
    //     } catch (error) {
    //         console.error('JWT Invalid or not signed in', {error});
    //         isValidToken = false
    //     } 

    //     if(!isValidToken){
    //         const { pathname } = request.nextUrl;
            
    //         return NextResponse.redirect(
    //             new URL(`/auth/login?p=${pathname}`, request.url)
    //         )
    //     }
    // }


  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log(session)
  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }
 
  return NextResponse.next();
}

export const config = {
    matcher: ['/checkout/address', '/checkout/summary']
}