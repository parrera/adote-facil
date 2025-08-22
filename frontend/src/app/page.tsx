'use client';

import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  router.push('/area_logada/animais_disponiveis');
}
