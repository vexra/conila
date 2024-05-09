import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export default function ErrorCard() {
  return (
    <div className="flex w-full items-center justify-center">
      <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
    </div>
  )
}
