import { DeleteAcceptedLetterForm } from '@/components/letter/delete-accepted-letter-form'
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
      {letterSignatureRequest.resultLetterDownloadUrl && (
        <DeleteAcceptedLetterForm id={letterSignatureRequest.id} />
      )}
      {!letterSignatureRequest.resultLetterDownloadUrl && (
        <UploadAcceptedLetterForm id={letterSignatureRequest.id} />
      )}
    </div>
  )
}
