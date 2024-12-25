'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ErrorMessage } from '@hookform/error-message';
import { format } from 'date-fns';
import 'flatpickr/dist/themes/airbnb.css';
import Flatpickr from 'react-flatpickr';
import { Controller, useFormContext } from 'react-hook-form';
import ReactSelect from 'react-select';
import DropzoneSingle from './dropzone-single';
import TextEditor from './text-editor';

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  className?: string;
  readOnly?: boolean;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'select'
    | 'textarea'
    | 'rich-text'
    | 'react-select'
    | 'react-select-multi'
    | 'image'
    | 'checkbox'
    | 'datetime';
};

export default function InputField(props: Props) {
  const { name, type, label, placeholder, options, className, readOnly } =
    props;
  const {
    control,
    formState: { errors, isSubmitting }
  } = useFormContext();

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {label && (
        <Label className="capitalize" htmlFor={name}>
          {label}
        </Label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === 'checkbox' ? (
            <div className="flex gap-10">
              {options?.map(({ label, value }) => (
                <div className="flex items-center gap-3" key={value}>
                  <Checkbox
                    checked={field.value?.includes(value)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...field?.value, value])
                        : field.onChange(
                            field.value?.filter(
                              (fieldValue: string) => fieldValue !== value
                            )
                          );
                    }}
                    id={label}
                    value={value}
                    disabled={isSubmitting}
                  />

                  <label htmlFor={label} className="cursor-pointer text-sm">
                    {label}
                  </label>
                </div>
              ))}
            </div>
          ) : type === 'datetime' ? (
            <Flatpickr
              id={name}
              value={field.value && new Date(field.value)}
              onChange={(date) => {
                const formattedDate = format(date[0], 'yyyy-MM-dd HH:mm:ss');
                field.onChange(formattedDate);
              }}
              options={{
                dateFormat: 'd M Y H:i',
                enableTime: true,
                time_24hr: true
              }}
              className="flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSubmitting}
            />
          ) : type === 'textarea' ? (
            <Textarea
              disabled={isSubmitting}
              {...field}
              id={name}
              placeholder={placeholder}
              rows={3}
            />
          ) : type === 'rich-text' ? (
            <TextEditor {...field} />
          ) : type.includes('react-select') ? (
            <ReactSelect
              {...field}
              options={options}
              id={name}
              isMulti={type === 'react-select-multi'}
            />
          ) : type === 'image' ? (
            <DropzoneSingle name={name} />
          ) : type === 'select' && options ? (
            <Select
              disabled={isSubmitting}
              onValueChange={(val) => val && field.onChange(val)}
              value={field.value}
            >
              <SelectTrigger
                className="bg-background"
                id={name}
                disabled={isSubmitting}
              >
                <SelectValue placeholder={placeholder || 'Select an Option'} />
              </SelectTrigger>

              <SelectContent>
                {options.map((option, i) => (
                  <SelectItem key={i} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              {...field}
              className={`${
                readOnly ? 'cursor-not-allowed bg-muted' : 'bg-background'
              }`}
              disabled={isSubmitting}
              type={type}
              id={name}
              placeholder={placeholder}
              readOnly={readOnly}
              onWheel={(e) =>
                type === 'number' && (e.target as HTMLInputElement)?.blur()
              }
            />
          )
        }
      />

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="text-sm text-destructive">{message}</p>
        )}
      />
    </div>
  );
}
