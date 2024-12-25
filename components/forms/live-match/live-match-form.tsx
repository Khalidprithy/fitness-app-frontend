'use client';

import { revalidatePathHandler } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { generateRandomId } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { LiveMatchFormValues, matchSchema } from '@/components/schemas';
import { baseFetch } from '@/lib/baseFetch';
import MatchDetails from './MatchDetails';
import StreamingSourceFields from './StreamingSourceFields';
import TeamDetails from './TeamDetails';

const defaultValues: LiveMatchFormValues = {
  id: generateRandomId(),
  fixture_id: 101,
  match_title: '',
  match_time: '',
  utcTime: '',
  time: '',
  is_hot: '0',
  league: '',
  status: '1',
  team_one_name: '',
  team_two_name: '',
  team_one_image: '',
  team_two_image: '',
  position: 1,
  streaming_sources: [
    {
      stream_title: 'SD',
      platform: 'both',
      is_premium: '0',
      stream_status: '1',
      resolution: '480p',
      stream_url: 'https://fast.com/',
      stream_type: 'restricted',
      portrait_watermark:
        '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.0,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
      landscape_watermark:
        '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.5,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
      headers: [{ key: 'Referer', value: 'dx' }],
      root_streams: [
        {
          root_stream_type: 'flussonic',
          root_stream_status: '1',
          root_stream_stream_url: 'dx',
          root_stream_stream_key: 'dx'
        }
      ]
    },
    {
      stream_title: 'HD',
      platform: 'both',
      is_premium: '0',
      stream_status: '0',
      resolution: '720p',
      stream_type: 'restricted',
      stream_url: 'https://fast.com/',
      portrait_watermark:
        '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.0,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
      landscape_watermark:
        '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.5,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
      headers: [
        { key: 'Origin', value: 'dx' },
        { key: 'Referer', value: 'dx' }
      ],
      root_streams: [
        {
          root_stream_type: 'flussonic',
          root_stream_status: '1',
          root_stream_stream_url: 'dx',
          root_stream_stream_key: 'dx'
        }
      ]
    },
    {
      stream_title: 'HD',
      platform: 'both',
      is_premium: '0',
      stream_status: '1',
      resolution: '720p',
      stream_type: 'restricted',
      stream_url: 'https://fast.com/',
      portrait_watermark:
        '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.0,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
      landscape_watermark:
        '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.5,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
      headers: [{ key: 'Referer', value: 'dx' }],
      root_streams: [
        {
          root_stream_type: 'flussonic',
          root_stream_status: '1',
          root_stream_stream_url: 'dx',
          root_stream_stream_key: 'dx'
        }
      ]
    }
  ]
};

interface LiveMatchFormProps {
  id?: string;
  initialData?: LiveMatchFormValues | null;
  leagues?: any;
}

const LiveMatchForm: React.FC<LiveMatchFormProps> = ({
  id,
  initialData,
  leagues
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const title = id ? 'Update live match' : 'Create live match';
  const description = id ? 'Update a live match.' : 'Add a new live match';
  const toastMessage = id ? 'Live match  updated' : 'Live match created.';
  const action = id ? 'Update' : 'Create';

  const liveMatchValues = id
    ? { ...initialData, team_one_image_type: 'url', team_two_image_type: 'url' }
    : defaultValues;

  const form = useForm({
    defaultValues: liveMatchValues,
    resolver: zodResolver(matchSchema)
  });

  const { control, handleSubmit } = form;
  const onSubmit = async (data: LiveMatchFormValues) => {
    try {
      setLoading(true);

      delete data.team_one_image_type;
      delete data.team_two_image_type;
      data.time = moment
        .utc(data.match_time, 'YYYY-MM-DD HH:mm:ss')
        .unix()
        .toString();

      const res = await baseFetch(
        `/live-match/${id ? `update${id}` : `create`}`,
        {
          method: id ? 'PUT' : 'POST',
          body: data
        }
      );

      if (res.status === 201) {
        revalidatePathHandler('admin/manage-live');
        toast({
          variant: 'default',
          title: toastMessage
        });
      }

      router.refresh();
      router.push(`/admin/manage-live`);
    } catch (error) {
      console.error(error);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-6">
            <MatchDetails form={form} loading={loading} leagues={leagues} />

            <Separator className="col-span-6" />

            <TeamDetails form={form} loading={loading} />

            {/* Streaming Sources Field */}
            <StreamingSourceFields control={control} form={form} />
            <div className="col-span-6 flex items-center justify-end">
              <Button type="submit">{action}</Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default LiveMatchForm;
