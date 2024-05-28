'use client'

import { deleteSignatureById } from '@/actions/signature'
import QRCode from 'qrcode'
import { useEffect, useRef } from 'react'

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
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const generateQRCode = async () => {
      const canvas = canvasRef.current
      const context = canvas?.getContext('2d')

      if (canvas && context) {
        try {
          const qrCode = await QRCode.toDataURL(
            `${location.origin}/signatures/${id}`,
            {
              width: 300,
              margin: 2,
              errorCorrectionLevel: 'H',
            },
          )

          const qrCodeImg = new Image()
          qrCodeImg.src = qrCode

          qrCodeImg.onload = () => {
            context.drawImage(qrCodeImg, 0, 0, canvas.width, canvas.height)
          }
        } catch (error) {
          console.error('Error generating QR code:', error)
        }
      }
    }

    generateQRCode()
  }, [id])

  const downloadQRCode = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const anchor = document.createElement('a')
      anchor.download = 'qr-code.png'
      anchor.href = canvas.toDataURL('image/png')
      anchor.click()
    }
  }

  return (
    <button type="button" onClick={downloadQRCode}>
      Download QR Code
    </button>
  )
}
