import db from '@/lib/db'

export async function getLetterTemplates() {
  try {
    const letterTemplates = await db.letterTemplate.findMany()

    return letterTemplates
  } catch {
    return null
  }
}

export async function getLetterTemplateById(id: string) {
  try {
    const letterTemplate = await db.letterTemplate.findUnique({ where: { id } })

    return letterTemplate
  } catch {
    return null
  }
}
