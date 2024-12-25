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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Control,
  useFieldArray,
  UseFormReturn,
  useWatch
} from 'react-hook-form';
import { z } from 'zod';
import HeaderFields from './HeaderFields';
import RootStreamFields from './RootStreamFields';

type LiveMatchFormValues = z.infer<typeof matchSchema>;

type StreamingSourceFieldsProps = {
  control: Control<LiveMatchFormValues>;
  form: UseFormReturn<LiveMatchFormValues>;
};

export default function StreamingSourceFields({
  control,
  form
}: StreamingSourceFieldsProps) {
  const {
    fields: streamingSourceFields,
    append: appendStreamingSource,
    remove: removeStreamingSource
  } = useFieldArray({
    control,
    name: 'streaming_sources'
  });

  const watchStreamTypes = useWatch({
    control: form.control,
    name: 'streaming_sources'
  }).map((item) => item.stream_type);

  return (
    <div className="col-span-6 rounded-md border p-2">
      <h4 className="py-2 text-lg font-semibold">Streaming sources</h4>
      {streamingSourceFields.map((source, sourceIndex) => {
        const watchStreamType = watchStreamTypes[sourceIndex];

        return (
          <div key={source.id} className="relative mb-4 rounded-md border p-2">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeStreamingSource(sourceIndex)}
              className="absolute right-2 top-2 h-6 w-6"
            >
              <Icons.close />
            </Button>
            <Badge> Source:{sourceIndex + 1}</Badge>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* Stream Title */}
              <FormField
                control={form.control}
                name={`streaming_sources.${sourceIndex}.stream_title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stream Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Stream Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`streaming_sources.${sourceIndex}.is_premium`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Premium</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString() || '0'}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Is Premium" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Disabled</SelectItem>
                        <SelectItem value="1">Enabled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`streaming_sources.${sourceIndex}.platform`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value?.toString() || '0'}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="both">Both</SelectItem>
                          <SelectItem value="android">Android</SelectItem>
                          <SelectItem value="ios">IOS</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`streaming_sources.${sourceIndex}.resolution`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resolution</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value?.toString() || '0'}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Resolution" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Select One</SelectItem>
                          <SelectItem value="1080p">1080p</SelectItem>
                          <SelectItem value="720p">720p</SelectItem>
                          <SelectItem value="480p">480p</SelectItem>
                          <SelectItem value="360p">360p</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`streaming_sources.${sourceIndex}.portrait_watermark`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portrait Watermark</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Portrait watermark" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`streaming_sources.${sourceIndex}.landscape_watermark`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Landscape Watermark</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Landscape watermark" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`streaming_sources.${sourceIndex}.stream_status`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString() || '0'}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Stream Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Disabled</SelectItem>
                        <SelectItem value="1">Enabled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`streaming_sources.${sourceIndex}.stream_type`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stream Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString() || '0'}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Stream type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Select One</SelectItem>
                        <SelectItem value="root_stream">Root Stream</SelectItem>
                        <SelectItem value="restricted">Restricted</SelectItem>
                        <SelectItem value="m3u8">M3U8</SelectItem>
                        <SelectItem value="web">WEB</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Stream URL */}
              {watchStreamType !== 'root_stream' && (
                <FormField
                  control={form.control}
                  name={`streaming_sources.${sourceIndex}.stream_url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stream URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Stream URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Root Streams */}
              {watchStreamType === 'root_stream' && (
                <RootStreamFields
                  control={control}
                  form={form}
                  sourceIndex={sourceIndex}
                />
              )}

              {/* Headers */}
              {watchStreamType === 'restricted' && (
                <HeaderFields
                  control={control}
                  form={form}
                  sourceIndex={sourceIndex}
                />
              )}
            </div>
          </div>
        );
      })}

      <Button
        type="button"
        onClick={() =>
          appendStreamingSource({
            stream_title: '',
            resolution: '',
            // @ts-ignore
            root_streams: [{ url: '', token: '' }],
            stream_url: '',
            headers: [{ key: '', value: '' }]
          })
        }
      >
        Add Streaming Source
      </Button>
    </div>
  );
}
