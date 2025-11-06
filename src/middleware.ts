import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import getTokenPayload from './utils/getTokenPayload';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const tokenData = await getTokenPayload(request);
    const tokenDataJson: any = await tokenData.json().then(data => data);

    const path = request.nextUrl.pathname;

    if(path.startsWith('/_next/static/') || path.startsWith('/favicon.ico')) {
        const response = NextResponse.next();
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        return response;
    }

    const isPublicPath = path ==='/sign-in' || path === '/sign-up' || path === '/verify-email';

    if(isPublicPath && tokenData.status == 200) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if(!isPublicPath && tokenData.status != 200) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    if(path === '/create-appointment' && tokenDataJson.payload.role != 'patient') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/profile',
    '/create-appointment',
    '/list-appointments',
    '/sign-in',
    '/sign-up',
    '/verify-email'
  ]
}