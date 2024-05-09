'use client'

import FormError from '@/components/form-error'
import useCurrentRole from '@/hooks/use-current-role'
import { UserRole } from '@prisma/client'

interface RoleGateProps {
  children: React.ReactNode
  allowedRole: UserRole
}

export default function RoleGate({ allowedRole, children }: RoleGateProps) {
  const role = useCurrentRole()

  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to see this content" />
    )
  }

  return <>{children}</>
}
