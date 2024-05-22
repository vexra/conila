import { DownloadButton } from '@/components/download-button'
import { DeleteLetterSignatureRequest } from '@/components/letter/buttons'
import { Badge } from '@/components/ui/badge'
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
import { getLetterSignatureRequests } from '@/data/letter-signature-request'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

export default async function Page() {
  const letterSignatureRequests = await getLetterSignatureRequests()

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Surat</CardTitle>
          <CardDescription>Kelola surat pengguna</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subjek</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dokumen Sumber</TableHead>
                <TableHead>Dokumen Hasil</TableHead>
                <TableHead>Penanda Tangan</TableHead>
                <TableHead className="hidden md:table-cell">
                  Tanggal Dibuat
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {letterSignatureRequests?.map((letterSignatureRequest) => (
                <TableRow key={letterSignatureRequest.id}>
                  <TableCell className="font-medium">
                    {letterSignatureRequest.subject}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {letterSignatureRequest.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DownloadButton
                      url={letterSignatureRequest.sourceLetterDownloadUrl}
                      pathname={letterSignatureRequest.sourceLetterPathname}
                    />
                  </TableCell>
                  <TableCell>
                    {letterSignatureRequest.resultLetterDownloadUrl &&
                      letterSignatureRequest.resultLetterPathname && (
                        <DownloadButton
                          url={letterSignatureRequest.resultLetterDownloadUrl}
                          pathname={letterSignatureRequest.resultLetterPathname}
                        />
                      )}
                  </TableCell>
                  <TableCell>
                    {letterSignatureRequest.signatures.map((signature) => (
                      <p key={signature.id}>{signature.staff.name}</p>
                    ))}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {letterSignatureRequest.createdAt.toLocaleString()}
                  </TableCell>
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
                        <Link
                          href={`/admin/letters/${letterSignatureRequest.id}/manage-signature`}
                        >
                          <DropdownMenuItem>
                            Kelola tanda tangan
                          </DropdownMenuItem>
                        </Link>
                        <Link
                          href={`/admin/letters/${letterSignatureRequest.id}/edit`}
                        >
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>
                          <DeleteLetterSignatureRequest
                            id={letterSignatureRequest.id}
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
