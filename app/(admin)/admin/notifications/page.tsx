import BreadCrumb from '@/components/breadcrumb';
import { Icons } from '@/components/icons';
import { DataTable } from '@/components/tables/data-table';
import { columns } from '@/components/tables/notifications/columns';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { baseFetch } from '@/lib/baseFetch';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const breadcrumbItems = [
  { title: 'Notification', link: '/admin/notification' }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const query = searchParams.search || undefined;

  const res = await baseFetch(
    `/notifications/all?page=${page}&limit=${pageLimit}${
      query ? `&search=${query}` : ''
    }`
  );

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading title={`Notifications`} description="Manage notifications" />
          <Link
            href={'/admin/notifications/create'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Icons.add className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>

        <DataTable
          searchKey="title"
          pageNo={page}
          columns={columns}
          totalItems={res?.data?.totalDocs}
          data={res?.data?.docs}
          pageCount={res?.data?.totalPages}
        />
      </div>
    </ScrollArea>
  );
}
