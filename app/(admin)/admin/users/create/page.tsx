import BreadCrumb from '@/components/breadcrumb';

const breadcrumbItems = [
  { title: 'Highlights', link: '/admin/highlights' },
  { title: 'Create', link: '/admin/highlights/create' }
];

export default function page() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
    </div>
  );
}
