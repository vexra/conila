import CardWrapper from '@/components/auth/card-wrapper'
import ErrorCard from '@/components/auth/error-card'
import { Suspense } from 'react'
import { BeatLoader } from 'react-spinners'

export default function Page() {
  return (
    <Suspense fallback={<BeatLoader />}>
      <CardWrapper
        headerTitle="Oops!"
        headerDescription="Something went wrong"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login"
      >
        <ErrorCard />
      </CardWrapper>
    </Suspense>
  )
}
