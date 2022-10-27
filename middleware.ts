import {NextResponse} from 'next/server'
import type { NextRequest } from 'next/server'

import * as jose from 'jose'

export async function middleware(request: NextRequest){
    if(request.nextUrl.pathname.startsWith('/checkout')){
        const response = NextResponse.next()

        const token = request.cookies.get('token');
        let isValidToken = false;

        try {
            await jose.jwtVerify(token || '', new TextEncoder().encode(process.env.JWT_SECRET_SEED));
            isValidToken = true;
            return NextResponse.next()
        } catch (error) {
            console.error('JWT Invalid or not signed in', {error});
            isValidToken = false
        }

        if(!isValidToken){
            const { pathname } = request.nextUrl;
            
            return NextResponse.redirect(
                new URL(`/auth/login?p=${pathname}`, request.url)
            )
        }
    }
}


export const config = {
    mathcer: ['/checkout/:path']
}