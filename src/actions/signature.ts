'use server'

import db from '@/lib/db'
import { CreateSignatureSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as z from 'zod'

export async function createSignature(
  letterSignatureRequestId: string,
  values: z.infer<typeof CreateSignatureSchema>,
) {
  const validatedFields = CreateSignatureSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { staffId } = validatedFields.data

  try {
    await db.signature.create({
      data: { letterSignatureRequestId, staffId },
    })
  } catch (error) {
    return { message: 'Database Error: Failed to Create Signature.' }
  }

  redirect(`/admin/letters/${letterSignatureRequestId}/manage-signature`)
}

export async function deleteSignatureById(
  id: string,
  letterSignatureRequestId: string,
) {
  try {
    await db.signature.delete({ where: { id } })

    revalidatePath(
      `/admin/letters/${letterSignatureRequestId}/manage-signature`,
    )
    return { success: 'Signature deleted!' }
  } catch (error) {
    return {
      error: 'Database Error: Failed to Delete Signature!',
    }
  }
}
