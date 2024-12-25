import BreadCrumb from '@/components/breadcrumb';
import { TrainingLevelForm } from '@/components/forms/training-level';

const breadcrumbItems = [
  { title: 'Training Level', link: '/admin/training-level' },
  { title: 'Create', link: '/admin/training-level/create' }
];

export default function page() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <TrainingLevelForm />
    </div>
  );
}
