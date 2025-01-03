import BreadCrumb from '@/components/breadcrumb';
import { UserForm } from '@/components/forms/user-form';

const breadcrumbItems = [
  { title: 'Users', link: '/admin/users' },
  { title: 'Create', link: '/admin/users/create' }
];

export default function page() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <UserForm />
    </div>
  );
}
