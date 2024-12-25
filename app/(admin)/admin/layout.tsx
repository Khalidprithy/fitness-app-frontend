import Header from '@/components/layout/admin/header';
import Sidebar from '@/components/layout/admin/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
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
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 pt-16">
          <ScrollArea className="h-full p-4">{children}</ScrollArea>
        </main>
      </div>
    </>
  );
}
