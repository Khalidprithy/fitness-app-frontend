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
import { format } from 'date-fns';
import 'flatpickr/dist/themes/material_blue.css';
import Flatpickr from 'react-flatpickr';

export default function MatchDetails({
  leagues,
  form,
  loading
}: {
  leagues: any;
  form: any;
  loading: boolean;
}) {
  return (
    <>
      <FormField
        control={form.control}
        name="match_title"
        render={({ field }) => (
          <FormItem className="col-span-6 lg:col-span-2">
            <FormLabel>Match Title</FormLabel>
            <FormControl>
              <Input disabled={loading} placeholder="Match title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Match Time Field */}
      <FormField
        control={form.control}
        name="match_time"
        render={({ field }) => (
          <FormItem className="col-span-6 lg:col-span-2">
            <FormLabel>Match Time</FormLabel>
            <FormControl>
              <Flatpickr
                data-enable-time
                value={field.value}
                onChange={(date) => {
                  // Convert Date object to string in the format "YYYY-MM-DD HH:MM:SS"
                  const formattedDate = format(date[0], 'yyyy-MM-dd HH:mm:ss');
                  field.onChange(formattedDate);
                }}
                options={{
                  dateFormat: 'Y-m-d H:i:S',
                  enableTime: true,
                  time_24hr: true
                }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
                placeholder="Select match time"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="fixture_id"
        render={({ field }) => (
          <FormItem className="col-span-6 lg:col-span-2">
            <FormLabel>Fixture ID</FormLabel>
            <FormControl>
              <Input disabled={loading} placeholder="Fixture ID" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="league"
        render={({ field }) => (
          <FormItem className="col-span-6 lg:col-span-2">
            <FormLabel>League</FormLabel>
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
                    placeholder="Select a category"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {/* @ts-ignore  */}
                {leagues.map((league) => (
                  <SelectItem key={league._id} value={league._id}>
                    {league.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Is Hot Field */}
      <FormField
        control={form.control}
        name="is_hot"
        render={({ field }) => (
          <FormItem className="col-span-6 lg:col-span-2">
            <FormLabel>Is Hot Match</FormLabel>
            <Select
              disabled={loading}
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Is Hot Match" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="0">No</SelectItem>
                <SelectItem value="1">Yes</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Match Status */}
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem className="col-span-6 lg:col-span-2">
            <FormLabel>Status</FormLabel>
            <Select
              disabled={loading}
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Match Status" />
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
    </>
  );
}
