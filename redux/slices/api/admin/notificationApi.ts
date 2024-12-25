import { apiSlice } from '../apiSlice';

type CreateNotificationData = {
  title: string;
  description: string;
};

type UpdateNotificationData = {
  id: string;
  title?: string;
  description?: string;
};

type DeleteNotificationData = {
  id: string;
};

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => `/admin/notification`,
      providesTags: ['Notification']
    }),

    findNotification: builder.query({
      query: (id: string) => `/admin/notification/find/${id}`,
      providesTags: ['Notification']
    }),

    createNotification: builder.mutation({
      query: (data: CreateNotificationData) => {
        return {
          url: `/admin/notification/create`,
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: ['Notification']
    }),

    updateNotification: builder.mutation({
      query: (data: UpdateNotificationData) => {
        return {
          url: `/admin/notification/update`,
          method: 'PUT',
          body: data
        };
      },
      invalidatesTags: ['Notification']
    }),

    deleteNotification: builder.mutation({
      query: (data: DeleteNotificationData) => {
        return {
          url: `/admin/notification/delete`,
          method: 'DELETE',
          body: data
        };
      },
      invalidatesTags: ['Notification']
    })
  })
});

export const {
  useGetNotificationQuery,
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
  useFindNotificationQuery
} = notificationApi;
