import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {isTokenExpired, refreshAccessToken} from './utils/manage-token'
import {ACCOUNT_PATH, DEFAULT_PATH} from './constants/route-paths'

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const isLoginPage = request.nextUrl.pathname.startsWith(ACCOUNT_PATH.LOGIN)

  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  if (!refreshToken || isTokenExpired(refreshToken)) {
    return isLoginPage
      ? NextResponse.next()
      : NextResponse.redirect(new URL(ACCOUNT_PATH.LOGIN, request.url))
  }

  if (!accessToken || isTokenExpired(accessToken)) {
    try {
      const newToken = await refreshAccessToken(refreshToken)

      const response = NextResponse.next()
      response.cookies.set('accessToken', newToken.accessToken)
      response.cookies.set('refreshToken', newToken.refreshToken)

      return response
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  return isLoginPage
    ? NextResponse.redirect(new URL(DEFAULT_PATH, request.nextUrl))
    : NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|images|favicon).*)',
  ],
}
