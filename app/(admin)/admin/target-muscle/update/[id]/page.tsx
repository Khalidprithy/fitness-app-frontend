import BreadCrumb from '@/components/breadcrumb';
import { TargetMuscleForm } from '@/components/forms/target-muscle-form';
import { baseFetch } from '@/lib/baseFetch';

const breadcrumbItems = [
  { title: 'TargetMuscle', link: '/admin/target-muscle' },
  { title: 'Update', link: '/admin/target-muscle/update' }
];

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await baseFetch(`/v1/target-muscle/find/${id}`);

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <TargetMuscleForm id={id} initialData={res?.data} />
    </div>
  );
}
