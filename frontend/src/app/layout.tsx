import StyledComponentsRegistry from '@/lib/registry';
import { GlobalStyles } from '@/styles/global';
import { ThemeClient } from '@/providers/ThemeClientProvider';

import { Nunito } from 'next/font/google';
import { AnimalsContextClientProvider } from '@/providers/AnimalsContextClientProvider';

const nunitoFont = Nunito({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={nunitoFont.className}>
      <body>
        <StyledComponentsRegistry>
          <ThemeClient>
            <AnimalsContextClientProvider>
              <GlobalStyles />
              {children}
            </AnimalsContextClientProvider>
          </ThemeClient>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
