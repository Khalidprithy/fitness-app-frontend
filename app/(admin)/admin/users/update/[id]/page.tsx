import BreadCrumb from '@/components/breadcrumb';
import { UserForm } from '@/components/forms/user-form';
import { baseFetch } from '@/lib/baseFetch';

const breadcrumbItems = [
  { title: 'Users', link: '/admin/users' },
  { title: 'Update', link: '/admin/users/update' }
];

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await baseFetch(`/v1/user/find/${id}`);

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <UserForm id={id} initialData={res?.data} />
    </div>
  );
}
