import CreateLetterSignatureRequestForm from '@/components/letter/create-letter-signature-request-form'
import { getLetterTemplates } from '@/data/letter-template'

export default async function Page() {
  const letterTemplates = (await getLetterTemplates()) ?? []
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <CreateLetterSignatureRequestForm letterTemplates={letterTemplates} />
    </div>
  )
}
