'use client'

import { deleteAcceptedLetterById } from '@/actions/letter-signature-request'

export function DeleteAcceptedLetterForm({ id }: { id: string }) {
  const deleteAcceptedLetterWithId = deleteAcceptedLetterById.bind(null, id)

  return (
    <form action={deleteAcceptedLetterWithId}>
      <button type="submit">Hapus Surat Hasil</button>
    </form>
  )
}
