import authConfig from '@/auth.config'
import {
  DEFAULT_ADMIN_LOGIN_REDIRECT,
  DEFAULT_USER_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes'
import { UserRole } from '@prisma/client'
import NextAuth from 'next-auth'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isAdmin = req.auth?.user.role === UserRole.ADMIN

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) return

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (isAdmin) {
        return Response.redirect(new URL(DEFAULT_ADMIN_LOGIN_REDIRECT, nextUrl))
      }

      return Response.redirect(new URL(DEFAULT_USER_LOGIN_REDIRECT, nextUrl))
    }

    return
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname

    if (nextUrl.search) callbackUrl += nextUrl.search

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    )
  }

  return
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)'],
}
