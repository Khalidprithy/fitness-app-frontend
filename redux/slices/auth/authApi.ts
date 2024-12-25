import { apiSlice } from '../api/apiSlice';

interface AdminLoginData {
  username: string;
  password: string;
}

interface UserRegisterData {
  name: string;
  email: string;
  password: string;
}

interface UserLoginData {
  email: string;
  password: string;
}

interface VerifyEmailData {
  otp: string;
}

interface ForgetPasswordData {
  email: string;
}

interface VerifyForgetPasswordOtpData {
  otp: string;
}

interface ChangeForgetPasswordData {
  newPassword: string;
}

interface ResendOtpData {
  email: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    adminLogin: builder.mutation({
      query: (data: AdminLoginData) => {
        return {
          url: `/admin/login`,
          method: 'POST',
          body: data
        };
      }
    }),
    userRegister: builder.mutation({
      query: (data: UserRegisterData) => {
        return {
          url: `/user/register`,
          method: 'POST',
          body: data
        };
      }
    }),
    userLogin: builder.mutation({
      query: (data: UserLoginData) => {
        return {
          url: `/user/login`,
          method: 'POST',
          body: data
        };
      }
    }),
    verifyEmail: builder.mutation({
      query: (data: VerifyEmailData) => {
        return {
          url: `/user/verify-otp`,
          method: 'POST',
          body: data
        };
      }
    }),
    forgetPassword: builder.mutation({
      query: (data: ForgetPasswordData) => {
        return {
          url: `/user/forget-password`,
          method: 'POST',
          body: data
        };
      }
    }),
    verifyForgetPasswordOtp: builder.mutation({
      query: (data: VerifyForgetPasswordOtpData) => {
        return {
          url: `/user/verify-forget-otp`,
          method: 'POST',
          body: data
        };
      }
    }),
    changeForgetPassword: builder.mutation({
      query: (data: ChangeForgetPasswordData) => {
        return {
          url: `/user/change-password`,
          method: 'PUT',
          body: data
        };
      }
    }),
    resendOtp: builder.mutation({
      query: (data: ResendOtpData) => {
        return {
          url: `/auth/resend-otp`,
          method: 'POST',
          body: data
        };
      }
    }),
    getProfile: builder.mutation({
      query: () => `/profile`
    })
  })
});

export const {
  useAdminLoginMutation,
  useUserLoginMutation,
  useResendOtpMutation,
  useGetProfileMutation,
  useVerifyEmailMutation,
  useUserRegisterMutation,
  useForgetPasswordMutation,
  useChangeForgetPasswordMutation,
  useVerifyForgetPasswordOtpMutation
} = authApi;
