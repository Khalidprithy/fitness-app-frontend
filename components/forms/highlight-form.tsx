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
import { format } from 'date-fns';
import 'flatpickr/dist/themes/material_blue.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { Controller, useForm } from 'react-hook-form';
import { uploadToCloudinary } from '../actions';
import Dropzone from '../dropzone';
import { HighlightFormValues, highlightSchema } from '../schemas';
import { useToast } from '../ui/use-toast';

interface HighlightFormProps {
  id?: string;
  initialData?: HighlightFormValues | null;
}

export const HighlightForm: React.FC<HighlightFormProps> = ({
  id,
  initialData
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Update Highlight' : 'Create Highlight';
  const description = initialData
    ? 'Update an existing highlight.'
    : 'Add a new highlight';
  const toastMessage = initialData
    ? 'Highlight updated successfully.'
    : 'Highlight created successfully.';
  const action = initialData ? 'Update' : 'Create';

  // @ts-ignore
  const defaultValues: HighlightFormValues = {
    ...initialData,
    league_image: initialData?.league_image || '',
    highlight_image: initialData?.highlight_image || '',
    youtube_url: initialData?.youtube_url || ''
  };

  const form = useForm<HighlightFormValues>({
    resolver: zodResolver(highlightSchema),
    defaultValues
  });

  const onSubmit = async (data: HighlightFormValues) => {
    try {
      setLoading(true);

      // Handle cloudinary upload for images if necessary
      if (data.thumbnail_type === 'image' && data.highlight_image.length > 0) {
        const image = data.highlight_image;

        const url = await uploadToCloudinary(image);

        data.highlight_image = url;
      }

      const res = await baseFetch(`/highlights/${id ? 'update' : 'create'}`, {
        method: id ? 'PUT' : 'POST',
        body: data
      });

      if (res.status) {
        revalidatePathHandler('admin/highlights');
        toast({
          variant: 'default',
          title: toastMessage
        });
        router.push(`/admin/highlights`);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error creating highlight',
          description: res.msg
        });
      }
    } catch (error: any) {
      console.error('Error during highlight creation:', error);
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
                      placeholder="Highlight title"
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
                      placeholder="Highlight category"
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

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
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
                      placeholder="Select publish time"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Video Type */}
            <FormField
              control={form.control}
              name="video_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Type</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a video type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* YouTube URL */}
            {form.watch('video_type') === 'youtube' && (
              <FormField
                control={form.control}
                name="youtube_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube URL</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Enter YouTube URL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Image Upload */}
            {form.watch('thumbnail_type') === 'image' && (
              <Controller
                name="highlight_image"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Highlight Image Upload</FormLabel>
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
