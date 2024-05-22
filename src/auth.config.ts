import { getAccountByUserId } from '@/data/account'
import { getUserByEmail } from '@/data/user'
import { getUserById } from '@/data/user'
import db from '@/lib/db'
import { LoginSchema } from '@/schemas'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

export default {
  providers: [
    Google({}),
    Github({}),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email)
          if (!user || !user.password) return null

          const passwordMatch = await bcrypt.compare(password, user.password)
          if (passwordMatch) return user
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.isOAuth = token.isOAuth
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role

      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
} satisfies NextAuthConfig
