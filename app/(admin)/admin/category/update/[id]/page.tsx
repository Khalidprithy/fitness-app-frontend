import BreadCrumb from '@/components/breadcrumb';
import { CategoryForm } from '@/components/forms/category-form';
import { baseFetch } from '@/lib/baseFetch';

const breadcrumbItems = [
  { title: 'Category', link: '/admin/category' },
  { title: 'Update', link: '/admin/category/update' }
];

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await baseFetch(`/v1/category/find/${id}`);

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <CategoryForm id={id} initialData={res?.data} />
    </div>
  );
}
