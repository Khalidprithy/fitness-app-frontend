import { apiSlice } from '../apiSlice';

type CreateNewsData = {
  title: string;
  description: string;
};

type UpdateNewsData = {
  id: string;
  title?: string;
  description?: string;
};

type DeleteNewsData = {
  id: string;
};

export const newsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => `/admin/news`,
      providesTags: ['News']
    }),

    findNews: builder.query({
      query: (id: string) => `/admin/news/find/${id}`,
      providesTags: ['News']
    }),

    createNews: builder.mutation({
      query: (data: CreateNewsData) => {
        return {
          url: `/admin/news/create`,
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: ['News']
    }),

    updateNews: builder.mutation({
      query: (data: UpdateNewsData) => {
        return {
          url: `/admin/news/update`,
          method: 'PUT',
          body: data
        };
      },
      invalidatesTags: ['News']
    }),

    deleteNews: builder.mutation({
      query: (data: DeleteNewsData) => {
        return {
          url: `/admin/news/delete`,
          method: 'DELETE',
          body: data
        };
      },
      invalidatesTags: ['News']
    })
  })
});

export const {
  useGetNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
  useFindNewsQuery
} = newsApi;
