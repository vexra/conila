'use client'

import { deleteSignatureById } from '@/actions/signature'

export function DeleteSignature({
  id,
  letterSignatureRequestId,
}: {
  id: string
  letterSignatureRequestId: string
}) {
  const deleteSignatureWithId = deleteSignatureById.bind(
    null,
    id,
    letterSignatureRequestId,
  )
  return (
    <form action={deleteSignatureWithId}>
      <button type="submit">Delete</button>
    </form>
  )
}
