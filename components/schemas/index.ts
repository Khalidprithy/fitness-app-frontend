import * as z from 'zod';

export const adminLoginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
});

export type AdminFormValue = z.infer<typeof adminLoginSchema>;

export const userLoginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(8, { message: 'Enter at least 8 characters' })
});

export type UserLoginValue = z.infer<typeof userLoginSchema>;

const rootStreamSchema = z.object({
  root_stream_type: z.string().min(1, 'Type is required'),
  root_stream_status: z.string().min(1, 'Status is required'),
  root_stream_stream_url: z.any(),
  root_stream_stream_key: z.string().min(1, 'Token is required')
});

const headerSchema = z.object({
  key: z.string().min(1, 'Header key is required').default('dx'),
  value: z.string().min(1, 'Header value is required').default('dx')
});

const streamingSourceSchema = z.object({
  stream_title: z.string().min(1, 'Title is required'),
  is_premium: z.string().min(1, 'Premium status is required'),
  resolution: z.string().min(1, 'Resolution is required'),
  stream_status: z.string().optional().default('1'),
  platform: z.enum(['both', 'android', 'ios']).optional().default('both'),
  stream_type: z
    .enum(['root_stream', 'restricted', 'm3u8', 'web'])
    .optional()
    .default('root_stream'),
  portrait_watermark: z.string().optional().default('{}'),
  landscape_watermark: z.string().optional().default('{}'),
  stream_url: z.string().url('Invalid Stream URL'),
  stream_key: z.string().optional(),
  headers: z.array(headerSchema).optional(),
  root_streams: z.array(rootStreamSchema).optional()
});

export const matchSchema = z.object({
  id: z.number(),
  fixture_id: z.number(),
  match_title: z.string().min(1, { message: 'Required' }),
  match_time: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format'
  }),
  utcTime: z.string(),
  time: z.string(),
  is_hot: z.string().optional().default('1'),
  league: z.string().min(1, { message: 'Please select a league' }),
  status: z.string().optional().default('1'),
  team_one_name: z.string().min(1, 'Team name is required'),
  team_two_name: z.string().min(1, 'Team name is required'),
  team_one_image: z.any().optional(),
  team_one_image_type: z.string().optional(),
  team_two_image: z.any().optional(),
  team_two_image_type: z.string().optional(),
  position: z.number().optional().default(999999999),
  streaming_sources: z.array(streamingSourceSchema)
});

export type LiveMatchFormValues = z.infer<typeof matchSchema>;

export const highlightSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  league_id: z.number().optional(),
  league_image: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  short_description: z.string().optional(),
  video_type: z.string().min(1, 'Video type is required'),
  youtube_url: z.string().url().optional(),
  thumbnail_type: z.string().optional(),
  highlight_image: z.any().optional(),
  fixture_id: z.string().optional(),
  videos: z.array(z.string()).optional(),
  status: z.string().optional()
});

export type HighlightFormValues = z.infer<typeof highlightSchema>;

export const notificationSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
  image_type: z.string().optional().default('url'),
  image: z.any().optional(),
  notification_type: z.string().default('in_app'),
  action_url: z.string().optional()
});

export type NotificationFormValues = z.infer<typeof notificationSchema>;

export const newsSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  source_name: z.string().optional(),
  news: z.string().optional(),
  league_id: z.number().optional(),
  league_image: z.string().optional(),
  slug: z.string().optional(),
  url: z.string().url('Must be a valid URL').optional(),
  image: z.any().optional(),
  description: z.string().optional(),
  publish_date: z.string().optional(),
  status: z.string().optional()
});

export type NewsFormValues = z.infer<typeof newsSchema>;

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.any().optional(),
  status: z.boolean().default(true)
});

export type CategoryValues = z.infer<typeof categorySchema>;

export const equipmentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.any().optional(),
  status: z.boolean().default(true)
});

export type EquipmentValues = z.infer<typeof equipmentSchema>;

export const targetMuscleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.any().optional(),
  status: z.boolean().default(true)
});

export type TargetMuscleValues = z.infer<typeof targetMuscleSchema>;

export const trainingLevelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.any().optional(),
  status: z.boolean().default(true)
});

export type TrainingLevelValues = z.infer<typeof trainingLevelSchema>;

export const workoutSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  level: z.string().min(1, { message: 'Level is required' }),
  duration: z.coerce
    .number()
    .positive({ message: 'Duration must be a positive number' }),
  videoUrl: z.string().url({ message: 'Video URL must be a valid URL' }),
  thumbnail: z.any().optional(),
  isFavorite: z.boolean().optional(),
  description: z.string().min(1, { message: 'Description is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  equipment: z.array(z.string()).optional().default([]),
  targetMuscles: z.array(z.string()).optional().default([]),
  caloriesBurnedEstimate: z.coerce
    .number()
    .positive({ message: 'Calories burned estimate must be a positive number' })
    .optional()
});

export type WorkoutValues = z.infer<typeof workoutSchema>;
