import BreadCrumb from '@/components/breadcrumb';
import { EquipmentForm } from '@/components/forms/equipment-form';
import { baseFetch } from '@/lib/baseFetch';

const breadcrumbItems = [
  { title: 'Equipment', link: '/admin/equipment' },
  { title: 'Update', link: '/admin/equipment/update' }
];

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await baseFetch(`/v1/equipment/find/${id}`);

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <EquipmentForm id={id} initialData={res?.data} />
    </div>
  );
}
