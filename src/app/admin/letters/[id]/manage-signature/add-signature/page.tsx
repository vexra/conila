import CreateSignatureForm from '@/components/signature/create-signature-form'
import { getLetterSignatureRequestById } from '@/data/letter-signature-request'
import { getStaff } from '@/data/staff'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const letterSignatureRequest = await getLetterSignatureRequestById(id)

  if (!letterSignatureRequest) {
    notFound()
  }

  const staff = (await getStaff()) || []

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <CreateSignatureForm
        letterSignatureRequestId={letterSignatureRequest.id}
        staff={staff}
      />
    </div>
  )
}
