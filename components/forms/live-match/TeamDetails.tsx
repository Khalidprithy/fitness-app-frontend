import Dropzone from '@/components/dropzone';
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
import { Controller } from 'react-hook-form';

export default function TeamDetails({
  form,
  loading
}: {
  form: any;
  loading: boolean;
}) {
  return (
    <>
      <div className="col-span-6 rounded-md border p-2 lg:col-span-3">
        <h4 className="text-lg font-semibold">Team One</h4>
        <FormField
          control={form.control}
          name="team_one_name"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Team one name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="team_one_image_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Type</FormLabel>
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
                      placeholder="Image type"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">Select One</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch('team_one_image_type') === 'url' && (
          <FormField
            control={form.control}
            name="team_one_image"
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

        {form.watch('team_one_image_type') === 'image' && (
          <Controller
            name="team_one_image"
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

      <div className="col-span-6 rounded-md border p-2 lg:col-span-3">
        {/* Team Info */}
        <h4 className="text-lg font-semibold">Team Two</h4>
        <FormField
          control={form.control}
          name="team_two_name"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Team two name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="team_two_image_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Type</FormLabel>
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
                      placeholder="Image type"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">Select One</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch('team_two_image_type') === 'url' && (
          <FormField
            control={form.control}
            name="team_two_image"
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

        {form.watch('team_two_image_type') === 'image' && (
          <Controller
            name="team_two_image"
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
    </>
  );
}
