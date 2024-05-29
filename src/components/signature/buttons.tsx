'use client'

import { deleteSignatureById } from '@/actions/signature'
import QRCode from 'qrcode'

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

type DownloadSignatureQRCodeProps = {
  id: string
}

export function DownloadSignatureQRCode({ id }: DownloadSignatureQRCodeProps) {
  const downloadQRCode = async () => {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(
        `${location.origin}/signatures/${id}`,
        {
          width: 300,
          margin: 2,
          errorCorrectionLevel: 'H',
        },
      )

      const anchor = document.createElement('a')
      anchor.download = 'qr-code.png'
      anchor.href = qrCodeDataURL
      anchor.click()
    } catch (error) {
      console.error('Error generating and downloading QR code:', error)
    }
  }

  return (
    <button type="button" onClick={downloadQRCode}>
      Download QR Code
    </button>
  )
}
