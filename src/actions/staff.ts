'use server'

import db from '@/lib/db'
import { CreateStaffSchema, UpdateStaffSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as z from 'zod'

export async function createStaff(values: z.infer<typeof CreateStaffSchema>) {
  const validatedFields = CreateStaffSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { name, position } = validatedFields.data

  try {
    await db.staff.create({
      data: { name, position },
    })
  } catch (error) {
    return { message: 'Database Error: Failed to Create Staff.' }
  }

  redirect('/admin/staff')
}

export async function deleteStaffById(id: string) {
  try {
    await db.staff.delete({ where: { id } })

    revalidatePath('/admin/staff')
    return { success: 'Staff deleted!' }
  } catch (error) {
    return {
      error: 'Database Error: Failed to Delete Staff!',
    }
  }
}

export async function updateStaff(
  id: string,
  values: z.infer<typeof UpdateStaffSchema>,
) {
  const validatedFields = UpdateStaffSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  try {
    await db.staff.update({
      where: { id },
      data: validatedFields.data,
    })
  } catch (error) {
    return { message: 'Database Error: Failed to Update Staff.' }
  }

  revalidatePath('/admin/staff')
  redirect('/admin/staff')
}
