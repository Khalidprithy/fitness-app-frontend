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
  return <>{children}</>;
}
