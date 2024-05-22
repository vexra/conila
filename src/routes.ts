/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 */
export const publicRoutes = ['/']

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 */
export const authRoutes = ['/auth/login', '/auth/register', '/auth/error']

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect path after logging in
 */
export const DEFAULT_USER_LOGIN_REDIRECT = '/dashboard'

/**
 * The default redirect path after logging in
 */
export const DEFAULT_ADMIN_LOGIN_REDIRECT = '/admin'

/**
 * The prefix for user routes
 * Routes that start with this prefix are used for user role only
 */
export const userRoutePrefix = '/dashboard'

/**
 * The prefix for admin routes
 * Routes that start with this prefix are used for admin role only
 */
export const adminRoutePrefix = '/admin'
