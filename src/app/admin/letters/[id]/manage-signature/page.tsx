import ManageSignature from '@/components/letter/manage-signature'
import { getSignaturesByLetterSignatureRequestId } from '@/data/signature'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const signatures = await getSignaturesByLetterSignatureRequestId(id)

  if (!signatures) {
    notFound()
  }

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <ManageSignature letterSignatureRequestId={id} signatures={signatures} />
    </div>
  )
}
