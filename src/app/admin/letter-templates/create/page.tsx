import CreateLetterTemplateForm from '@/components/letter-templates/create-letter-template-form'

export default function Page() {
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <CreateLetterTemplateForm />
    </div>
  )
}
