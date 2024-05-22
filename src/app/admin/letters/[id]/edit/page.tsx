import EditLetterSignatureRequestForm from '@/components/letter/edit-letter-signature-request-form'
import { getLetterSignatureRequestById } from '@/data/letter-signature-request'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const letterSignatureRequest = await getLetterSignatureRequestById(id)

  if (!letterSignatureRequest) {
    notFound()
  }

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <EditLetterSignatureRequestForm
        letterSignatureRequest={letterSignatureRequest}
      />
    </div>
  )
}
