import { Icons } from '@/components/icons';
import { matchSchema } from '@/components/schemas';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control, useFieldArray, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type LiveMatchFormValues = z.infer<typeof matchSchema>;

type RootStreamFieldsProps = {
  control: Control<LiveMatchFormValues>;
  form: UseFormReturn<LiveMatchFormValues>;
  sourceIndex: number;
};

export default function RootStreamFields({
  control,
  form,
  sourceIndex
}: RootStreamFieldsProps) {
  const {
    fields: rootStreamFields,
    append: appendRootStream,
    remove: removeRootStream
  } = useFieldArray({
    control,
    name: `streaming_sources.${sourceIndex}.root_streams`
  });
  return (
    <div className="col-span-2">
      {rootStreamFields.map((rootStream, rootStreamIndex) => (
        <div
          key={rootStream.id}
          className="relative mb-4 rounded-md border p-2"
        >
          {/* Root Stream URL */}

          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => removeRootStream(rootStreamIndex)}
            className="absolute right-2 top-2 h-6 w-6"
          >
            <Icons.close />
          </Button>
          <Badge> Source:{rootStreamIndex + 1}</Badge>
          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
            <FormField
              control={form.control}
              name={`streaming_sources.${sourceIndex}.root_streams.${rootStreamIndex}.root_stream_type`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Root Stream Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Root Stream Type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`streaming_sources.${sourceIndex}.root_streams.${rootStreamIndex}.root_stream_status`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Root Stream Status</FormLabel>
                  <FormControl>
                    <Input placeholder="Root Stream Status" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`streaming_sources.${sourceIndex}.root_streams.${rootStreamIndex}.root_stream_stream_url`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Root Stream URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Root Stream URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`streaming_sources.${sourceIndex}.root_streams.${rootStreamIndex}.root_stream_stream_key`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key</FormLabel>
                  <FormControl>
                    <Input placeholder="Key" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          appendRootStream({
            root_stream_type: 'flussonic',
            root_stream_status: '1',
            root_stream_stream_url: '',
            root_stream_stream_key: ''
          })
        }
      >
        Add Root Stream
      </Button>
    </div>
  );
}
