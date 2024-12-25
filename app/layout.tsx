import { auth } from '@/auth';
import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import ReduxProvider from '@/redux/redux-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fitness App',
  description: 'This is a fitness app'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <NextTopLoader showSpinner={false} />
        <ReduxProvider>
          <Providers session={session}>
            <Toaster />
            {children}
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
