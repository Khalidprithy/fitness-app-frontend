import { Card } from '@/components/ui/card';
import { Metadata } from 'next';
import AdminAuthForm from '../_components/admin-auth-form';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function AuthenticationPage() {
  return (
    <div className="relative flex h-screen items-center justify-center">
      <Card className="min-w-[400px] p-5">
        <h1 className="my-5 text-center text-2xl font-semibold capitalize tracking-tight">
          Welcome Back
        </h1>
        <AdminAuthForm />
      </Card>
    </div>
  );
}
