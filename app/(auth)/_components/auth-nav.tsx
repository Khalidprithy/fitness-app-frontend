'use client';

import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import UserAuthModal from './user-auth-form';

export default function AuthNav() {
  const { data: session } = useSession();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      {session ? null : (
        <>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-14"
            onClick={() => setModalOpen(true)}
          >
            Login
          </Button>
          <UserAuthModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
          />
        </>
      )}
    </>
  );
}
