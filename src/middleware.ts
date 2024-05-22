import authConfig from '@/auth.config'
import {
  DEFAULT_ADMIN_LOGIN_REDIRECT,
  DEFAULT_USER_LOGIN_REDIRECT,
  adminRoutePrefix,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  userRoutePrefix,
} from '@/routes'
import { UserRole } from '@prisma/client'
import NextAuth from 'next-auth'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isOnUserRoute = nextUrl.pathname.startsWith(userRoutePrefix)
  const isOnAdminRoute = nextUrl.pathname.startsWith(adminRoutePrefix)

  const isUser = req.auth?.user.role === UserRole.USER
  const isAdmin = req.auth?.user.role === UserRole.ADMIN

  if (isApiAuthRoute) return

  if (isAuthRoute) {
    if (isLoggedIn && isUser) {
      return Response.redirect(new URL(DEFAULT_USER_LOGIN_REDIRECT, nextUrl))
    }

    if (isLoggedIn && isAdmin) {
      return Response.redirect(new URL(DEFAULT_ADMIN_LOGIN_REDIRECT, nextUrl))
    }

    return
  }

  if (!isOnAdminRoute && isAdmin) {
    return Response.redirect(new URL(DEFAULT_ADMIN_LOGIN_REDIRECT, nextUrl))
  }

  if (!isOnUserRoute && isUser) {
    return Response.redirect(new URL(DEFAULT_USER_LOGIN_REDIRECT, nextUrl))
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
