'use server'

import { currentRole } from '@/lib/auth'
import { UserRole } from '@prisma/client'

export default async function admin() {
  const role = await currentRole()

  if (role === UserRole.ADMIN) return { error: 'Allowed Server Action!' }

  return { success: 'Forbidden Server Action!' }
}
