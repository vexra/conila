'use server'

import { currentUser } from '@/lib/auth'
import db from '@/lib/db'
import { CreateLetterSignatureRequestSchema } from '@/schemas'
import { LetterSignatureRequestStatus } from '@prisma/client'
import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createLetterSignatureRequest(formData: FormData) {
  const user = await currentUser()
  if (!user) return { error: 'Not authenticated!' }

  const subject = formData.get('subject') as string
  const file = formData.get('file') as File

  const validatedFields = CreateLetterSignatureRequestSchema.safeParse({
    subject,
    file: [file],
  })

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { subject: validatedSubject, file: validatedFile } =
    validatedFields.data

  const blob = await put(validatedFile[0].name, validatedFile[0], {
    access: 'public',
  })

  const letterSignatureRequest = await db.letterSignatureRequest.create({
    data: {
      userId: user.id as string,
      subject: validatedSubject,
      status: LetterSignatureRequestStatus.PENDING,
      sourceLetterDownloadUrl: blob.downloadUrl,
      sourceLetterPathname: blob.pathname,
    },
  })

  return redirect('/dashboard/letters')
}

export async function deleteLetterSignatureRequestById(id: string) {
  try {
    await db.letterSignatureRequest.delete({ where: { id } })
    revalidatePath('/dashboard/letters')
    return { success: 'Letter signature request deleted!' }
  } catch (error) {
    return {
      error: 'Database Error: Failed to Delete Letter Signature Request!',
    }
  }
}
