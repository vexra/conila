import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getSignatureById } from '@/data/signature'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const signature = await getSignatureById(id)

  if (!signature) {
    notFound()
  }

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <CardTitle>Tanda Tangan Surat</CardTitle>
          <CardDescription>Detail penanda tangan surat</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Nama</TableCell>
                <TableCell>{signature.staff.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jabatan</TableCell>
                <TableCell>{signature.staff.position}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Subject surat</TableCell>
                <TableCell>
                  {signature.letterSignatureRequest.subject}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
