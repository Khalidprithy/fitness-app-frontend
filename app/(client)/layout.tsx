import Footer from '@/components/layout/client/footer';
import Header from '@/components/layout/client/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fitness App',
  description: 'This is a fitness app'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mt-28 flex-grow p-2">{children}</main>
      <Footer />
    </div>
  );
}
