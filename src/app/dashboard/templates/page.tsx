import { DownloadButton } from '@/components/download-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getLetterTemplates } from '@/data/letter-template'

export default async function Page() {
  const letterTemplates = await getLetterTemplates()

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Template Surat</CardTitle>
          <CardDescription>Download template surat</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subjek</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
