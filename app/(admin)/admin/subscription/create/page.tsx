import BreadCrumb from '@/components/breadcrumb';
import { SubscriptionForm } from '@/components/forms/subscription-form';

const breadcrumbItems = [
  { title: 'Subscription', link: '/admin/subscription' },
  { title: 'Create', link: '/admin/subscription/create' }
];

export default function page() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <SubscriptionForm />
    </div>
  );
}
