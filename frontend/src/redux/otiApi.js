import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const otpApi = createApi({
  reducerPath: "otpApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/sendOtp",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/verifyOtp",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendOtpMutation, useVerifyOtpMutation } = otpApi;