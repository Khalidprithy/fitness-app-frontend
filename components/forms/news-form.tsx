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
import { Separator } from '@/components/ui/separator';
import { baseFetch } from '@/lib/baseFetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import 'flatpickr/dist/themes/material_blue.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { Controller, useForm } from 'react-hook-form';
import { uploadToCloudinary } from '../actions';
import Dropzone from '../dropzone';
import { NewsFormValues, newsSchema } from '../schemas';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';

interface NewsFormProps {
  id?: string;
  initialData?: NewsFormValues | null;
}

export const NewsForm: React.FC<NewsFormProps> = ({ id, initialData }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Update News' : 'Create News';
  const description = initialData
    ? 'Update an existing news article.'
    : 'Add a new news article';
  const toastMessage = initialData
    ? 'News updated successfully.'
    : 'News created successfully.';
  const action = initialData ? 'Update' : 'Create';

  // @ts-ignore
  const defaultValues: NewsFormValues = {
    ...initialData,
    image: initialData?.image || '',
    league_image: initialData?.league_image || ''
  };

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues
  });

  const onSubmit = async (data: NewsFormValues) => {
    try {
      setLoading(true);

      // Handle cloudinary upload for images if necessary
      if (data.image) {
        const url = await uploadToCloudinary(data.image);
        data.image = url;
      }

      const res = await baseFetch(`/news/${id ? 'update' : 'create'}`, {
        method: id ? 'PUT' : 'POST',
        body: data
      });

      if (res.status) {
        revalidatePathHandler('admin/news');
        toast({
          variant: 'default',
          title: toastMessage
        });
        router.push(`/admin/news`);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error creating news',
          description: res.msg
        });
      }
    } catch (error: any) {
      console.error('Error during news creation:', error);
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
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="News title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="News category"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Source Name */}
            <FormField
              control={form.control}
              name="source_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Source name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* League ID */}
            <FormField
              control={form.control}
              name="league_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>League ID</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="League ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Publish Date */}
            <FormField
              control={form.control}
              name="publish_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publish Date</FormLabel>

                  <FormControl>
                    <Flatpickr
                      data-enable-time
                      value={field.value}
                      onChange={(date) => {
                        // Convert Date object to string in the format "YYYY-MM-DD HH:MM:SS"
                        const formattedDate = format(
                          date[0],
                          'yyyy-MM-dd HH:mm:ss'
                        );
                        field.onChange(formattedDate);
                      }}
                      options={{
                        dateFormat: 'Y-m-d H:i:S',
                        enableTime: true,
                        time_24hr: true
                      }}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={loading}
                      placeholder="Select publish date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* URL */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="News description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            {form.watch('image') && (
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
