'use client';
import { revalidatePathHandler } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { baseFetch } from '@/lib/baseFetch';
import { zodResolver } from '@hookform/resolvers/zod';
import 'flatpickr/dist/themes/material_blue.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadToCloudinary } from '../actions';
import InputField from '../custom/input';
import { CategoryValues, categorySchema } from '../schemas';
import { useToast } from '../ui/use-toast';

interface CategoryFormProps {
  id?: string;
  initialData?: CategoryValues | null;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  id,
  initialData
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Update Category' : 'Create Category';
  const description = initialData
    ? 'Update an existing category article.'
    : 'Add a new category article';
  const toastMessage = initialData
    ? 'Category updated successfully.'
    : 'Category created successfully.';
  const action = initialData ? 'Update' : 'Create';

  // @ts-ignore
  const defaultValues: CategoryValues = {
    ...initialData,
    image: initialData?.image || ''
  };

  const form = useForm<CategoryValues>({
    resolver: zodResolver(categorySchema),
    defaultValues
  });

  const onSubmit = async (data: CategoryValues) => {
    try {
      setLoading(true);

      // Handle cloudinary upload for images if necessary
      if (data.image?.name) {
        console.log('image', data.image);

        const url = await uploadToCloudinary(data.image);
        data.image = url;
      }

      const res = await baseFetch(
        `/v1/category/${id ? `update/${id}` : 'create'}`,
        {
          method: id ? 'PATCH' : 'POST',
          body: data
        }
      );

      if (res.status) {
        revalidatePathHandler('admin/category');
        toast({
          variant: 'default',
          title: toastMessage
        });
        router.push(`/admin/category`);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error creating category',
          description: res.msg
        });
      }
    } catch (error: any) {
      console.error('Error during category creation:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8 rounded-lg border p-2 lg:p-5"
        >
          <InputField name="name" label="name" type="text" />
          <InputField name="description" label="description" type="textarea" />
          <InputField name="image" label="image" type="image" />

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
