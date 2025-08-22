'use client';

import { AnimalsContextProvider } from '@/contexts/animals';

export function AnimalsContextClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AnimalsContextProvider>{children}</AnimalsContextProvider>;
}
