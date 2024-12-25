'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

type NotificationType = {
  _id: string;
  title: string;
  body: string;
  image_type: string;
  image: string;
  notification_type: string;
  action_url: string;
};

export const columns: ColumnDef<NotificationType>[] = [
  {
    id: 'title',
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'body',
    header: 'Body'
  },
  {
    accessorKey: 'image_type',
    header: 'Image Type',
    cell: ({ getValue }) => (getValue() === 'image' ? 'Image' : 'URL')
  },

  {
    accessorKey: 'notification_type',
    header: 'Notification Type',
    cell: ({ getValue }) =>
      getValue() === 'in_app' ? 'In-App' : 'Push Notification'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
