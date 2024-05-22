import EditStaffForm from '@/components/staff/edit-staff-form'
import { getStaffById } from '@/data/staff'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const staff = await getStaffById(id)

  if (!staff) {
    notFound()
  }

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <EditStaffForm staff={staff} />
    </div>
  )
}
