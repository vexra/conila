import UploadAcceptedLetterForm from '@/components/letter/upload-accepted-letter-form'
import { LetterSignatureRequest } from '@prisma/client'

type Props = {
  letterSignatureRequest: LetterSignatureRequest
}

export default function EditLetterSignatureRequestForm({
  letterSignatureRequest,
}: Props) {
  return (
    <div>
      <UploadAcceptedLetterForm id={letterSignatureRequest.id} />
    </div>
  )
}
