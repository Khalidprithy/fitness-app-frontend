import BreadCrumb from '@/components/breadcrumb';
import { EquipmentForm } from '@/components/forms/equipment-form';

const breadcrumbItems = [
  { title: 'Equipment', link: '/admin/equipment' },
  { title: 'Create', link: '/admin/equipment/create' }
];

export default function page() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <EquipmentForm />
    </div>
  );
}
