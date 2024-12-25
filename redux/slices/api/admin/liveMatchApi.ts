import { apiSlice } from '../apiSlice';

type CreateLiveMatchData = {
  title: string;
  description: string;
};

type UpdateLiveMatchData = {
  id: string;
  title?: string;
  description?: string;
};

type DeleteLiveMatchData = {
  id: string;
};

export const liveMatchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLiveMatches: builder.query({
      query: () => `/admin/live-matches`,
      providesTags: ['LiveMatch']
    }),

    findLiveMatch: builder.query({
      query: (id: string) => `/admin/live-match/find/${id}`,
      providesTags: ['LiveMatch']
    }),

    createLiveMatch: builder.mutation({
      query: (data: CreateLiveMatchData) => {
        return {
          url: `/admin/live-match/create`,
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: ['LiveMatch']
    }),

    updateLiveMatch: builder.mutation({
      query: (data: UpdateLiveMatchData) => {
        return {
          url: `/admin/live-match/update`,
          method: 'PUT',
          body: data
        };
      },
      invalidatesTags: ['LiveMatch']
    }),

    deleteLiveMatch: builder.mutation({
      query: (data: DeleteLiveMatchData) => {
        return {
          url: `/admin/live-match/delete`,
          method: 'DELETE',
          body: data
        };
      },
      invalidatesTags: ['LiveMatch']
    })
  })
});

export const {
  useGetLiveMatchesQuery,
  useCreateLiveMatchMutation,
  useUpdateLiveMatchMutation,
  useDeleteLiveMatchMutation,
  useFindLiveMatchQuery
} = liveMatchApi;
