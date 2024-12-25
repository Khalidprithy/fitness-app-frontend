import BreadCrumb from '@/components/breadcrumb';
import { NotificationForm } from '@/components/forms/notification-form';

const breadcrumbItems = [
  { title: 'Notifications', link: '/admin/notifications' },
  { title: 'Create', link: '/admin/notifications/create' }
];

export default function page() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <NotificationForm />
    </div>
  );
}
