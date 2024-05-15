'use client'

import { deleteLetterSignatureRequestById } from '@/actions/letter-signature-request'
import { Button } from '@/components/ui/button'

type DownloadButtonType = {
  url: string
  pathname: string
}

export function DownloadLetter({ url, pathname }: DownloadButtonType) {
  const handleClick = async () => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()

      const blobUrl = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = blobUrl
      a.download = pathname

      document.body.appendChild(a)
      a.click()

      document.body.removeChild(a)
    } catch (error) {
      console.error('Error while downloading file:', error)
    }
  }
  return (
    <Button type="button" onClick={handleClick}>
      Download
    </Button>
  )
}

export function DeleteLetterSignatureRequest({ id }: { id: string }) {
  const deleteLetterSignatureRequestWithId =
    deleteLetterSignatureRequestById.bind(null, id)

  return (
    <form action={deleteLetterSignatureRequestWithId}>
      <button type="submit">Delete</button>
    </form>
  )
  return
}
