import BreadCrumb from '@/components/breadcrumb';
import { CategoryForm } from '@/components/forms/category-form';

const breadcrumbItems = [
  { title: 'Category', link: '/admin/category' },
  { title: 'Create', link: '/admin/category/create' }
];

export default function page() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <CategoryForm />
    </div>
  );
}
