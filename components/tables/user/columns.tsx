'use client';
import { Icons } from '@/components/icons';
import { User } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import moment from 'moment';
import { CellAction } from './cell-action';

interface UserTypes extends User {
  _id: string;
  createdAt: string;
}

const UserInfo = ({ user }: { user: UserTypes }) => {
  const formattedDate = moment(user?.createdAt).format('ll');

  return (
    <div className="flex items-center gap-4">
      {user?.image ? (
        <img src={user?.image} alt="User Image" className="w-20 rounded-md" />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-200">
          <Icons.media />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <h4 className="text-base font-semibold">{user?.name}</h4>
        <p>{user?.email}</p>
        <p>Joined: {formattedDate}</p>
      </div>
    </div>
  );
};

export const columns: ColumnDef<UserTypes>[] = [
  {
    accessorKey: 'name',
    header: 'USER INFO',
    cell: ({ row }) => <UserInfo user={row.original} />
  },
  {
    accessorKey: 'role',
    header: 'ROLE',
    cell: ({ row }) => <span className="capitalize">{row.original.role}</span>
  },
  {
    accessorKey: 'type',
    header: 'TYPE',
    cell: ({ row }) => <span className="capitalize">{row.original.type}</span>
  },
  {
    accessorKey: 'provider',
    header: 'PROVIDER',
    cell: ({ row }) => (
      <span className="capitalize">{row.original.provider}</span>
    )
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
    cell: ({ row }) => (
      <span
        className={`rounded-full px-2 py-0.5 ${
          row.original.status
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
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
