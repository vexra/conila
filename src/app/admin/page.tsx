import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  getLetterAcceptedCounts,
  getLetterPendingCounts,
} from '@/data/letter-signature-request'
import Link from 'next/link'

export default async function Page() {
  const letterPendingCount = await getLetterPendingCounts()
  const letterAcceptedCount = await getLetterAcceptedCounts()

  return (
    <div className="p-4 sm:px-6 sm:py-0">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
          <CardHeader className="pb-3">
            <CardTitle>Conila</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Memperkenalkan website untuk mempermudah proses administrasi
              pembuatan surat di Universitas Lampung
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>
              <Link href="/admin/letter-templates/create">
                Upload template surat
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>Surat Dalam Proses</CardDescription>
            <CardTitle className="text-4xl">
              {letterPendingCount} Surat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-xs">
              Menunggu proses verifikasi admin
            </div>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription>Surat Selesai</CardDescription>
            <CardTitle className="text-4xl">
              {letterAcceptedCount} Surat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-xs">
              Surat berhasil dibuat
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
