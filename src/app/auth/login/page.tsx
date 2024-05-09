import CardWrapper from '@/components/auth/card-wrapper'
import LoginForm from '@/components/auth/login-form'
import { Suspense } from 'react'
import { BeatLoader } from 'react-spinners'

export default function Page() {
  return (
    <Suspense fallback={<BeatLoader />}>
      <CardWrapper
        headerTitle="Welcome back"
        headerDescription="Please enter your details to sign in"
        backButtonLabel="Don't have an account yet? Sign up"
        backButtonHref="/auth/register"
        showSocial
      >
        <LoginForm />
      </CardWrapper>
    </Suspense>
  )
}
