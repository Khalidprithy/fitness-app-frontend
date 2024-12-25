'use client';
import { logout, setCredentials } from '@/redux/slices/auth/authSlice';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ThemeProvider from './ThemeToggle/theme-provider';
export default function Providers({
  session,
  children
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      dispatch(
        setCredentials({
          // @ts-ignore
          accessToken: session.user.accessToken,
          user: session.user
        })
      );
    } else {
      dispatch(logout());
    }
  }, [session, dispatch]);

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={session}>{children}</SessionProvider>
      </ThemeProvider>
    </>
  );
}
