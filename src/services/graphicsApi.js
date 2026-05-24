import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const graphicApi = createApi({
  reducerPath: "graphicApi",
  tagTypes: ["Graphic"],
  baseQuery: fetchBaseQuery({
    baseUrl: supabaseUrl,
     prepareHeaders: (headers,{ getState }) => {


        
      headers.set("apikey", supabaseKey)
      const token = getState().auth.token

  if (!token) return headers     
      headers.set("Authorization", `Bearer ${token}`)
      headers.set("Content-Type", "application/json")
      return headers
    },
  }),
  endpoints: (builder) => ({
    createGraphic: builder.mutation({
      query: (data) => ({
        url: "rest/v1/graphics",
        method: "POST",
        body: data
      }),
       invalidatesTags:["Graphic"]
    }),
   getGraphic: builder.query({
      query: () => ({
        url: "rest/v1/graphics",
      }),
        providesTags: ["Graphic"]
    }),
    deleteGraphic: builder.mutation({
  query: (id) => ({
    url: `rest/v1/graphics?id=eq.${id}`,
    method: "DELETE",
  }),
  invalidatesTags: ["Graphic"]
}),
getNotifications: builder.query({
  query: () => ({
    url: "rest/v1/graphics?done=eq.false",
  }),
  providesTags: ["Graphic"]
}),
  })
})

export const { useCreateGraphicMutation,useGetGraphicQuery,useDeleteGraphicMutation,useGetNotificationsQuery} = graphicApi   