import BreadCrumb from '@/components/breadcrumb';
import { TargetMuscleForm } from '@/components/forms/target-muscle-form';

const breadcrumbItems = [
  { title: 'TargetMuscle', link: '/admin/target-muscle' },
  { title: 'Create', link: '/admin/target-muscle/create' }
];

export default function page() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <TargetMuscleForm />
    </div>
  );
}
