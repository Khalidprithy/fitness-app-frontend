'use client';

import ErrorPage from '@/components/error';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorPageProps) {
  return (
    <ErrorPage
      message={error.message}
      backPage="Dashboard"
      backRoute="/admin/dashboard"
      reset={reset}
    />
  );
}