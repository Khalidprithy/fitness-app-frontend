import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';

interface RadioInputFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  labelClass?: string;
  yesLabel?: string;
  noLabel?: string;
  controlIndex?: number; // optional if field is part of a dynamic list
}

export default function RadioInputField({
  form,
  name,
  label,
  labelClass,
  yesLabel = 'Yes',
  noLabel = 'No',
  controlIndex
}: RadioInputFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClass + ' capitalize'}>{label}</FormLabel>
          {/* Radio Group */}
          <FormControl>
            <RadioGroup
              className="flex items-center space-x-2"
              onValueChange={(value) => field.onChange(value === 'true')}
              value={field.value?.toString()}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id={`r1-${controlIndex}`} />
                <Label htmlFor={`r1-${controlIndex}`}>{yesLabel}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id={`r2-${controlIndex}`} />
                <Label htmlFor={`r2-${controlIndex}`}>{noLabel}</Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
