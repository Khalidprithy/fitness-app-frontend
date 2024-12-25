import { apiSlice } from '../apiSlice';

type CreateHighlightData = {
  title: string;
  description: string;
};

type UpdateHighlightData = {
  id: string;
  title?: string;
  description?: string;
};

type DeleteHighlightData = {
  id: string;
};

export const highlightApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHighlights: builder.query({
      query: () => `/admin/highlights`,
      providesTags: ['Highlight']
    }),

    findHighlight: builder.query({
      query: (id: string) => `/admin/highlight/find/${id}`,
      providesTags: ['Highlight']
    }),

    createHighlight: builder.mutation({
      query: (data: CreateHighlightData) => {
        return {
          url: `/admin/highlight/create`,
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: ['Highlight']
    }),

    updateHighlight: builder.mutation({
      query: (data: UpdateHighlightData) => {
        return {
          url: `/admin/highlight/update`,
          method: 'PUT',
          body: data
        };
      },
      invalidatesTags: ['Highlight']
    }),

    deleteHighlight: builder.mutation({
      query: (data: DeleteHighlightData) => {
        return {
          url: `/admin/highlight/delete`,
          method: 'DELETE',
          body: data
        };
      },
      invalidatesTags: ['Highlight']
    })
  })
});

export const {
  useGetHighlightsQuery,
  useCreateHighlightMutation,
  useUpdateHighlightMutation,
  useDeleteHighlightMutation,
  useFindHighlightQuery
} = highlightApi;
