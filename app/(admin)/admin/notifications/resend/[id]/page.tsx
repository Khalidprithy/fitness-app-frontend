import BreadCrumb from '@/components/breadcrumb';
import { NotificationForm } from '@/components/forms/notification-form';
import { baseFetch } from '@/lib/baseFetch';

const breadcrumbItems = [
  { title: 'Notifications', link: '/admin/notifications' },
  { title: 'Update', link: '/admin/notifications/update' }
];

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await baseFetch(`/notifications/find/${id}`);

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <NotificationForm id={id} initialData={res?.data} />
    </div>
  );
}
