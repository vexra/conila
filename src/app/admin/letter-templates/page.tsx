import { DownloadButton } from '@/components/download-button'
import { DeleteLetterTemplate } from '@/components/letter-templates/buttons'
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
import { getLetterTemplates } from '@/data/letter-template'
import { MoreHorizontal, PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default async function Page() {
  const letterTemplates = await getLetterTemplates()

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center justify-end">
        <Link href="/admin/letter-templates/create">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Tambah template
            </span>
          </Button>
        </Link>
      </div>

      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Template Surat</CardTitle>
          <CardDescription>Kelola template surat</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>File</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {letterTemplates?.map((letterTemplate) => (
                <TableRow key={letterTemplate.id}>
                  <TableCell className="font-medium">
                    {letterTemplate.title}
                  </TableCell>
                  <TableCell>
                    <DownloadButton
                      url={letterTemplate.downloadUrl}
                      pathname={letterTemplate.pathname}
                    />
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
                          href={`/admin/letter-templates/${letterTemplate.id}/edit`}
                        >
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>
                          <DeleteLetterTemplate id={letterTemplate.id} />
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
