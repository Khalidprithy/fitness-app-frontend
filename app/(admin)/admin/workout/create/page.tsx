import BreadCrumb from '@/components/breadcrumb';
import { WorkoutForm } from '@/components/forms/workout-form';
import { baseFetch } from '@/lib/baseFetch';

const breadcrumbItems = [
  { title: 'Target Muscle', link: '/admin/target-muscle' },
  { title: 'Create', link: '/admin/target-muscle/create' }
];

export default async function page() {
  try {
    // Fetch training levels, target muscles, and equipment concurrently
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
          trainingLevels={trainingLevels}
          targetMuscles={targetMuscles}
          equipments={equipments}
          categories={categories}
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching data for the page:', error);

    return (
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <div className="text-red-500">
          Failed to load data. Please try again later.
        </div>
      </div>
    );
  }
}
