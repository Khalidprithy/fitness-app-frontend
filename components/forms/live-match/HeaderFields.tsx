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

type HeaderFieldsProps = {
  control: Control<LiveMatchFormValues>;
  form: UseFormReturn<LiveMatchFormValues>;
  sourceIndex: number;
};

export default function HeaderFields({
  control,
  form,
  sourceIndex
}: HeaderFieldsProps) {
  const {
    fields: headerFields,
    append: appendHeader,
    remove: removeHeader
  } = useFieldArray({
    control,
    name: `streaming_sources.${sourceIndex}.headers`
  });

  return (
    <div className="col-span-2">
      {headerFields.map((header, headerIndex) => (
        <div key={header.id} className="relative mb-2 rounded-lg border p-4">
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => removeHeader(sourceIndex)}
            className="absolute right-2 top-2 h-6 w-6"
          >
            <Icons.close />
          </Button>
          <Badge> Source:{sourceIndex + 1}</Badge>

          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
            <FormField
              control={form.control}
              name={`streaming_sources.${sourceIndex}.headers.${headerIndex}.key`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Header</FormLabel>
                  <FormControl>
                    <Input placeholder="Header" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`streaming_sources.${sourceIndex}.headers.${headerIndex}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input placeholder="Value" {...field} />
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
        onClick={() => appendHeader({ key: '', value: '' })}
      >
        Add Header
      </Button>
    </div>
  );
}
