import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { EnumTokens } from '@/service/auth-toke.service'
import type { NextRequest, } from 'next/server'
import { NextResponse } from 'next/server'

export async function proxy(request:NextRequest) {
	const {url, cookies} = request

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	
	const isAuthPage = url.includes('/auth')

	if(isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url))
	}

	if(isAuthPage) {
		return NextResponse.next()
	}

	if(!refreshToken) {
		return NextResponse.redirect(new URL('/auth', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/i/:path*', '/auth/:path*']
}