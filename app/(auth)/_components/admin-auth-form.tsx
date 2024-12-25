'use client';
import { AdminFormValue, adminLoginSchema } from '@/components/schemas';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function AdminAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/admin/dashboard';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AdminFormValue>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data: AdminFormValue) => {
    setLoading(true);
    setError(null);

    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      role: 'admin',
      callbackUrl
    });

    setLoading(false);

    if (res?.error) {
      setError('Invalid credentials');
    } else {
      window.location.href = res?.url || callbackUrl;
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    aria-invalid={!!form.formState.errors.email}
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    aria-invalid={!!form.formState.errors.password}
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {error && <div className="mt-2 text-sm text-red-600">{error}</div>}

          <Button
            disabled={loading}
            className="!mt-5 ml-auto w-full"
            type="submit"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>
    </>
  );
}
