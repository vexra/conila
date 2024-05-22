'use client'

import { deleteLetterTemplateById } from '@/actions/letter-template'

export function DeleteLetterTemplate({ id }: { id: string }) {
  const deleteLetterTemplateWithId = deleteLetterTemplateById.bind(null, id)

  return (
    <form action={deleteLetterTemplateWithId}>
      <button type="submit">Delete</button>
    </form>
  )
}
