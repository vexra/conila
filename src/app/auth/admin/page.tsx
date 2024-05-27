import AdminLoginForm from '@/components/auth/admin-login-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Suspense } from 'react'
import { BeatLoader } from 'react-spinners'

export default function Page() {
  return (
    <Suspense fallback={<BeatLoader />}>
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <ExclamationTriangleIcon className="h-4 w-4" />
          <CardTitle>Welcome admin</CardTitle>
          <CardDescription>
            Please enter your details to sign in
          </CardDescription>
        </CardHeader>

        <CardContent>
          <AdminLoginForm />
        </CardContent>
      </Card>
    </Suspense>
  )
}
