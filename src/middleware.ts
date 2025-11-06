import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import getTokenPayload from './utils/getTokenPayload';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const tokenData = await getTokenPayload(request);
    const tokenDataJson: any = tokenData.json().then(data => data);

    const path = request.nextUrl.pathname;

    if(path.startsWith('/_next/static/') || path.startsWith('/favicon.ico')) {
        const response = NextResponse.next();
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        return response;
    }

    const isPublicPath = path ==='/sign-in' || path === '/sign-up' || path === '/verify-email';
    const isDoctorPath = path ==='/list-appoinyment-doctor' || path === '/profile'
    const isPatientPath = path === '/create-appointment' || path ==='/list-appointment-patient' || path === '/profile'

    if((isPublicPath && tokenData.status == 200) || (tokenData.status == 200 && isPatientPath && tokenDataJson.role === 'doctor') || (tokenData.status == 200 && isDoctorPath && tokenDataJson.role === 'patient')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if((!isPublicPath || isDoctorPath || isPatientPath) && tokenData.status != 200) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/profile',
    '/create-appointment',
    '/list-appointment-patient',
    '/list-appointment-doctor',
    '/sign-in',
    '/sign-up',
    '/verify-email'
  ]
}