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
import RadioInputField from '../custom/radio-input-field';
import { EquipmentValues, equipmentSchema } from '../schemas';
import { useToast } from '../ui/use-toast';

interface EquipmentFormProps {
  id?: string;
  initialData?: EquipmentValues | null;
}

export const EquipmentForm: React.FC<EquipmentFormProps> = ({
  id,
  initialData
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Update Equipment' : 'Create Equipment';
  const description = initialData
    ? 'Update an existing equipment article.'
    : 'Add a new equipment article';
  const toastMessage = initialData
    ? 'Equipment updated successfully.'
    : 'Equipment created successfully.';
  const action = initialData ? 'Update' : 'Create';

  // @ts-ignore
  const defaultValues: EquipmentValues = {
    ...initialData,
    image: initialData?.image || ''
  };

  const form = useForm<EquipmentValues>({
    resolver: zodResolver(equipmentSchema),
    defaultValues
  });

  const onSubmit = async (data: EquipmentValues) => {
    try {
      setLoading(true);

      // Handle cloudinary upload for images if necessary
      if (data.image?.name) {
        const url = await uploadToCloudinary(data.image);
        data.image = url;
      } else if (data.image === '') {
        delete data.image; // Remove the image field if it is an empty string
      }

      const res = await baseFetch(
        `/v1/equipment/${id ? `update/${id}` : 'create'}`,
        {
          method: id ? 'PATCH' : 'POST',
          body: data
        }
      );

      if (res.status) {
        revalidatePathHandler('admin/equipment');
        toast({
          variant: 'default',
          title: toastMessage
        });
        router.push(`/admin/equipment`);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error creating equipment',
          description: res.msg
        });
      }
    } catch (error: any) {
      console.error('Error during equipment creation:', error);
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
          <RadioInputField
            form={form}
            name="status"
            label="status"
            yesLabel="Active"
            noLabel="Inactive"
          />

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
