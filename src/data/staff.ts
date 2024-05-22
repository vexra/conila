import db from '@/lib/db'

export async function getStaff() {
  try {
    const staff = await db.staff.findMany()

    return staff
  } catch {
    return null
  }
}

export async function getStaffById(id: string) {
  try {
    const staff = await db.staff.findUnique({ where: { id } })

    return staff
  } catch {
    return null
  }
}
