import db from '@/lib/db'
import { LetterSignatureRequestStatus } from '@prisma/client'

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

export async function getLetterSignatureRequests() {
  try {
    const letterSignatureRequests = await db.letterSignatureRequest.findMany({
      include: { signatures: { include: { staff: true } } },
    })

    return letterSignatureRequests
  } catch {
    return null
  }
}

export async function getLetterPendingCountByUserId(userId: string) {
  try {
    const letterPendingCount = await db.letterSignatureRequest.count({
      where: { userId, status: LetterSignatureRequestStatus.PENDING },
    })

    return letterPendingCount
  } catch {
    return null
  }
}

export async function getLetterAcceptedCountByUserId(userId: string) {
  try {
    const letterPendingCount = await db.letterSignatureRequest.count({
      where: { userId, status: LetterSignatureRequestStatus.ACCEPTED },
    })

    return letterPendingCount
  } catch {
    return null
  }
}

export async function getLetterPendingCounts() {
  try {
    const letterPendingCount = await db.letterSignatureRequest.count({
      where: { status: LetterSignatureRequestStatus.PENDING },
    })

    return letterPendingCount
  } catch {
    return null
  }
}

export async function getLetterAcceptedCounts() {
  try {
    const letterPendingCount = await db.letterSignatureRequest.count({
      where: { status: LetterSignatureRequestStatus.ACCEPTED },
    })

    return letterPendingCount
  } catch {
    return null
  }
}
