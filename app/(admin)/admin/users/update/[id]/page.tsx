import BreadCrumb from '@/components/breadcrumb';

const breadcrumbItems = [
  { title: 'Highlights', link: '/admin/highlights' },
  { title: 'Update', link: '/admin/highlights/update' }
];

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <p>Updating highlight {id}</p>
    </div>
  );
}
