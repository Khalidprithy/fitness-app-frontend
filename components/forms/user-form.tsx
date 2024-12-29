'use client';

import InputField from '@/components/custom/input';
import RadioInputField from '@/components/custom/radio-input-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { baseFetch } from '@/lib/baseFetch';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadToCloudinary } from '../actions';
import {
  Gender,
  Provider,
  Type,
  UserRole,
  userSchema,
  UserTypes
} from '../schemas';

interface UserFormProps {
  id?: string;
  initialData?: UserTypes | null;
}

export const UserForm: React.FC<UserFormProps> = ({ id, initialData }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Update User' : 'Create User';
  const description = initialData
    ? 'Update an existing user.'
    : 'Add a new user.';
  const toastMessage = initialData
    ? 'User updated successfully.'
    : 'User created successfully.';
  const action = initialData ? 'Update' : 'Create';

  // Default values
  // @ts-ignore
  const defaultValues: UserTypes = {
    ...initialData,
    image: initialData?.image || ''
  };

  const form = useForm<UserTypes>({
    resolver: zodResolver(userSchema),
    defaultValues
  });

  const onSubmit = async (data: UserTypes) => {
    try {
      setLoading(true);

      // Handle cloudinary upload for images if necessary
      if (data.image?.name) {
        const url = await uploadToCloudinary(data.image);
        data.image = url;
      }

      const res = await baseFetch(
        `/v1/user/${id ? `update/${id}` : 'create'}`,
        {
          method: id ? 'PATCH' : 'POST',
          body: data
        }
      );

      if (res.status) {
        toast({
          variant: 'default',
          title: toastMessage
        });
        router.push(`/admin/user`);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error saving user',
          description: res.msg
        });
      }
    } catch (error: any) {
      console.error('Error during user creation:', error);
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
          className="w-full  rounded-lg border p-2  lg:p-5"
        >
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <InputField name="name" label="Name" type="text" />
            <InputField name="email" label="Email" type="email" />
            <InputField name="phone" label="Phone" type="text" />
            <InputField
              name="password"
              label="Password"
              type="password"
              readOnly
            />

            <InputField
              name="role"
              label="Role"
              type="select"
              options={Object.values(UserRole).map((role) => ({
                label: role,
                value: role
              }))}
            />

            <InputField
              name="gender"
              label="Gender"
              type="select"
              options={Object.values(Gender).map((gender) => ({
                label: gender,
                value: gender
              }))}
            />

            <InputField
              name="type"
              label="Type"
              type="select"
              options={Object.values(Type).map((type) => ({
                label: type,
                value: type
              }))}
            />

            <InputField
              name="provider"
              label="Provider"
              type="select"
              options={Object.values(Provider).map((provider) => ({
                label: provider,
                value: provider
              }))}
            />

            <InputField name="weight" label="Weight" type="number" />
            <InputField name="goalWeight" label="Goal Weight" type="number" />
            <InputField
              name="trainingLevel"
              label="Training Level"
              type="text"
            />

            <RadioInputField
              form={form}
              name="status"
              label="Status"
              yesLabel="Active"
              noLabel="Inactive"
            />

            <InputField name="image" label="Profile Image" type="image" />
          </div>

          <Button disabled={loading} className="ml-auto mt-3" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
