import db from '@/lib/db'

export async function getLetterSignatureRequestById(id: string) {
  try {
    const user = await db.letterSignatureRequest.findUnique({ where: { id } })

    return user
  } catch {
    return null
  }
}

export async function getLetterSignatureRequestsByUserId(userId: string) {
  try {
    const letterSignatureRequests = await db.letterSignatureRequest.findMany({
      where: { userId: userId },
    })

    return letterSignatureRequests
  } catch {
    return null
  }
}
