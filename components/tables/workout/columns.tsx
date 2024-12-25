'use client';
import { WorkoutValues } from '@/components/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

interface WorkoutTypes extends WorkoutValues {
  _id: string;
}

// Define the updated columns based on the workout data structure
export const columns: ColumnDef<WorkoutTypes>[] = [
  {
    accessorKey: 'title',
    header: 'TITLE'
  },
  {
    accessorKey: 'level',
    header: 'LEVEL'
  },
  {
    accessorKey: 'duration',
    header: 'DURATION'
  },
  {
    accessorKey: 'caloriesBurnedEstimate',
    header: 'CALORIES'
  },
  {
    accessorKey: 'isFavorite',
    header: 'Favorite',
    cell: ({ row }) => (
      <span
        className={`${
          row.original?.isFavorite ? 'text-green-500' : 'text-red-500'
        } rounded-full border px-2 py-0.5 shadow`}
      >
        {row.original?.isFavorite ? 'Yes' : 'No'}
      </span>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
