'use client';
import { SubscriptionType } from '@/components/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

interface SubscriptionTypes extends SubscriptionType {
  _id: string;
}

export const columns: ColumnDef<SubscriptionTypes>[] = [
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'productId',
    header: 'PRODUCT ID'
  },
  {
    accessorKey: 'duration',
    header: 'DURATION',
    cell: ({ row }) => (
      <span>
        {row.original.duration} {row.original.durationType}
      </span>
    )
  },
  {
    accessorKey: 'platform',
    header: 'PLATFORM',
    cell: ({ row }) => (
      <span className="capitalize">{row.original.platform}</span>
    )
  },
  {
    accessorKey: 'price',
    header: 'PRICE',
    cell: ({ row }) => (
      <span>${row.original.price.toFixed(2)}</span> // Assuming price is a float
    )
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
    cell: ({ row }) => (
      <span
        className={`${
          row.original.status ? 'text-green-500' : 'text-red-500'
        } rounded-full border px-2 py-0.5 shadow`}
      >
        {row.original.status ? 'Active' : 'Inactive'}
      </span>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
