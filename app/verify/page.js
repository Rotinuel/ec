'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function VerifyPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      router.replace('/login?verified=0')
      return
    }

    fetch(`/api/auth/verify?token=${token}`)
      .then(res => {
        if (res.redirected) {
          window.location.href = res.url
        } else if (!res.ok) {
          router.replace('/login?verified=0')
        }
      })
      .catch(() => {
        router.replace('/login?verified=0')
      })
  }, [token, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-xl font-semibold">Verifying your email...</h1>
    </div>
  )
}


export default function VerifyPage(){
    return (
        <Suspense fallback={null}>
            <VerifyPageContent />
        </Suspense>
    )
}