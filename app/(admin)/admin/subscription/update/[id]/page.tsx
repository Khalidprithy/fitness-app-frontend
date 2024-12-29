import BreadCrumb from '@/components/breadcrumb';
import { SubscriptionForm } from '@/components/forms/subscription-form';
import { baseFetch } from '@/lib/baseFetch';

const breadcrumbItems = [
  { title: 'Subscription', link: '/admin/subscription' },
  { title: 'Update', link: '/admin/subscription/update' }
];

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await baseFetch(`/v1/subscription/find/${id}`);

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <SubscriptionForm id={id} initialData={res?.data} />
    </div>
  );
}
