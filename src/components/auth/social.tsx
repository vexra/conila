'use client'

import { Button } from '@/components/ui/button'
import { DEFAULT_USER_LOGIN_REDIRECT } from '@/routes'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { FaGithub } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'

export default function Social() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  function onClick(provider: 'google' | 'github') {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_USER_LOGIN_REDIRECT,
    })
  }

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick('google')}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>

      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick('github')}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
}
