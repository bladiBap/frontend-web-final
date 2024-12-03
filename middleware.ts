import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import isAuthenticated from '@utils/auth'

export async function middleware(request: NextRequest) {

    const token = request.cookies.get('token')
    if (request.nextUrl.pathname.startsWith('/admin') && !await isAuthenticated(token, 'ADMIN')) {
        console.log('middleware.ts: middleware(admin)')
        return NextResponse.redirect(new URL('/login/admin', request.url))
    }
    
    if (request.nextUrl.pathname.startsWith('/user') && !await isAuthenticated(token, 'USER')) {
        console.log('middleware.ts: middleware(user)')
        return NextResponse.redirect(new URL('/login/user', request.url))
    }

    return NextResponse.next()
}
