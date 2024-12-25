import { apiSlice } from '../apiSlice';

type CreateAppSettingData = {
  title: string;
  description: string;
};

type UpdateAppSettingData = {
  id: string;
  title?: string;
  description?: string;
};

type DeleteAppSettingData = {
  id: string;
};

export const appSettingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppSetting: builder.query({
      query: () => `/admin/app-setting`,
      providesTags: ['AppSetting']
    }),

    findAppSetting: builder.query({
      query: (id: string) => `/admin/app-setting/find/${id}`,
      providesTags: ['AppSetting']
    }),

    createAppSetting: builder.mutation({
      query: (data: CreateAppSettingData) => {
        return {
          url: `/admin/app-setting/create`,
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: ['AppSetting']
    }),

    updateAppSetting: builder.mutation({
      query: (data: UpdateAppSettingData) => {
        return {
          url: `/admin/app-setting/update`,
          method: 'PUT',
          body: data
        };
      },
      invalidatesTags: ['AppSetting']
    }),

    deleteAppSetting: builder.mutation({
      query: (data: DeleteAppSettingData) => {
        return {
          url: `/admin/app-setting/delete`,
          method: 'DELETE',
          body: data
        };
      },
      invalidatesTags: ['AppSetting']
    })
  })
});

export const {
  useGetAppSettingQuery,
  useCreateAppSettingMutation,
  useUpdateAppSettingMutation,
  useDeleteAppSettingMutation,
  useFindAppSettingQuery
} = appSettingApi;
