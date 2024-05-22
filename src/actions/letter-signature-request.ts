'use server'

import { currentUser } from '@/lib/auth'
import db from '@/lib/db'
import {
  CreateLetterSignatureRequestSchema,
  UploadAcceptedLetterSchema,
} from '@/schemas'
import { LetterSignatureRequestStatus } from '@prisma/client'
import { del, put } from '@vercel/blob'
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
    const letterSignatureRequest = await db.letterSignatureRequest.findUnique({
      where: { id },
    })

    if (!letterSignatureRequest) {
      return { error: 'Letter signature request not found' }
    }

    await del(letterSignatureRequest.sourceLetterDownloadUrl)

    if (letterSignatureRequest.resultLetterDownloadUrl) {
      await del(letterSignatureRequest.resultLetterDownloadUrl)
    }

    await db.letterSignatureRequest.delete({ where: { id } })

    revalidatePath('/dashboard/letters')
    return { success: 'Letter signature request deleted!' }
  } catch (error) {
    return {
      error: 'Database Error: Failed to Delete Letter Signature Request!',
    }
  }
}

export async function deleteAcceptedLetterById(id: string) {
  try {
    const letterSignatureRequest = await db.letterSignatureRequest.findUnique({
      where: { id },
    })

    if (!letterSignatureRequest) {
      return { error: 'Letter signature request not found' }
    }

    if (letterSignatureRequest.resultLetterDownloadUrl) {
      await del(letterSignatureRequest.resultLetterDownloadUrl)
    }

    await db.letterSignatureRequest.update({
      where: { id },
      data: {
        status: LetterSignatureRequestStatus.PENDING,
        resultLetterDownloadUrl: null,
        resultLetterPathname: null,
      },
    })

    redirect(`/admin/letters/${id}/edit`)
  } catch (error) {
    return {
      error: 'Database Error: Failed to Delete Accepted Letter!',
    }
  }
}

export async function uploadAcceptedLetter(id: string, formData: FormData) {
  try {
    const file = formData.get('file') as File

    const validatedFields = UploadAcceptedLetterSchema.safeParse({
      file: [file],
    })

    if (!validatedFields.success) {
      return { error: 'Invalid fields!' }
    }

    const { file: validatedFile } = validatedFields.data

    const blob = await put(validatedFile[0].name, validatedFile[0], {
      access: 'public',
    })

    const letterSignatureRequest = await db.letterSignatureRequest.update({
      where: { id },
      data: {
        status: LetterSignatureRequestStatus.ACCEPTED,
        resultLetterDownloadUrl: blob.downloadUrl,
        resultLetterPathname: blob.pathname,
      },
    })

    return redirect(`/admin/letters/${id}/edit`)
  } catch (error) {
    return {
      error: 'Database Error: Failed to Uplaod Accepted Letter!',
    }
  }
}
