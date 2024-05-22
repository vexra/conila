'use client'

import { Button } from '@/components/ui/button'

type DownloadButtonType = {
  url: string
  pathname: string
}

export function DownloadButton({ url, pathname }: DownloadButtonType) {
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
