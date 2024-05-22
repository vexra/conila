'use client'

import { deleteLetterSignatureRequestById } from '@/actions/letter-signature-request'

export function DeleteLetterSignatureRequest({ id }: { id: string }) {
  const deleteLetterSignatureRequestWithId =
    deleteLetterSignatureRequestById.bind(null, id)

  return (
    <form action={deleteLetterSignatureRequestWithId}>
      <button type="submit">Delete</button>
    </form>
  )
}
