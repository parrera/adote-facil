// src/app/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomeRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.push('/area_logada/animais_disponiveis')
  }, [router])

  return null // ou um spinner de loading se quiser
}

// 'use client'

// import { useRouter } from 'next/navigation'

// export default function Page() {
//   const router = useRouter()
//   router.push('/area_logada/animais_disponiveis')
// }
