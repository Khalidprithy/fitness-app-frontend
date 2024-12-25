'use client';
import { revalidatePathHandler } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { baseFetch } from '@/lib/baseFetch';
import { zodResolver } from '@hookform/resolvers/zod';
import 'flatpickr/dist/themes/material_blue.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import { uploadToCloudinary } from '../actions';
import InputField from '../custom/input';
import RadioInputField from '../custom/radio-input-field';
import { WorkoutValues, workoutSchema } from '../schemas';
import { useToast } from '../ui/use-toast';

interface WorkoutFormProps {
  id?: string;
  initialData?: WorkoutValues | null;
  trainingLevels: any;
  targetMuscles: any;
  equipments: any;
  categories: any;
}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({
  id,
  initialData,
  trainingLevels,
  targetMuscles,
  equipments,
  categories
}) => {
  console.log('categories', categories);

  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Update Workout' : 'Create Workout';
  const description = initialData
    ? 'Update an existing workout.'
    : 'Add a new workout.';
  const toastMessage = initialData
    ? 'Workout updated successfully.'
    : 'Workout created successfully.';
  const action = initialData ? 'Update' : 'Create';

  const defaultValue = {};

  const defaultValues: WorkoutValues = {
    ...initialData,
    title: initialData?.title || '',
    level: initialData?.level || 'Beginner',
    duration: initialData?.duration || 0,
    videoUrl: initialData?.videoUrl || '',
    thumbnail: initialData?.thumbnail || '',
    isFavorite: initialData?.isFavorite || false,
    description: initialData?.description || '',
    category: initialData?.category || '',
    equipment: initialData?.equipment || [],
    targetMuscles: initialData?.targetMuscles || [],
    caloriesBurnedEstimate: initialData?.caloriesBurnedEstimate || 0
  };

  const form = useForm<WorkoutValues>({
    resolver: zodResolver(workoutSchema),
    defaultValues
  });

  const onSubmit = async (data: WorkoutValues) => {
    try {
      setLoading(true);

      // Handle cloudinary upload for images if necessary
      if (data.thumbnail?.name) {
        const url = await uploadToCloudinary(data.thumbnail);
        data.thumbnail = url;
      } else if (data.thumbnail === '') {
        delete data.thumbnail; // Remove the thumbnail field if it is an empty string
      }

      const res = await baseFetch(
        `/v1/workout/${id ? `update/${id}` : 'create'}`,
        {
          method: id ? 'PATCH' : 'POST',
          body: data
        }
      );

      if (res.status) {
        revalidatePathHandler('admin/workout');
        toast({
          variant: 'default',
          title: toastMessage
        });
        router.push(`/admin/workout`);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error creating workout',
          description: res.msg
        });
      }
    } catch (error: any) {
      console.error('Error during workout creation:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  const onError = (errors: any) => {
    console.log(errors);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="w-full space-y-8 rounded-lg border p-2 lg:p-5"
        >
          <InputField name="title" label="Title" type="text" />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <InputField
              name="level"
              label="Level"
              type="select"
              options={trainingLevels}
            />
            <InputField
              name="category"
              label="Category"
              type="select"
              options={categories}
            />
            <InputField
              name="duration"
              label="Duration (minutes)"
              type="number"
            />
            <InputField
              name="caloriesBurnedEstimate"
              label="Calories Burned Estimate"
              type="number"
            />

            <div>
              <label className="mb-2 block text-sm font-medium capitalize text-muted-foreground">
                Equipment
              </label>
              <ReactSelect
                isMulti
                options={equipments}
                onChange={(val) =>
                  form.setValue(
                    'equipment',
                    val.map((v) => v.value)
                  )
                }
                defaultValue={defaultValues.equipment.map((e) => ({
                  value: e,
                  label: e
                }))}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium capitalize text-muted-foreground">
                Target Muscles
              </label>
              <ReactSelect
                isMulti
                options={targetMuscles}
                onChange={(val) =>
                  form.setValue(
                    'targetMuscles',
                    val.map((v) => v.value)
                  )
                }
                defaultValue={defaultValues.targetMuscles.map((tm) => ({
                  value: tm,
                  label: tm
                }))}
              />
            </div>
          </div>

          <InputField name="videoUrl" label="Video URL" type="text" />
          <InputField name="thumbnail" label="Thumbnail" type="image" />

          <InputField name="description" label="Description" type="textarea" />

          <RadioInputField
            form={form}
            name="isFavorite"
            label="Is Favorite?"
            yesLabel="Yes"
            noLabel="No"
          />

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
