import { UserRole } from '@prisma/client'
import * as z from 'zod'

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: 'Minimun 6 characters length' }),
})

export const ResetSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
})

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(6, { message: 'Minimun 6 characters length' }),
  name: z.string().min(1, { message: 'Name is required' }),
})

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false
      return true
    },
    { message: 'New password is required!', path: ['newPassword'] },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) return false
      return true
    },
    { message: 'Password is required!', path: ['password'] },
  )

export const LetterSchema = z.object({
  id: z.string(),
  userId: z.string(),
  subject: z.string().min(1, { message: 'Subject is required' }),
  createdAt: z
    .string()
    .transform((birthDate) => new Date(birthDate))
    .pipe(z.date()),
  status: z.enum(['PENDING', 'ACCEPTED'], {
    invalid_type_error: 'Please select a letter status.',
  }),
  sourceDocumentUrl: z.string().url(),
  sourceDocumentDownloadUrl: z.string().url(),
  resultDocumentUrl: z.string().url(),
  resultDocumentDownloadUrl: z.string().url(),
})

export const CreateLetterSchema = LetterSchema.pick({ subject: true })
export const UpdateLetterSchema = LetterSchema.pick({
  subject: true,
  status: true,
})

const ACCEPTED_FILE_TYPES = [
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.oasis.opendocument.text',
  'application/x-abiword',
]
const MAX_FILE_SIZE = 5 //In MegaBytes

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024)
  return +result.toFixed(decimalsNum)
}

export const CreateLetterSignatureRequestSchema = z.object({
  subject: z.string().min(1, { message: 'Subject is required!' }),
  file: z
    .custom<FileList>()
    .refine((files) => {
      return Array.from(files ?? []).length !== 0
    }, 'File is required')
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_FILE_SIZE,
      )
    }, `The maximum file size is ${MAX_FILE_SIZE}MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_FILE_TYPES.includes(file.type),
      )
    }, 'File type is not supported'),
})

export const UploadAcceptedLetterSchema = z.object({
  file: z
    .custom<FileList>()
    .refine((files) => {
      return Array.from(files ?? []).length !== 0
    }, 'File is required')
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_FILE_SIZE,
      )
    }, `The maximum file size is ${MAX_FILE_SIZE}MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_FILE_TYPES.includes(file.type),
      )
    }, 'File type is not supported'),
})

export const StaffSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  position: z.string().min(1, { message: 'Position is required' }),
})

export const CreateStaffSchema = StaffSchema
export const UpdateStaffSchema = StaffSchema

export const CreateLetterTemplateSchema = z.object({
  title: z.string().min(1, { message: 'Title is required!' }),
  file: z
    .custom<FileList>()
    .refine((files) => {
      return Array.from(files ?? []).length !== 0
    }, 'File is required')
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_FILE_SIZE,
      )
    }, `The maximum file size is ${MAX_FILE_SIZE}MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_FILE_TYPES.includes(file.type),
      )
    }, 'File type is not supported'),
})

export const UpdateLetterTemplateSchema = z.object({
  title: z.string().min(1, { message: 'Title is required!' }),
})

export const SignatureSchema = z.object({
  staffId: z.string().min(1, { message: 'StaffId is required' }),
  letterSignatureRequestId: z
    .string()
    .min(1, { message: 'LetterSignatureRequestId is required' }),
})

export const CreateSignatureSchema = SignatureSchema.pick({ staffId: true })
