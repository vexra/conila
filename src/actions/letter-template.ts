'use server'

import db from '@/lib/db'
import {
  CreateLetterTemplateSchema,
  UpdateLetterTemplateSchema,
} from '@/schemas'
import { del, put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as z from 'zod'

export async function createLetterTemplate(formData: FormData) {
  const title = formData.get('title') as string
  const file = formData.get('file') as File

  const validatedFields = CreateLetterTemplateSchema.safeParse({
    title,
    file: [file],
  })

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { title: validatedTitle, file: validatedFile } = validatedFields.data

  const blob = await put(validatedFile[0].name, validatedFile[0], {
    access: 'public',
  })

  const letterTemplate = await db.letterTemplate.create({
    data: {
      title: validatedTitle,
      downloadUrl: blob.downloadUrl,
      pathname: blob.pathname,
    },
  })

  return redirect('/admin/letter-templates')
}

export async function deleteLetterTemplateById(id: string) {
  try {
    const letterTemplate = await db.letterTemplate.findUnique({
      where: { id },
    })

    if (!letterTemplate) {
      return { error: 'Letter template not found' }
    }

    await del(letterTemplate.downloadUrl)

    await db.letterTemplate.delete({ where: { id } })

    revalidatePath('/admin/letter-templates')
    return { success: 'Letter template deleted!' }
  } catch (error) {
    return {
      error: 'Database Error: Failed to Delete Letter Template!',
    }
  }
}

export async function updateLetterTemplate(
  id: string,
  values: z.infer<typeof UpdateLetterTemplateSchema>,
) {
  const validatedFields = UpdateLetterTemplateSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  try {
    await db.letterTemplate.update({
      where: { id },
      data: validatedFields.data,
    })
  } catch (error) {
    return { error: 'Database Error: Failed to Update Letter Template.' }
  }

  revalidatePath('/admin/letter-templates')
  redirect('/admin/letter-templates')
}
