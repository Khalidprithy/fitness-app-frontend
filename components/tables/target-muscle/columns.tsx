'use client';
import { Icons } from '@/components/icons';
import { Product } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'image',
    header: 'IMAGE',
    cell: ({ row }) =>
      row.original?.image ? (
        <img
          src={row.original.image}
          alt={row.original?.name || 'Image'}
          className="aspect-video h-10 w-fit rounded object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-200">
          <Icons.media />
        </div>
      )
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION'
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
    cell: ({ row }) => (
      <span
        className={`${
          row.original?.status ? 'text-green-500' : 'text-red-500'
        } rounded-full border px-2 py-0.5 shadow`}
      >
        {row.original?.status ? 'Active' : 'Inactive'}
      </span>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
