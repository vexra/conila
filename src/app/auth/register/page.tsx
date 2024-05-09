import CardWrapper from '@/components/auth/card-wrapper'
import RegisterForm from '@/components/auth/register-form'
import { Suspense } from 'react'
import { BeatLoader } from 'react-spinners'

export default function Page() {
  return (
    <Suspense fallback={<BeatLoader />}>
      <CardWrapper
        headerTitle="Create an account"
        headerDescription="Please enter your details to sign up"
        backButtonLabel="Already have an account? Sign in"
        backButtonHref="/auth/login"
        showSocial
      >
        <RegisterForm />
      </CardWrapper>
    </Suspense>
  )
}
