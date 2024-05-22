'use client'

import { deleteStaffById } from '@/actions/staff'

export function DeleteStaff({ id }: { id: string }) {
  const deleteStaffWithId = deleteStaffById.bind(null, id)

  return (
    <form action={deleteStaffWithId}>
      <button type="submit">Delete</button>
    </form>
  )
}
