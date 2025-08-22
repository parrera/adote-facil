'use client';

import { DefaultLoggedPageLayout } from '@/layout/DefaultLoggedPage';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DefaultLoggedPageLayout>{children}</DefaultLoggedPageLayout>;
}
