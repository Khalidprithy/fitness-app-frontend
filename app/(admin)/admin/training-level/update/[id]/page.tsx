import BreadCrumb from '@/components/breadcrumb';
import { TrainingLevelForm } from '@/components/forms/training-level';
import { baseFetch } from '@/lib/baseFetch';

const breadcrumbItems = [
  { title: 'Training Level', link: '/admin/training-level' },
  { title: 'Update', link: '/admin/training-level/update' }
];

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await baseFetch(`/v1/training-level/find/${id}`);

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <TrainingLevelForm id={id} initialData={res?.data} />
    </div>
  );
}
