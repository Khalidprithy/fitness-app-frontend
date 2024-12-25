'use client';

import { revalidatePathHandler } from '@/app/actions';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { baseFetch } from '@/lib/baseFetch';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';

interface CellActionProps {
  data: {
    _id: string;
    title: string;
    body: string;
    image_type: string;
    image: string;
    notification_type: string;
    action_url: string;
  };
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const { data: session } = useSession();

  const handleDelete = async () => {
    const res = await baseFetch(`/notifications/delete/${data._id}`, {
      method: 'DELETE'
    });

    if (res.status === 200) {
      revalidatePathHandler('/admin/notifications');
      setPopoverOpen(false);
    }
  };

  const handleNo = () => {
    setPopoverOpen(false);
  };

  return (
    <div className="flex items-center justify-end gap-3 pe-4">
      <Link
        href={`/admin/notifications/resend/${data._id}`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-transparent text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        <Icons.send className="h-4 w-4 text-blue-400" />
      </Link>

      <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button size="icon" variant="outline">
            <Icons.trash className="h-4 w-4 text-red-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72" align="start" side="left">
          <>
            <p>Are you sure you want to delete? </p>

            <div className="my-3 flex justify-end gap-3">
              <Button size="sm" variant="outline" onClick={handleNo}>
                No
              </Button>
              <Button size="sm" variant="destructive" onClick={handleDelete}>
                Yes
              </Button>
            </div>
          </>
        </PopoverContent>
      </Popover>
    </div>
  );
};
