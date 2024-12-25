import BreadCrumb from '@/components/breadcrumb';
import { WorkoutForm } from '@/components/forms/workout-form';
import { baseFetch } from '@/lib/baseFetch';

const breadcrumbItems = [
  { title: 'Workout', link: '/admin/workout' },
  { title: 'Update', link: '/admin/workout/update' }
];

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await baseFetch(`/v1/workout/find/${id}`);

  const [trainingLevelsRes, targetMusclesRes, equipmentsRes, categoriesRes] =
    await Promise.all([
      baseFetch(`/v1/training-level/all`),
      baseFetch(`/v1/target-muscle/all`),
      baseFetch(`/v1/equipment/all`),
      baseFetch(`/v1/category/all`)
    ]);

  // Transform data for each entity
  const trainingLevels =
    trainingLevelsRes?.data?.docs.map((item: any) => ({
      label: item.name,
      value: item.name
    })) || [];

  const targetMuscles =
    targetMusclesRes?.data?.docs.map((item: any) => ({
      label: item.name,
      value: item.name
    })) || [];

  const equipments =
    equipmentsRes?.data?.docs.map((item: any) => ({
      label: item.name,
      value: item.name
    })) || [];

  const categories =
    categoriesRes?.data?.docs.map((item: any) => ({
      label: item.name,
      value: item._id
    })) || [];

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <WorkoutForm
        id={id}
        initialData={res?.data}
        trainingLevels={trainingLevels}
        targetMuscles={targetMuscles}
        equipments={equipments}
        categories={categories}
      />
    </div>
  );
}
