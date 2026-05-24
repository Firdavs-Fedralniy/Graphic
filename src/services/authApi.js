import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: supabaseUrl,
    prepareHeaders: (headers) => {
      headers.set("apikey", supabaseKey)
      headers.set("Authorization", `Bearer ${supabaseKey}`)
      headers.set("Content-Type", "application/json")
      return headers
    },
  }),
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => ({
        url: "/auth/v1/token?grant_type=password",
        method: "POST",
        body: data
      })
    }),
    register: builder.mutation({
      query: ({ email, password,}) => ({
        url: "/auth/v1/signup",
        method: "POST",
       body: {email,password}
      })
    })  
  })
})

export const { useLogInMutation, useRegisterMutation} = authApi    