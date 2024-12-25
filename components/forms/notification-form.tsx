'use client';
import { revalidatePathHandler } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { baseFetch } from '@/lib/baseFetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { uploadToCloudinary } from '../actions';
import Dropzone from '../dropzone';
import { NotificationFormValues, notificationSchema } from '../schemas';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';

interface NotificationFormProps {
  id?: string;
  initialData?: NotificationFormValues | null;
}

export const NotificationForm: React.FC<NotificationFormProps> = ({
  id,
  initialData
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Resend notification' : 'Create notification';
  const description = initialData
    ? 'Resend a notification.'
    : 'Add a new notification';
  const toastMessage = initialData
    ? 'Notification sended again.'
    : 'Notification created.';
  const action = initialData ? 'Resend' : 'Create';

  // @ts-ignore
  const defaultValues: NotificationFormValues = {
    ...initialData,
    image_type: 'url',
    notification_type: initialData?.notification_type || 'in_app',
    image: initialData?.image || ''
  };

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues
  });

  const onSubmit = async (data: NotificationFormValues) => {
    try {
      setLoading(true);

      if (data.image_type === 'image' && data.image.length > 0) {
        const image = data.image;

        const url = await uploadToCloudinary(image);

        data.image = url;
      }
      const res = await baseFetch(`/notifications/create`, {
        method: 'POST',
        body: data
      });

      if (res.status) {
        revalidatePathHandler('admin/notifications');
        toast({
          variant: 'default',
          title: toastMessage
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error creating notification',
          description: res.msg
        });
      }

      router.refresh();
      router.push(`/admin/notifications`);
    } catch (error: any) {
      console.error('Error during notification creation:', error);
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
          <div className="gap-8 md:grid md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Notification title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Notification body"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Type</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue('image', '');
                    }}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select an image type"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">Select One</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="url">URL</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notification_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notification Type</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a notification type"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">Select One</SelectItem>
                      <SelectItem value="in_app">In-app</SelectItem>
                      <SelectItem value="url">URL</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {initialData?.image && (
              <div className="col-span-2">
                <img
                  src={initialData?.image}
                  alt={`Preview `}
                  className="h-full w-40 rounded-md object-cover"
                />
              </div>
            )}

            {form.watch('image_type') === 'url' && (
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Enter image URL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {form.watch('image_type') === 'image' && (
              <Controller
                name="image"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image Upload</FormLabel>
                    <FormControl>
                      <Dropzone name={field.name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
