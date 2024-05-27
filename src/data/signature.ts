import db from '@/lib/db'

export async function getSignatureById(id: string) {
  try {
    const signature = await db.signature.findUnique({
      where: { id },
      include: { staff: true, letterSignatureRequest: true },
    })

    return signature
  } catch {
    return null
  }
}

export async function getSignaturesByLetterSignatureRequestId(id: string) {
  try {
    const signatures = await db.signature.findMany({
      where: { letterSignatureRequestId: id },
      include: { staff: true },
    })

    return signatures
  } catch {
    return null
  }
}
