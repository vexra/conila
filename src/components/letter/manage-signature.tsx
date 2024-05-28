import {
  DeleteSignature,
  DownloadSignatureQRCode,
} from '@/components/signature/buttons'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Signature, Staff } from '@prisma/client'
import { MoreHorizontal, PlusCircle } from 'lucide-react'
import Link from 'next/link'

type Props = {
  letterSignatureRequestId: string
  signatures: (Signature & { staff: Staff })[]
}

export default function ManageSignature({
  letterSignatureRequestId,
  signatures,
}: Props) {
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center justify-end">
        <Link
          href={`/admin/letters/${letterSignatureRequestId}/manage-signature/add-signature`}
        >
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Tambah tanda tangan
            </span>
          </Button>
        </Link>
      </div>

      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Tanda Tangan</CardTitle>
          <CardDescription>
            Kelola siapa saja yang menandatangani dokumen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {signatures.map((signature) => (
                <TableRow key={signature.id}>
                  <TableCell className="font-medium">
                    {signature.staff.name}
                  </TableCell>
                  <TableCell>{signature.staff.position}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <DownloadSignatureQRCode id={signature.id} />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <DeleteSignature
                            letterSignatureRequestId={
                              signature.letterSignatureRequestId
                            }
                            id={signature.id}
                          />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
