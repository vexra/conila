import {
  DeleteLetterSignatureRequest,
  DownloadLetter,
} from '@/components/letter/buttons'
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
import { getLetterSignatureRequestsByUserId } from '@/data/letter-signature-request'
import { currentUser } from '@/lib/auth'
import { MoreHorizontal, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await currentUser()
  if (!user) return redirect('/auth/login')

  const letterSignatureRequests = await getLetterSignatureRequestsByUserId(
    user.id as string,
  )

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center justify-end">
        <Link href="/dashboard/letters/create">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Upload surat
            </span>
          </Button>
        </Link>
      </div>

      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Surat</CardTitle>
          <CardDescription>Kelola surat kamu</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subjek</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dokumen Sumber</TableHead>
                <TableHead>Dokumen Hasil</TableHead>
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
                    <DownloadLetter
                      url={letterSignatureRequest.sourceLetterDownloadUrl}
                      pathname={letterSignatureRequest.sourceLetterPathname}
                    />
                  </TableCell>
                  <TableCell>
                    {letterSignatureRequest.resultLetterDownloadUrl &&
                      letterSignatureRequest.resultLetterPathname && (
                        <DownloadLetter
                          url={letterSignatureRequest.resultLetterDownloadUrl}
                          pathname={letterSignatureRequest.resultLetterPathname}
                        />
                      )}
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
