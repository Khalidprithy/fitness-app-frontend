'use client';
import { revalidatePathHandler } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { baseFetch } from '@/lib/baseFetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import InputField from '../custom/input';
import RadioInputField from '../custom/radio-input-field';
import { Icons } from '../icons';
import { subscriptionSchema, SubscriptionType } from '../schemas';
import { useToast } from '../ui/use-toast';

interface SubscriptionFormProps {
  id?: string;
  initialData?: SubscriptionType | null;
}

export const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  id,
  initialData
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Update Subscription' : 'Create Subscription';
  const description = initialData
    ? 'Update an existing subscription plan.'
    : 'Add a new subscription plan';
  const toastMessage = initialData
    ? 'Subscription updated successfully.'
    : 'Subscription created successfully.';
  const action = initialData ? 'Update' : 'Create';

  // @ts-ignore
  const defaultValues: SubscriptionType = {
    ...initialData,
    description: initialData?.description || '',
    features: initialData?.features || [''] // Default to an empty feature if none exists
  };

  const form = useForm<SubscriptionType>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues
  });

  const { control } = form;

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature
  } = useFieldArray({
    control,
    // @ts-ignore
    name: 'features'
  });

  const onSubmit = async (data: SubscriptionType) => {
    try {
      setLoading(true);

      const res = await baseFetch(
        `/v1/subscription/${id ? `update/${id}` : 'create'}`,
        {
          method: id ? 'PATCH' : 'POST',
          body: data
        }
      );

      if (res.status) {
        revalidatePathHandler('admin/subscription');
        toast({
          variant: 'default',
          title: toastMessage
        });
        router.push(`/admin/subscription`);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error creating subscription',
          description: res.msg
        });
      }
    } catch (error: any) {
      console.error('Error during subscription creation:', error);
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
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {' '}
            <InputField name="name" label="Subscription Name" type="text" />
            <InputField name="productId" label="Product ID" type="text" />
            <InputField
              name="durationType"
              label="Duration Type"
              type="select"
              options={[
                {
                  label: 'Daily',
                  value: 'daily'
                },
                {
                  label: 'Weekly',
                  value: 'weekly'
                },
                {
                  label: 'Monthly',
                  value: 'monthly'
                },
                {
                  label: 'Yearly',
                  value: 'yearly'
                }
              ]}
            />
            <InputField name="duration" label="Duration" type="number" />
            <InputField name="price" label="Price" type="number" />
            <RadioInputField
              form={form}
              name="status"
              label="Status"
              yesLabel="Active"
              noLabel="Inactive"
            />
          </div>

          <InputField name="description" label="Description" type="textarea" />

          {/* Features Field Array */}
          <div className="rounded-lg border border-gray-300 p-2">
            <label className="mb-3 block text-base font-semibold text-gray-700">
              Features list
            </label>
            {featureFields.map((item, index) => (
              <div key={item.id} className="mb-4 flex items-end space-x-4">
                <InputField
                  name={`features.${index}`}
                  label={`Feature ${index + 1}`}
                  type="text"
                  className="flex-1"
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={() => removeFeature(index)}
                  variant="destructive"
                  className="ml-2"
                >
                  <Icons.close />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => appendFeature('')} // Add a new empty feature field
              variant="outline"
            >
              Add Feature
            </Button>
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
