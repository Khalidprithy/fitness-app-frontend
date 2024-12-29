'use client';
import { revalidatePathHandler } from '@/app/actions';
import { AlertModal } from '@/components/modal/alert-modal';
import { SubscriptionType } from '@/components/schemas';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { baseFetch } from '@/lib/baseFetch';

import { Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SubscriptionTypes extends SubscriptionType {
  _id: string;
}

interface CellActionProps {
  data: SubscriptionTypes;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const res = await baseFetch(`/v1/subscription/delete/${data._id}`, {
      method: 'DELETE'
    });

    if (res.status === 200) {
      revalidatePathHandler('/admin/subscription');
      setOpen(false);
    }
  };

  const onConfirm = async () => {
    try {
      handleDelete();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

      <TooltipProvider>
        <div className="flex items-center justify-center gap-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                onClick={() =>
                  router.push(`/admin/subscription/update/${data._id}`)
                }
                variant="outline"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Update</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" onClick={() => setOpen(true)} variant="outline">
                {' '}
                <Trash className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </>
  );
};
